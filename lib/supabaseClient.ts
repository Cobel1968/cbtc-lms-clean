import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// SAFETY CHECK: Prevents the app from crashing if variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('COBEL ENGINE ERROR: Supabase environment variables are missing in the browser.');
  }
}

// 1. STANDARD CLIENT (Browser & General Use)
// This fixes the "deprecated parameters" by passing everything in a single config object
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'cobel-lms-auth-token', // Unique key to prevent hanging on login
  },
});

// 2. SERVER-SIDE CLIENT (For API Routes)
// Use this inside /api folders to bypass RLS when necessary (Admin tasks)
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  return createClient<Database>(
    supabaseUrl,
    serviceKey || supabaseAnonKey, 
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * COBEL AI ENGINE HELPERS
 * Resolved: Exporting logic for profiles, courses, and enrollments.
 */

export const createUser = async (userData: any) => {
  const { data, error } = await supabase.from('profiles').insert(userData).select().single();
  if (error) throw error;
  return data;
};

export const createEnrollment = async (enrollmentData: any) => {
  const { data, error } = await supabase.from('enrollments').insert(enrollmentData).select().single();
  if (error) throw error;
  return data;
};

// Vocational Course Lookup
export const getCourseById = async (id: string) => {
  const { data, error } = await supabase.from('courses').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
};

export default supabase;