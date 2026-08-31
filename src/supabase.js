import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utmyossoycpywvauaccz.supabase.co";
const supabaseAnonKey = "sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Keeps an admin signed in across refreshes, and picks the recovery token
    // out of the URL when someone follows a password-reset link.
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ---------------------------------------------------------------------------
// Admin auth
// ---------------------------------------------------------------------------
// admin_users has RLS that lets a signed-in user read only their OWN row, so a
// row coming back is proof this account is on the allowlist. Anyone not on it
// - including a user who obtained an account some other way - gets nothing.
export async function isAdminUser(userId) {
  if (!userId) return false;
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();
    if (error) return false;
    return !!data;
  } catch (e) {
    return false;
  }
}

export async function signOutAdmin() {
  try {
    await supabase.auth.signOut();
    return true;
  } catch (e) {
    console.error("signOut failed", e);
    return false;
  }
}

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

export function subscribeToCollection(name, { onInsertOrUpdate, onDelete }) {
  const channel = supabase
    .channel(`khoj_items_${name}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "khoj_items", filter: `collection=eq.${name}` },
      (payload) => onInsertOrUpdate && onInsertOrUpdate(payload.new.data)
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "khoj_items", filter: `collection=eq.${name}` },
      (payload) => onInsertOrUpdate && onInsertOrUpdate(payload.new.data)
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "khoj_items", filter: `collection=eq.${name}` },
      (payload) => onDelete && onDelete(payload.old?.id)
    )
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}
