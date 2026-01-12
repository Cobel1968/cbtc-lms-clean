'use server'

import { createClient } from '@/lib/supabaseClient'; // Using the lowercase path we stabilized
import { 
  process_handwritten_assessment, 
  update_curriculum_from_handwriting 
} from '@/lib/handwritingprocessor';
import { User } from '@/lib/types';

/**
 * SERVER ACTION: SYNC_HANDWRITING_TO_ENGINE
 * This fulfills the "Automated Milestone Forecasting" innovation by
 * updating the digital profile from an analog source.
 */
export async function syncHandwritingToEngine(userId: string, imageBase64: string) {
  const supabase = createClient();

  try {
    // 1. Run the Handwriting Analysis Module
    const analysis = await process_handwritten_assessment(imageBase64);

    // 2. Fetch current User metrics for Temporal Optimization
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('timeframe_prediction, bilingual_technical_fluency')
      .eq('id', userId)
      .single();

    if (userError || !user) throw new Error("User profile not found");

    // 3. Calculate optimized timeframe (Phase 2: Dynamic Path Mapping)
    // Assuming timeframe_prediction is stored as a number of weeks in DB
    const currentWeeks = parseInt(user.timeframe_prediction) || 12;
    const newWeeks = update_curriculum_from_handwriting(currentWeeks, analysis.adjustment_value);

    // 4. Update the Database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        timeframe_prediction: `${newWeeks} weeks`,
        bilingual_technical_fluency: user.bilingual_technical_fluency + (analysis.extracted_terms.length * 2),
        last_assessment_confidence: analysis.confidence
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    return { 
      success: true, 
      new_forecast: `${newWeeks} weeks`,
      terms_detected: analysis.extracted_terms 
    };

  } catch (error) {
    console.error("Critical Bridge Failure:", error);
    return { success: false, error: "Failed to sync analog data to engine." };
  }
}