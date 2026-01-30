import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Centralized DB methods to prevent import errors across the LMS
export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  getAssessment: async (id: string) => {
    return await supabase.from('assessments').select('*').eq('id', id).single();
  }
};