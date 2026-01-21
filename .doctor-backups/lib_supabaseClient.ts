// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Server-side Supabase client (for API routes)
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * DATABASE HELPERS (For API Routes)
 * These resolve the "not exported" errors in:
 * /api/auth/register, /api/courses/[id], and /api/enrollments
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

// Add this to resolve common course lookup patterns in API routes
export const getCourseById = async (id: string) => {
  const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export default supabase;