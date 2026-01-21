import { supabase } from '@/lib/supabaseClient';

/**
 * PROACTIVE PRICING FETCH
 */
export const getCoursePricing = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name_en, price, currency, stripe_price_id, category')
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching course pricing:', error.message);
    return { data: null, error };
  }
};

/**
 * ACCESS VERIFICATION LOGIC
 */
export const verifyAccess = async (userId: string, courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('status, payment_ref')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error || !data) return false;
    return data.status === 'active' || data.status === 'completed';
  } catch (err) {
    return false;
  }
};

/**
 * COURSE MANAGEMENT (Fixes Vercel Export Errors)
 */
export const updateCourse = async (courseId: string, updates: any) => {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', courseId)
    .select(); // Added select() to return updated data for UI feedback
  return { data, error };
};

export const deleteCourse = async (courseId: string) => {
  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId);
  return { data, error };
};

/**
 * BILINGUAL MAPPING SYNC
 * Updates technical profile after Feature 4 (Handwriting/OCR) ingestion.
 */
export const syncBilingualAssessment = async (userId: string, masteryData: any) => {
  const { data, error } = await supabase
    .from('student_profiles')
    .update({
      technical_fluency: masteryData.score,
      last_audit_date: new Date().toISOString(),
      bilingual_terms_mapped: masteryData.termsCount,
      // Added pedagogical logic: set mastery level based on score
      mastery_level: masteryData.score >= 80 ? 'Advanced' : 'Intermediate'
    })
    .eq('user_id', userId)
    .select();
  return { data, error };
};

/**
 * ROI TRACKER
 */
export const recordSuccessfulPayment = async (userId: string, courseId: string, amount: number) => {
  const { data, error } = await supabase
    .from('enrollments')
    .insert([
      { 
        user_id: userId, 
        course_id: courseId, 
        status: 'active', 
        amount_paid: amount,
        currency: 'XOF', // Fixed for regional alignment
        enrolled_at: new Date().toISOString()
      }
    ])
    .select();
  return { data, error };
}