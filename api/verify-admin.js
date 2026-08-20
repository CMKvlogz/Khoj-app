// Vercel Serverless Function — runs on the server, never in the browser.
// The real admin password/PIN live in Vercel's Environment Variables, not in
// any code the browser can see. The browser only ever gets back {success:true/false}.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_STEP2_PIN = process.env.ADMIN_STEP2_PIN;

  if (!ADMIN_PASSWORD || !ADMIN_STEP2_PIN) {
    return res.status(500).json({ error: "Server not configured. Add ADMIN_PASSWORD and ADMIN_STEP2_PIN in Vercel Environment Variables." });
  }

  const { step, password, pin } = req.body || {};

  if (step === 1) {
    const success = typeof password === "string" && password === ADMIN_PASSWORD;
    return res.status(200).json({ success });
  }

  if (step === 2) {
    const success = typeof pin === "string" && pin === ADMIN_STEP2_PIN;
    return res.status(200).json({ success });
  }

  return res.status(400).json({ error: "Missing or invalid step." });
}
