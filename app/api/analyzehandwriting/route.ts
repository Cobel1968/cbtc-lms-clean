import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { mockOcrExtraction } from '@/lib/ocrService';

export const dynamic = 'force-dynamic';

/**
 * FEATURE 4: Analog-to-Digital Pedagogical Bridge
 * Innovation: Handwriting ingestion that triggers Temporal Optimization.
 * This file uses a strict Rollback to ensure data integrity between 
 * vocational assessments and user profile minutes.
 */

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  // Tracking ID for potential Rollback
  let assessmentId: string | null = null;

  try {
    const { imageUrl, userId } = await req.json();

    if (!imageUrl || !userId) {
      return NextResponse.json({ error: "missing required fields: image and user identity" }, { status: 400 });
    }

    // PEDAGOGICAL LOGIC: Mapping technical terms (e.g., Clé dynamométrique -> Torque Wrench)
    // This bridges the bilingual friction in traditional vocational training.
    const raw_text = "L'étudiant a correctement installé la clé dynamométrique et vérifié le disjoncteur.";
    
    const { 
      detected_en, 
      detected_fr, 
      fluency_score, 
      adjustment_minutes 
    } = mockOcrExtraction(raw_text);

    // 1. DATABASE INGESTION: Storing the physical work record
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
    // This updates the 'total_minutes_spent' in the profiles table automatically.
    const { error: rpcError } = await supabase.rpc('increment_minutes', { 
      user_id_param: userId, 
      minutes_to_add: adjustment_minutes 
    });

    if (rpcError) {
      /**
       * CRITICAL ROLLBACK: Cobel Engine Integrity Protocol
       * If the profile's mastery time cannot be updated, we delete the
       * assessment record so the user doesn't see a "ghost" sync.
       */
      if (assessmentId) {
        await supabase.from('vocational_assessments').delete().eq('id', assessmentId);
        console.warn(`[Cobel Engine] Rollback executed: Assessment ${assessmentId} removed due to profile sync failure.`);
      }
      throw new Error("Temporal Optimization sync failed. Data rolled back for integrity.");
    }

    return NextResponse.json({ 
      success: true,
      message: "analog-to-digital bridge complete: milestone forecast updated",
      data: {
        score: fluency_score,
        adjustment_minutes: adjustment_minutes,
        terms_mapped: (detected_en?.length || 0) + (detected_fr?.length || 0),
        ingestion_id: assessmentId,
        logic_applied: "temporal_optimization_v1"
      }
    });

  } catch (error: any) {
    console.error('[Cobel Engine Bridge] Fatal Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}