import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { mockOcrExtraction } from '@/lib/ocrService';

export const dynamic = 'force-dynamic';

/**
 * FEATURE 4: Analog-to-Digital Pedagogical Bridge
 * Updated to use @supabase/ssr to resolve createRouteHandlerClient TypeError.
 */

export async function POST(req: Request) {
  const cookieStore = cookies();
  
  // Initialize Supabase Client directly to bypass faulty helper imports
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle edge cases where cookies cannot be set in some API environments
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle edge cases where cookies cannot be removed
          }
        },
      },
    }
  );

  let assessmentId: string | null = null;

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.imageUrl || !body.userId) {
      return NextResponse.json({ error: "missing required fields: image and user identity" }, { status: 400 });
    }

    const { imageUrl, userId } = body;

    // PEDAGOGICAL LOGIC: Mapping technical terms
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
    const { error: rpcError } = await supabase.rpc('increment_minutes', { 
      user_id_param: userId, 
      minutes_to_add: adjustment_minutes 
    });

    if (rpcError) {
      /**
       * CRITICAL ROLLBACK: Cobel Engine Integrity Protocol
       * If RPC fails, we remove the assessment record.
       */
      if (assessmentId) {
        await supabase.from('vocational_assessments').delete().eq('id', assessmentId);
        console.warn(`[Cobel Engine] Rollback executed for assessment ${assessmentId}`);
      }
      throw new Error("Temporal Optimization sync failed. Data rolled back.");
    }

    return NextResponse.json({ 
      success: true,
      message: "analog-to-digital bridge complete",
      data: {
        score: fluency_score,
        adjustment_minutes: adjustment_minutes,
        ingestion_id: assessmentId
      }
    });

  } catch (error: any) {
    console.error('[Cobel Engine Bridge] Fatal Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}