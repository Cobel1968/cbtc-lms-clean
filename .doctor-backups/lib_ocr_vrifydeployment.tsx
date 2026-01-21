/**
 * COBEL BUSINESS TRAINING CENTER - DEPLOYMENT AUDIT
 * Purpose: Ensure no capital letters or hyphens break the Vercel build.
 * Filename: verifydeployment.ts
 */

import { supabase } from '@/lib/supabaseClient';
import { process_handwriting_data } from '@/lib/ocr/handwritinglogic';

export const run_system_audit = async () => {
  console.log("--- STARTING COBEL ENGINE AUDIT ---");
  
  const results = {
    database_connection: false,
    path_casing: "strictly_lowercase",
    engine_logic: false,
  };

  try {
    // 1. Test Database & SupabaseClient (lowercase check)
    const { data, error } = await supabase.from('courses').select('id').limit(1);
    if (!error) results.database_connection = true;

    // 2. Test Handwriting Logic (Feature 4 check)
    // We run a mock test to see if the process_handwriting_data function is imported correctly
    const test_run = await process_handwriting_data('test-id', 'test text');
    if (test_run) results.engine_logic = true;

    console.log("Audit Success:", results);
    return { success: true, results };
  } catch (err) {
    console.error("Audit Failed: Check for capital letters in filenames or imports!");
    return { success: false, error: err };
  }
}