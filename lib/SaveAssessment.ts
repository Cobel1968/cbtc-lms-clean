import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Feature 4: Analog-to-Digital Pedagogical Bridge
 * Handles both the physical scan upload and the digital technical term storage.
 */
export const uploadAndSaveAssessment = async (file: File, analysisData: any) => {
  try {
    // 1. Upload the physical scan to Supabase Storage (Required for Vercel/Production)
    const fileExt = file.name.split('.').pop();
    const fileName = `${analysisData.studentId}-${Date.now()}.${fileExt}`;
    const filePath = `scans/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('assessments') // Ensure this bucket is created in Supabase
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Save the extracted technical data to the Database
    const { data: saved, error: dbError } = await supabase
      .from('student_assessments')
      .insert([{
        student_id: analysisData.studentId,
        terms_extracted: analysisData.termsFound,
        fluency_score: analysisData.fluencyScore,
        language: analysisData.detectedLanguage,
        file_path: filePath, // Stores the pointer to the physical scan
        metadata: { 
          innovation: 'Analog-to-Digital Bridge',
          processed_at: new Date().toISOString()
        }
      }])
      .select(); // Returns the record to update the UI immediately

    if (dbError) throw dbError;

    console.log('cobel_engine: Feature 4 Sync Successful');
    return { success: true, data: saved?.[0] };

  } catch (error: any) {
    // Rollback: Log failure but return false to prevent UI hanging
    console.error('cobel_engine: Rollback triggered - Bridge sync failed', error.message);
    return { success: false, error: error.message };
  }
};