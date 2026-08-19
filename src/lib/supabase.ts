import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw here: that would crash every page on import, including
  // ones that never touch Supabase. Calls made without real credentials
  // will fail at the network request instead, where callers already
  // handle errors.
  console.warn(
    "VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Copy .env.example to .env.local and fill in your Supabase project credentials."
  )
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
)
