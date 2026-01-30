import { createClient } from '@supabase/supabase-js'

// 1. Build-Safe Factory
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(url, key);
};

// 2. Export the singleton instance
export const supabase = createBuildSafeClient();

// 3. Export the factory under the name the components are asking for
export const createServerClient = createBuildSafeClient;

// 4. Auth & DB Functions
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