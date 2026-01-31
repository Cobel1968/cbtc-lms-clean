import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(" Cobel AI Engine: Missing API Keys in Environment");
    // We return a dummy client or throw to prevent the 400 error crash
    return {} as any;
  }

  // Use the renamed import here to avoid circular logic
  return supabaseCreateClient(supabaseUrl, supabaseKey);
};