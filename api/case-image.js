import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utmyossoycpywvauaccz.supabase.co";
const supabaseAnonKey = "sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Serves a missing person's photo as an actual image response (not a data: URL),
// because WhatsApp/Facebook/etc. link-preview crawlers can only fetch real
// image URLs — they can't render base64 data embedded in a page.
export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) return res.status(400).send("Missing id");

  try {
    const { data, error } = await supabase
      .from("khoj_items")
      .select("data")
      .eq("collection", "khoj-reports")
      .eq("id", id)
      .single();

    if (error || !data) return res.status(404).send("Not found");

    const report = data.data;
    const photos = Array.isArray(report.photos) && report.photos.length
      ? report.photos
      : report.photo
      ? [report.photo]
      : [];
    const dataUrl = photos[0];

    if (!dataUrl || !dataUrl.startsWith("data:")) {
      return res.status(404).send("No photo available");
    }

    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) return res.status(404).send("Invalid photo data");

    const mime = match[1];
    const buffer = Buffer.from(match[2], "base64");

    res.setHeader("Content-Type", mime);
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(200).send(buffer);
  } catch (e) {
    return res.status(500).send("Error loading image");
  }
}
