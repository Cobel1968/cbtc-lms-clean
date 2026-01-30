import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Export as a named constant
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Export as default (to fix the 'imported as supabase' error)
export default supabase

// 3. Export the db object specifically for the Cobel AI Engine
export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  createEnrollment: async (userId: string, course_id: string) => {
    return await supabase.from('enrollments').insert({ user_id: userId, course_id });
  }
}