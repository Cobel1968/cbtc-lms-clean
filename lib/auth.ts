import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const useAuth = () => {
  const supabase = createClientComponentClient();
  const signIn = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
      },
    });
    return { data, error };
  };
  return { signIn };
};
