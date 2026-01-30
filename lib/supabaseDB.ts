import { createClient } from '@supabase/supabase-js'

// 1. Build-Safe Factory (The Heart of Cobel AI)
export const createBuildSafeClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createClient(url, key);
};

// 2. Primary Exports
export const supabase = createBuildSafeClient();
export const createServerClient = createBuildSafeClient;

// 3. THE FIX: Explicitly export for Middleware (Edge Runtime)
export const createMiddlewareClient = (req: any, res: any) => createBuildSafeClient();

// 4. Restoration of Vocational Logic
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