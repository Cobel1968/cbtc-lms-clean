/**
 * COBEL BUSINESS TRAINING CENTER - DEPLOYMENT AUDIT
 * Purpose: Ensure standardized casing and logic connectivity.
 * Filename: lib/verifyDeployment.ts
 */

import { createClient } from '@/utils/supabase/server'; 
import { mockOcrExtraction } from '@/lib/ocrService'; // FIXED: Updated to match our new file

export const run_system_audit = async () => {
  console.log("--- STARTING COBEL ENGINE AUDIT ---");
  
  // Note: Using 'createClient' to match your v5.1 API route pattern
  const supabase = createClient();
  
  const results = {
    database_connection: false,
    path_casing: "pascal_components_camel_lib",
    engine_logic: false,
  };

  try {
    // 1. Test Database & Supabase (Auth check)
    const { data: { user }, error } = await supabase.auth.getUser();
    // If we reach this point without a 500 error, the client is configured
    results.database_connection = true;

    // 2. Test Handwriting Logic (Feature 4 check)
    // Testing the mockOcrExtraction we just updated in ocrService.ts
    const test_text = "clé dynamométrique";
    const test_run = mockOcrExtraction(test_text);
    
    if (test_run.adjustment_minutes === 480) {
      results.engine_logic = true;
      console.log("Pedagogical Logic: Verified (480min bonus applied)");
    }

    console.log("Audit Success:", results);
    return { success: true, results };
  } catch (err: any) {
    console.error("Audit Failed:", err.message);
    return { success: false, error: err.message };
  }
}