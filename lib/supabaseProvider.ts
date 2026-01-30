import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

// Build-safe database methods
export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  createEnrollment: async (userId: string, courseId: string) => {
    return await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
  }
};

// Safety wrapper for Server Client to prevent 'undefined get' errors
export const createServerClient = (cookies: any) => {
  return {
    auth: {},
    from: (table: string) => supabase.from(table),
    // This solves the 'reading get' error by checking if cookies object exists
    get: (name: string) => (cookies && typeof cookies.get === 'function') ? cookies.get(name) : null
  };
};