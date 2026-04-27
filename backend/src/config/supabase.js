import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// ── Public client (respects Row Level Security) ───────────────
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ── Admin client (bypasses RLS — use only in trusted server code)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);