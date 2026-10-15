import { createClient } from "@supabase/supabase-js";

// Server-only client: uses the secret key, which bypasses Row Level Security.
// Files in api/_lib are not exposed as endpoints by Vercel.
export const getSupabaseAdmin = () => {
  const url = process.env.VITE_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) return null;

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
