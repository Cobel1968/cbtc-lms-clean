import { createClient } from '@supabase/supabase-js'

// 1. Build-Safe Factory
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return createClient('https://placeholder.supabase.co', 'placeholder');
  return createClient(url, key);
};

// 2. Primary Singleton
export const supabase = createBuildSafeClient();

// 3. Auth Helper Aliases
export const createServerClient = () => createBuildSafeClient();
export const createMiddlewareClient = () => createBuildSafeClient();

// 4. Restoration of Vocational & Auth Logic
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
  return await client.from('users').insert([userData]).select().single();
}

export async function createEnrollment(enrollData: any) {
  const client = createBuildSafeClient();
  return await client.from('enrollments').insert([enrollData]).select().single();
}

// 5. Special 'db' export to satisfy components using 'import * as db'
export const db = {
  createEnrollment,
  createUser,
  finalizePasswordReset
};