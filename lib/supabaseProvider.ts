import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add default export to satisfy 'import supabase from...'
export default supabase;

export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  // Added missing method for vocational enrollment
  createEnrollment: async (userId: string, courseId: string) => {
    return await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
  },
  getAssessment: async (id: string) => {
    return await supabase.from('assessments').select('*').eq('id', id).single();
  }
};