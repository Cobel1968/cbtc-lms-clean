'use server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// strictly lowercase client initialization for the engine
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * FEATURE 1 & 4: Bilingual Friction Data Fetcher
 * Pulls raw technical scores for the Trainer's Friction Report
 */
export async function get_bilingual_assessment_data(student_id?: string) {
  try {
    let query = supabase
      .from('assessments')
      .select(`
        id,
        technical_term,
        category,
        score_en,
        score_fr,
        attempt_count,
        student_id
      `);

    if (student_id) {
      // mapping student_id to lowercase query param
      query = query.eq('student_id', student_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('cobel_engine: friction_fetch_error:', error);
    return [];
  }
}

/**
 * FEATURE 3: Temporal Optimization
 * Updates the curriculum timeframe based on engine calculations
 */
export async function update_student_timeframe(student_id: string, weeks: number) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        current_curriculum_weeks: weeks,
        last_bridge_sync: new Date().toISOString() 
      })
      .eq('id', student_id);

    if (error) throw error;

    // lowercase path revalidation for the engine
    revalidatePath('/admin/students');
    return { success: true, data };
  } catch (error) {
    console.error('cobel_engine: timeframe_sync_error:', error);
    return { success: false, error };
  }
}

/**
 * FEATURE 4: Analog-to-Digital Bridge (Handwriting Analysis)
 * Ingests metadata from handwriting analysis into the assessments table.
 * Normalizes 'category' and 'technical_term' to lowercase to avoid bilingual friction.
 */
export async function submit_bridge_assessment(student_id: string, assessment_data: any) {
  try {
    const { error } = await supabase
      .from('assessments')
      .insert({
        student_id,
        // normalization: forcing lowercase on ingested technical terms
        technical_term: assessment_data.term?.toLowerCase(),
        category: assessment_data.category?.toLowerCase(),
        score_en: assessment_data.score_en,
        score_fr: assessment_data.score_fr,
        attempt_count: assessment_data.attempts || 1,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    // revalidate paths based on strictly lowercase directory structure
    revalidatePath('/admin/students');
    revalidatePath('/admin/assessments');
    revalidatePath('/trainer/friction-report');
    return { success: true };
  } catch (error) {
    console.error('cobel_engine: bridge_ingestion_error:', error);
    return { success: false, error };
  }
}
