import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Fetches the current user's role from the public.profiles table.
 * Essential for Feature 4: Analog-to-Digital Pedagogical Bridge access control.
 */
export async function getUserProfile(supabase: SupabaseClient) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('No authenticated user found');
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, role, technical_fluency_level')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching user profile:', profileError.message);
    return null;
  }

  return profile;
}
