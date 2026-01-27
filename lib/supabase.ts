import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

/**
 * COBEL AI ENGINE - AUTH HELPERS
 * Optimized for Next.js App Router Structure
 */

// 1. Function to trigger the "Forgot Password" email
export const requestPasswordReset = async (email: string) => {
  // Call the Postgres RPC for auditing/logging
  const { data, error } = await supabase.rpc('request_password_reset', { 
    target_email: email 
  });
  
  // Trigger Supabase Auth email
  const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
    // FIXED: Points to /reset-password (matching your /app/reset-password/page.tsx)
    redirectTo: `${window.location.origin}/reset-password`,
  });

  return { data, error: error || authError };
};

// 2. Function to finalize the password update
export const finalizePasswordReset = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return { data, error };
};

export default supabase;