import { createClient } from '@supabase/supabase-js'

export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a dummy client during build so the process doesn't crash
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(url, key);
};

// Also keep the named export but make it a getter
export const supabase = createBuildSafeClient();