import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Individual exports are safer for the compiler
export const createUser = async (email: string, role: string) => {
  return await supabase.from('users').insert({ email, role });
}

export const createEnrollment = async (userId: string, courseId: string) => {
  return await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
}

// Keep the db object for backward compatibility with your existing calls
export const db = {
  createUser,
  createEnrollment
};

export default supabase;