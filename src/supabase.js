// ============================================================
// STEP: Supabase Dashboard (supabase.com) se apna Project URL
// aur anon public key copy karke neeche paste karein.
// (Guide mein "Phase 1" mein bataya gaya hai ye kahan se milega)
// ============================================================
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utmyossoycpywvauaccz.supabase.co";
const supabaseAnonKey = "sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Helper functions used by the app (list-based storage) ----
// All data is stored in a single table "khoj_items" with columns:
//   collection (text)  -- e.g. "reports", "sightings", "notifications"
//   id (text)           -- unique id of the item
//   data (jsonb)         -- the actual item object
//   created_at (timestamp, default now())

export async function loadCollection(name) {
  try {
    const { data, error } = await supabase
      .from("khoj_items")
      .select("data")
      .eq("collection", name)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data.map((row) => row.data);
  } catch (e) {
    console.error("loadCollection failed", name, e);
    return [];
  }
}

export async function deleteItem(name, id) {
  try {
    const { error } = await supabase
      .from("khoj_items")
      .delete()
      .eq("collection", name)
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (e) {
    console.error("deleteItem failed", name, id, e);
    return false;
  }
}

export async function saveItem(name, item) {
  try {
    const { error } = await supabase
      .from("khoj_items")
      .upsert(
        { collection: name, id: item.id, data: item },
        { onConflict: "collection,id" }
      );
    if (error) throw error;
    return true;
  } catch (e) {
    console.error("saveItem failed", name, e);
    return false;
  }
}
