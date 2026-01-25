'use client';
export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabase';

/**
 * Feature 4: Analog-to-Digital Pedagogical Bridge
 * Fetches the latest optimization data to update the 
 * Automated Milestone Forecasting for a specific student.
 */
export async function get_student_metrics(user_id: string): Promise<{
  days_saved: number;
  fluency_score: number;
}> {
  const { data, error } = await supabase
    .from('vocational_assessments')
    .select('suggested_timeframe_adjustment, bilingual_fluency_score')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle(); // maybeSingle() is safer than .single() as it handles 0 rows gracefully

  if (error && error.code !== 'PGRST116') {
    console.error('Cobel Engine Error: Could not fetch optimization metrics:', error.message);
  }

  return {
    // Phase 3: Temporal Optimization - Defaulting to 0 if no assessment exists
    days_saved: data?.suggested_timeframe_adjustment ?? 0,
    // Feature 4: Technical Fluency Result
    fluency_score: data?.bilingual_fluency_score ?? 0
  };
}
