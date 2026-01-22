import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { mockOcrExtraction } from '@/lib/ocrService';

export const dynamic = 'force-dynamic';

/**
 * FEATURE 4: Analog-to-Digital Pedagogical Bridge
 * Logic: Ingests physical assessments -> Extracts Bilingual Terms -> Updates Temporal Forecast
 */

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // Track assessment ID for potential rollback
  let assessmentId: string | null = null;

  try {
    const { imageUrl, userId } = await req.json();

    if (!imageUrl || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // PEDAGOGICAL LOGIC: Mapping technical terms (e.g., Clé dynamométrique -> Torque Wrench)
    const raw_text = "L'étudiant a correctement installé la clé dynamométrique et vérifié le disjoncteur.";
    
    const { 
      detected_en, 
      detected_fr, 
      fluency_score, 
      adjustment_minutes 
    } = mockOcrExtraction(raw_text);

    // 1. DATABASE INGESTION
    const { data: assessmentData, error: ingestionError } = await supabase
      .from('vocational_assessments')
      .insert({
        user_id: userId,
        image_url: imageUrl,
        raw_ocr_text: raw_text,
        detected_technical_terms_en: detected_en,
        detected_technical_terms_fr: detected_fr,
        bilingual_fluency_score: fluency_score,
        suggested_timeframe_adjustment: adjustment_minutes
      })
      .select()
      .single();

    if (ingestionError) throw new Error(`Ingestion Failure: ${ingestionError.message}`);
    assessmentId = assessmentData.id;

    // 2. TEMPORAL OPTIMIZATION (RPC Call)
    // This updates the 'total_minutes_spent' in the profiles table
    const { error: rpcError } = await supabase.rpc('increment_minutes', { 
      user_id_param: userId, // Ensure this matches your SQL function parameter name
      minutes_to_add: adjustment_minutes 
    });

    if (rpcError) {
      /**
       * CRITICAL ROLLBACK: If the time forecast fails to update, 
       * we remove the assessment record to maintain data integrity.
       */
      await supabase.from('vocational_assessments').delete().eq('id', assessmentId);
      console.error('[Cobel Engine] Rollback executed: Assessment deleted due to RPC failure');
      throw new Error("Temporal Optimization failed to persist. Rollback successful.");
    }

    return NextResponse.json({ 
      success: true,
      message: "analog-to-digital bridge complete: milestone forecast updated",
      data: {
        score: fluency_score,
        adjustment_minutes: adjustment_minutes,
        terms_mapped: detected_en.length + detected_fr.length,
        ingestion_id: assessmentId,
        logic_applied: "temporal_optimization_v1"
      }
    });

  } catch (error: any) {
    console.error('[Cobel Engine] Handwriting Analysis Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}