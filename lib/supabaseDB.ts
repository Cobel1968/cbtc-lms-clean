import { createClient } from '@supabase/supabase-js'

// We define a function instead of a constant to prevent build-time crashes
export const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build, we return a mock or handle gracefully
    console.warn("Supabase credentials missing - providing build-time placeholder");
    return createClient(
      'https://placeholder-for-build.supabase.co', 
      'placeholder-key'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// Export a lazy instance for easy use
export const supabase = getSupabase();