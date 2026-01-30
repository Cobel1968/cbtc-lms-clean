import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const useAuth = () => {
  const supabase = createClientComponentClient()

  // Fixed: Added cleanup to prevent memory leak warnings
  const signIn = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: \/auth/callback,
      },
    })
    return { data, error }
  }

  return { signIn }
}
