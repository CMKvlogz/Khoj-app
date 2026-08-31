# Khoj — Missing Persons Network

## Before deploying
1. Create a free Supabase project at https://supabase.com (no billing/card required).
2. In the SQL Editor, run the setup query from `supabase-setup.sql`. It creates the
   `khoj_items` table used by the board, plus the `admin_users` and `auth_throttle`
   tables used by admin sign-in.
3. Copy your Project URL and anon public key into `src/supabase.js` (replace the
   placeholder values).
4. Set the environment variables listed under **Admin access** below.
5. Push this folder to GitHub, then import it in Vercel — it will run
   `npm install` and `npm run build` automatically. No local setup needed.

## Local development (optional, only if you have Node.js installed)
```
npm install
npm run dev
```

---

# Admin access

There is **no shared admin password**. Admins are real Supabase Auth users, and
being an auth user is not enough on its own — the account's id must also appear
in the `admin_users` allowlist table. Sign-in runs through
`/api/admin-auth.js`, which rate limits attempts and checks the allowlist on the
server, so the browser can never be used to discover who the admins are.

## 1. Required environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | Notes |
| --- | --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Supabase → Settings → API → `service_role`. Server-only. Never put this in `src/`, never expose it to the browser. |
| `SUPABASE_URL` | No | Defaults to the project URL in the code. |
| `SUPABASE_ANON_KEY` | No | Defaults to the publishable key in the code. |

If `SUPABASE_SERVICE_ROLE_KEY` is missing, `/api/admin-auth` **fails closed** and
returns `503` — admin login stops working rather than falling back to something
weaker. That is deliberate.

## 2. Turn public signup OFF

Supabase Dashboard → **Authentication → Sign In / Providers → Email**:

- **Disable** "Allow new users to sign up".
- Keep "Confirm email" enabled.

Even if someone did create an account, they would not become an admin — they
would not be in `admin_users`, and the login endpoint signs them straight back
out. Disabling signup is the outer layer, the allowlist is the real gate.

## 3. Email delivery

Auth emails — password resets in particular — are sent by **Supabase's own
built-in email service**. Nothing to configure and no email provider account
needed; it works out of the box.

> ⚠️ **This will not carry real users.** Supabase's built-in service is rate
> limited to a few emails per hour across the entire project, and Supabase
> documents it as being for development and testing only. It is fine while the
> admin list is a handful of people resetting a password now and then.
>
> **Before onboarding real users, set up a custom SMTP provider** under
> **Project Settings → Authentication → SMTP Settings**. Without it, password
> reset emails simply stop being delivered once the hourly cap is reached — and
> because the app always shows the same "if that email is registered, a reset
> link has been sent" message by design, an admin locked out this way gets no
> indication that the email was never sent.

## 4. Allow the reset-password redirect

Supabase Dashboard → **Authentication → URL Configuration**:

- **Site URL**: your production URL, e.g. `https://your-app.vercel.app`
- **Redirect URLs**: add `https://your-app.vercel.app/?view=reset-password`
  (add `http://localhost:5173/?view=reset-password` too if you test locally)

The app builds this redirect from the request's own host, so a reset link can
never be pointed at another domain.

## 5. Creating an admin account (done by hand, per admin)

Admin accounts are **never** created from inside the app. There is no signup
screen, by design.

1. Supabase Dashboard → **Authentication → Users → Add user → Create new user**.
2. Enter the person's email and a temporary password. Tick **Auto Confirm User**.
3. Copy the new user's **UID**.
4. Supabase Dashboard → **SQL Editor**, and run:

   ```sql
   insert into admin_users (id, email)
   values ('PASTE-THE-UID-HERE', 'lowercase-email@example.com');
   ```

   The email **must be stored lowercase** — the reset-password lookup compares
   against a lowercased address.
5. Have the new admin sign in and immediately use **Forgot password?** to set a
   password only they know.

### Removing an admin

```sql
delete from admin_users where email = 'lowercase-email@example.com';
```

Access is re-checked on every page load and on every auth state change, so the
person loses admin rights the next time the app loads. To end their session
immediately, also delete the user under **Authentication → Users**.

## 6. Rate limiting

`/api/admin-auth.js` limits attempts per email address and per IP over a rolling
15-minute window, recorded in `auth_throttle`:

| Action | Per email | Per IP |
| --- | --- | --- |
| Login | 5 | 20 |
| Password reset | 3 | 10 |

A successful login clears that email's failed-attempt count. Over the limit
returns a generic "too many attempts" message.

This is application-level limiting and covers the app's own login screen. It is
not a substitute for Supabase's own auth rate limits, which are what stop
someone calling the Supabase auth endpoint directly with the public key — set
those under **Authentication → Rate Limits** in the dashboard.

## 7. Security notes

- **The old shared admin password must be treated as compromised.** It was
  committed to this repository and remains readable in git history even though
  the code is gone. It must never be reused anywhere.
- The `service_role` key bypasses Row Level Security entirely. It belongs only
  in Vercel environment variables.
- `admin_users` has RLS with no anon policy — the public key can read nothing.
  A signed-in user can read only their own row.
- `auth_throttle` has RLS and **no policies at all**, so only the service role
  can touch it.
