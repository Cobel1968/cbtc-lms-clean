import { createClient } from '@supabase/supabase-js'

export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return createClient('https://placeholder.supabase.co', 'placeholder');
  return createClient(url, key);
};

export const supabase = createBuildSafeClient();
export const createServerClient = createBuildSafeClient;
export const createMiddlewareClient = () => createBuildSafeClient();

// Profile Creation Helper used by the Register Route
export async function createUser(userData: any) {
  const client = createBuildSafeClient();
  const { data, error } = await client.from('users').insert([userData]).select().single();
  return { data, error };
}

// Auth Helpers
export async function requestPasswordReset(email: string) {
  const client = createBuildSafeClient();
  return await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/reset-password`,
  });
}