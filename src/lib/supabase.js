import { createClient } from "@supabase/supabase-js";

// Browser client: uses the public (publishable/anon) key, so it can only do
// what Row Level Security allows — reading active products.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
