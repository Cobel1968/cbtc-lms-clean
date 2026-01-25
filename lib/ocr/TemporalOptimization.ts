/**
 * COBEL AI ENGINE - PHASE 3
 * Logic: Automated Milestone Forecasting & Curriculum Density
 * Filename: TemporalOptimization.ts
 */

import { supabase } from '@/lib/SupabaseClient';

export const calculate_optimized_timeframe = async (user_id: string, course_id: string) => {
  // 1. Fetch the student's current fluency and the course's base duration
  const { data: profile } = await supabase
    .from('profiles')
    .select('technical_fluency')
    .eq('id', user_id)
    .single();

  const { data: course } = await supabase
    .from('courses')
    .select('duration_weeks')
    .eq('id', course_id)
    .single();

  if (!profile || !course) return null;

  const base_duration = course.duration_weeks;
  const fluency = profile.technical_fluency;

  /**
   * PEDAGOGICAL LOGIC:
   * If fluency > 80%, reduce duration by 30% (Fast Track)
   * If fluency > 50%, reduce duration by 15% (Optimized)
   * Else, keep base duration.
   */
  let optimized_duration = base_duration;

  if (fluency >= 80) {
    optimized_duration = Math.round(base_duration * 0.7);
  } else if (fluency >= 50) {
    optimized_duration = Math.round(base_duration * 0.85);
  }

  // 2. Update the Enrollment with the new 'Milestone Forecast'
  await supabase
    .from('enrollments')
    .update({ 
      optimized_duration_weeks: optimized_duration,
      milestone_forecast_updated_at: new Date().toISOString()
    })
    .eq('user_id', user_id)
    .eq('course_id', course_id);

  return {
    original: base_duration,
    optimized: optimized_duration,
    savings: base_duration - optimized_duration
  };
}