import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Explicitly defining the 'db' object that Vercel is missing [cite: 2026-01-01]
export const db = {
  createUser: async (data: any) => await supabase.from('profiles').insert(data),
  createEnrollment: async (data: any) => await supabase.from('enrollments').insert(data),
  updateProgress: async (nodeId: string, data: any) => await supabase.from('user_progress').upsert(data)
}

export const createServerClient = () => createClient(supabaseUrl, supabaseAnonKey)

export default supabase