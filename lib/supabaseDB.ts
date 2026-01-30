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

export const supabase = createBuildSafeClient();

// 2. Restored Auth Functions (Build-Safe)
export const requestPasswordReset = async (email: string) => {
  const client = createBuildSafeClient();
  return await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
};

export const finalizePasswordReset = async (password: string) => {
  const client = createBuildSafeClient();
  return await client.auth.updateUser({ password });
};

// 3. User Creation Helper
export const createUser = async (userData: any) => {
  const client = createBuildSafeClient();
  const { data, error } = await client.from('users').insert([userData]).select().single();
  return { data, error };
};