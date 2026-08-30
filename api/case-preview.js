import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utmyossoycpywvauaccz.supabase.co";
const supabaseAnonKey = "sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BOT_PATTERNS = [
  "whatsapp", "facebookexternalhit", "twitterbot", "linkedinbot",
  "slackbot", "telegrambot", "discordbot", "pinterest", "vkshare",
  "facebot", "embedly", "quora link preview", "showyoubot", "outbrain",
  "redditbot", "applebot", "flipboard", "tumblr", "bitlybot",
  "skypeuripreview", "nuzzel", "bot", "crawler", "spider",
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((p) => ua.includes(p));
}

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export default async function handler(req, res) {
  const id = req.query.id;
  const host = req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${proto}://${host}`;
  const appUrl = `${baseUrl}/?case=${encodeURIComponent(id || "")}`;

  if (!id) {
    res.writeHead(302, { Location: baseUrl });
    return res.end();
  }

  const ua = req.headers["user-agent"] || "";

  // Real visitors (not a crawler) just go straight to the app.
  if (!isBot(ua)) {
    res.writeHead(302, { Location: appUrl });
    return res.end();
  }

  // A crawler (WhatsApp, Facebook, etc.) is asking for a preview — build one.
  let report = null;
  try {
    const { data, error } = await supabase
      .from("khoj_items")
      .select("data")
      .eq("collection", "khoj-reports")
      .eq("id", id)
      .single();
    if (!error && data) report = data.data;
  } catch (e) {
    // fall through to generic preview below
  }

  const name = report?.name || "Missing Person";
  const city = report?.city || "";
  const lastSeen = report?.lastSeenLocation || "";
  const title = `${name} — Missing | Khoj`;
  const description = `Help find ${name}${city ? `, last seen in ${city}` : lastSeen ? `, last seen near ${lastSeen}` : ""}. Community missing persons network.`;
  const hasPhoto = report && (report.photo || (Array.isArray(report.photos) && report.photos.length));
  const imageUrl = hasPhoto
    ? `${baseUrl}/api/case-image?id=${encodeURIComponent(id)}`
    : `${baseUrl}/icons/icon-512.png`;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${appUrl}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${imageUrl}" />
<meta http-equiv="refresh" content="0; url=${appUrl}" />
</head>
<body>
<p>Redirecting to <a href="${appUrl}">Khoj</a>...</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300");
  return res.status(200).send(html);
}
