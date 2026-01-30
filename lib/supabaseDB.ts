import { createClient } from '@supabase/supabase-js'

// 1. Build-Safe Client Factory
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(url, key);
};

// 2. Explicitly Named Exports for Vercel
export const supabase = createBuildSafeClient();

export async function requestPasswordReset(email: string) {
  const client = createBuildSafeClient();
  return await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/reset-password`,
  });
}

export async function finalizePasswordReset(password: string) {
  const client = createBuildSafeClient();
  return await client.auth.updateUser({ password });
}

export async function createUser(userData: any) {
  const client = createBuildSafeClient();
  const { data, error } = await client.from('users').insert([userData]).select().single();
  return { data, error };
}