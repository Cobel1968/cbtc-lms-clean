// lib/engine/diagnosticlogic.ts
import { createClient } from '@/utils/supabase/server'; 

export async function getAdaptiveDiagnostic(courseId: string, studentLevel: 'beginner' | 'intermediate' | 'advanced') {
  const supabase = createClient();
  
  // 1. Fetch questions specifically siloed for this course
  // Note: We use the underscore 'assessment_pool' to match your SQL table
  let query = supabase
    .from('assessment_pool')
    .select('*')
    .eq('course_id', courseId);

  // 2. Adaptive Filtering Logic
  // This is the core of your "Computer-Implemented Pedagogical Logic"
  if (studentLevel === 'beginner') {
    query = query.lte('density_weight', 0.88); // Focus on Survival English
  } else {
    query = query.gt('density_weight', 0.89);  // Focus on Technical/Vocational
  }

  const { data, error } = await query.limit(15).order('random()');

  if (error) {
    console.error("Diagnostic Logic Error:", error.message);
    throw new Error("Failed to generate adaptive path.");
  }

  return data;
}