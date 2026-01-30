import { createBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 1. Standard Client (Default Export)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

// 2. Server Client for SSR logic
export const createServerClient = (cookieStore: any) => {
  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value },
      set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }) },
      remove(name: string, options: any) { cookieStore.delete({ name, ...options }) },
    },
  })
}

// 3. Database Methods (The 'db' object)
export const db = {
  createUser: async (email: string, role: string) => {
    return await supabase.from('users').insert({ email, role });
  },
  createEnrollment: async (userId: string, courseId: string) => {
    return await supabase.from('enrollments').insert({ user_id: userId, course_id: courseId });
  }
}