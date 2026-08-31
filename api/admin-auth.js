// Vercel Serverless Function - admin sign-in and password-reset requests.
//
// Everything that must not be forgeable happens here rather than in the
// browser: the failed-attempt rate limiting, the admin allowlist check, and
// the decision of whether a reset email is sent at all. The browser only ever
// learns "it worked" or a single generic failure, so it can never be used to
// discover which addresses are admins.
//
// Required Vercel environment variables:
//   SUPABASE_SERVICE_ROLE_KEY  - server-only key, never sent to the browser
//   SUPABASE_URL               - optional, defaults to the project URL below
//   SUPABASE_ANON_KEY          - optional, defaults to the publishable key below
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://utmyossoycpywvauaccz.supabase.co";
const ANON_KEY = process.env.SUPABASE_ANON_KEY || "sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Rate limits, counted over a rolling window.
const WINDOW_MINUTES = 15;
const LIMITS = {
  login: { email: 5, ip: 20 },
  reset: { email: 3, ip: 10 },
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function windowStart() {
  return new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
}

async function attemptCount(admin, bucket, kind, subject, since) {
  const { count, error } = await admin
    .from("auth_throttle")
    .select("id", { count: "exact", head: true })
    .eq("bucket", bucket)
    .eq("kind", kind)
    .eq("subject", subject)
    .gte("created_at", since);
  if (error) throw error;
  return count || 0;
}

async function isRateLimited(admin, bucket, email, ip) {
  const since = windowStart();
  const limits = LIMITS[bucket];
  const [byEmail, byIp] = await Promise.all([
    attemptCount(admin, bucket, "email", email, since),
    attemptCount(admin, bucket, "ip", ip, since),
  ]);
  return byEmail >= limits.email || byIp >= limits.ip;
}

async function recordAttempt(admin, bucket, email, ip) {
  await admin.from("auth_throttle").insert([
    { bucket, kind: "email", subject: email },
    { bucket, kind: "ip", subject: ip },
  ]);
}

async function clearAttempts(admin, bucket, email) {
  await admin
    .from("auth_throttle")
    .delete()
    .eq("bucket", bucket)
    .eq("kind", "email")
    .eq("subject", email);
}

// Opportunistic housekeeping so the ledger does not grow without bound.
async function pruneOld(admin) {
  try {
    await admin.from("auth_throttle").delete().lt("created_at", windowStart());
  } catch {
    // Never let cleanup failures affect the auth result.
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  // Fail closed. Without the service role key we cannot rate limit or check
  // the allowlist, and degrading to "let everyone in" is not an option.
  if (!SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: "auth_unavailable" });
  }

  const { action, email, password } = req.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(normalizedEmail)) {
    return res.status(400).json({ error: "invalid_request" });
  }
  if (action !== "login" && action !== "reset") {
    return res.status(400).json({ error: "invalid_request" });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  // A short-lived anon client: it performs the actual auth calls and must not
  // keep any session state between requests.
  const anon = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const ip = clientIp(req);

  try {
    if (await isRateLimited(admin, action, normalizedEmail, ip)) {
      return res.status(429).json({ error: "rate_limited" });
    }
    await recordAttempt(admin, action, normalizedEmail, ip);
    pruneOld(admin);

    // ---------------------------------------------------------------- reset
    if (action === "reset") {
      // The redirect target is built from this request's own host, never from
      // anything the caller sent, so this cannot be turned into an open redirect.
      const proto = req.headers["x-forwarded-proto"] || "https";
      const redirectTo = `${proto}://${req.headers.host}/?view=reset-password`;

      const { data: allowRow } = await admin
        .from("admin_users")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (allowRow) {
        await anon.auth.resetPasswordForEmail(normalizedEmail, { redirectTo });
      }

      // Identical response whether or not that address belongs to an admin.
      return res.status(200).json({ ok: true });
    }

    // ---------------------------------------------------------------- login
    if (typeof password !== "string" || password.length === 0) {
      return res.status(200).json({ ok: false, error: "invalid_credentials" });
    }

    const { data, error } = await anon.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data?.session || !data?.user) {
      return res.status(200).json({ ok: false, error: "invalid_credentials" });
    }

    // Authenticating is not the same as being an admin. A user who signed up
    // by any other route lands here with a valid session and still gets
    // nothing - and gets the same message as a wrong password.
    const { data: allowRow, error: allowError } = await admin
      .from("admin_users")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (allowError || !allowRow) {
      // Revoke the session we just created so it cannot be reused.
      try { await anon.auth.signOut(); } catch {}
      return res.status(200).json({ ok: false, error: "invalid_credentials" });
    }

    await clearAttempts(admin, "login", normalizedEmail);

    return res.status(200).json({
      ok: true,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  } catch (e) {
    return res.status(500).json({ error: "server_error" });
  }
}
