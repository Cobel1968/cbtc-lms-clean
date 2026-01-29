import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const createServerClient = () => createClient(supabaseUrl, supabaseAnonKey)
export const db = {
  createUser: async (data: any) => await supabase.from('profiles').insert(data),
  createEnrollment: async (data: any) => await supabase.from('enrollments').insert(data)
}
export default supabase