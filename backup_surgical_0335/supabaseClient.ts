import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Primary client for Client-side/Browser usage [cite: 2026-01-01]
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Re-export createClient for modularity
export { createClient }

// 3. Satisfy 'createServerClient' requirement [cite: 2026-01-01]
// This allows your Server Components to initialize the bridge correctly
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// 4. Implement 'db' object to handle technical node ingestion [cite: 2026-01-01]
// These helpers resolve the "createUser is not exported" errors
export const db = {
  createUser: async (userData: any) => {
    return await supabase.from('profiles').insert(userData)
  },
  createEnrollment: async (enrollmentData: any) => {
    return await supabase.from('enrollments').insert(enrollmentData)
  },
  updateProgress: async (nodeId: string, data: any) => {
    return await supabase.from('user_progress').update(data).eq('module_id', nodeId)
  }
}

// 5. Default export to fix "does not contain a default export" warning
export default supabase