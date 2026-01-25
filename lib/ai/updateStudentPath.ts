import { supabase } from '@/lib/supabaseClient';

/**
 * COBEL AI ENGINE - Temporal Optimization
 * Logic: Adjusts 'Timeframe Prediction' based on OCR-extracted Technical Fluency.
 */
export async function updateStudentPath(userId: string, extractedTerms: any[]) {
  try {
    // 1. Calculate the Fluency Weighted Average
    const totalScore = extractedTerms.reduce((acc, curr) => acc + curr.fluencyScore, 0);
    const avgFluency = extractedTerms.length > 0 ? totalScore / extractedTerms.length : 0;

    // 2. Fetch current profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('timeframe_prediction, curriculum_density')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    // 3. APPLY PEDAGOGICAL LOGIC: 
    // If fluency is > 80, compress the timeline by 15%
    let newDensity = profile.curriculum_density;
    let newTimeframe = profile.timeframe_prediction;

    if (avgFluency > 80) {
      newDensity += 10; // Increase density (more complex topics sooner)
      newTimeframe = Math.floor(profile.timeframe_prediction * 0.85); // 15% reduction in time
    }

    // 4. Update the Database (No manual trainer intervention required)
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        curriculum_density: newDensity,
        timeframe_prediction: newTimeframe,
        last_assessment_type: 'analog_bridge_ocr'
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    console.log(`🚀 Temporal Optimization Applied: New timeframe is ${newTimeframe} days.`);
    return { success: true, newTimeframe };
  } catch (err) {
    console.error("❌ Optimization Engine Error:", err);
    return { success: false };
  }
}
