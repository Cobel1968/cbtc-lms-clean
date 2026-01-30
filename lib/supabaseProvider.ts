import { createBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Standard Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

// 2. Mock Server Client (To satisfy the 'createServerClient' import error)
export const createServerClient = () => {
  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {} // Simplified for the build phase
  })
}

// 3. Database Methods
export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  createEnrollment: async (userId: string, courseId: string) => {
    return await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
  },
  getAssessment: async (id: string) => {
    return await supabase.from('assessments').select('*').eq('id', id).single();
  }
};