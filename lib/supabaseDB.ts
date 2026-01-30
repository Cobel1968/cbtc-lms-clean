import { createClient } from '@supabase/supabase-js'

// 1. Build-Safe Client Factory
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return placeholder to prevent build-time crash
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(url, key);
};

// 2. Export the primary singleton
export const supabase = createBuildSafeClient();

// 3. Map 'createServerClient' to our safe factory (Fixes Login/Health 500s)
export const createServerClient = createBuildSafeClient;

// 4. Restore Password Logic
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

// 5. Restore Enrollment Logic (Fixes Enrollment 500)
export async function createEnrollment(enrollData: any) {
  const client = createBuildSafeClient();
  const { data, error } = await client.from('enrollments').insert([enrollData]).select().single();
  return { data, error };
}

// 6. User Helper
export async function createUser(userData: any) {
  const client = createBuildSafeClient();
  const { data, error } = await client.from('users').insert([userData]).select().single();
  return { data, error };
}