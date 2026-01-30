import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Named Export (The modern way)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createUser = async (email: string, role: string) => supabase.from('users').insert({ email, role });
export const createEnrollment = async (userId: string, courseId: string) => supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
export const getBilingualCatalog = async () => supabase.from('courses').select('*');

export const createServerClient = (cookies: any) => ({
  auth: {},
  from: (table: string) => supabase.from(table),
  get: (name: string) => (cookies && typeof cookies.get === 'function') ? cookies.get(name) : null
});

export const db = { createUser, createEnrollment, getBilingualCatalog };

// 2. Default Export (The FIX for your 'Attempted import error')
export default supabase;