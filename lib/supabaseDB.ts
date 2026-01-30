import { createClient } from '@supabase/supabase-js'
import { createServerClient as baseCreateServerClient } from '@supabase/ssr'

// Build-Safe Factory
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return createClient('https://placeholder.supabase.co', 'placeholder');
  return createClient(url, key);
};

// Unified Exports to satisfy all components
export const supabase = createBuildSafeClient();
export const createServerClient = () => createBuildSafeClient();
export const createMiddlewareClient = () => createBuildSafeClient();

// Restoration of Vocational Logic Functions
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

export async function createEnrollment(enrollData: any) {
  const client = createBuildSafeClient();
  return await client.from('enrollments').insert([enrollData]).select().single();
}

export async function createUser(userData: any) {
  const client = createBuildSafeClient();
  return await client.from('users').insert([userData]).select().single();
}