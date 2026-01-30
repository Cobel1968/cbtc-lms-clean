import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Named exports for every function requested by your components
export const createUser = async (email: string, role: string) => supabase.from('users').insert({ email, role });
export const createEnrollment = async (userId: string, courseId: string) => supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
export const requestPasswordReset = async (email: string) => supabase.auth.resetPasswordForEmail(email);
export const finalizePasswordReset = async (password: string) => supabase.auth.updateUser({ password });
export const getBilingualCatalog = async () => supabase.from('courses').select('*');

export const createServerClient = (cookies: any) => ({
  auth: {},
  from: (table: string) => supabase.from(table),
  get: (name: string) => (cookies && typeof cookies.get === 'function') ? cookies.get(name) : null
});

// The legacy 'db' object helper
export const db = { createUser, createEnrollment, getBilingualCatalog };