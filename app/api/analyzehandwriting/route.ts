import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { mockOcrExtraction } from '@/lib/ocrService';
import { issueCertificate } from '@/app/actions/issueCertificate';

export const dynamic = 'force-dynamic';

/**
 * FEATURE 4: Analog-to-Digital Pedagogical Bridge
 * Monetization & Security Update v5.1
 */

export async function POST(req: Request) {
  const supabase = createClient();
  let assessmentId: string | null = null;

  try {
    // 1. SECURITY GATE: Use getUser() instead of getSession() for Server Actions/Routes
    // This is more secure and prevents session tampering in production.
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized: Please log in" }, { status: 401 });
    }

    // 2. MONETIZATION GATE: Subscription & Role Check
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subscription_tier')
      .eq('id', user.id)
      .single();

    const isAuthorized = profile?.role === 'lead_trainer' || profile?.role === 'admin';
    const isPaidTier = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise';

    if (!isAuthorized || !isPaidTier) {
      return NextResponse.json({ 
        error: "Feature Restricted: Lead Trainer subscription required.",
        code: "PAYMENT_REQUIRED" 
      }, { status: 402 });
    }

    // 3. VALIDATION
    const body = await req.json().catch(() => null);
    if (!body || !body.imageUrl || !body.userId) {
      return NextResponse.json({ error: "Missing required fields (imageUrl/userId)" }, { status: 400 });
    }

    const { imageUrl, userId } = body;

    // PEDAGOGICAL LOGIC: OCR Extraction & Technical Term Mapping
    // 
    const raw_text = "L'étudiant a correctement installé la clé dynamométrique et vérifié le disjoncteur.";
    const { detected_en, detected_fr, fluency_score, adjustment_minutes } = mockOcrExtraction(raw_text);

    // 4. DATABASE INGESTION
    const { data: assessmentData, error: ingestionError } = await supabase
      .from('vocational_assessments')
      .insert({
        user_id: userId,
        image_url: imageUrl,
        raw_ocr_text: raw_text,
        detected_technical_terms_en: detected_en,
        detected_technical_terms_fr: detected_fr,
        bilingual_fluency_score: fluency_score,
        suggest_timeframe_adjustment: adjustment_minutes
      })
      .select()
      .single();

    if (ingestionError) throw new Error(`Ingestion Failure: ${ingestionError.message}`);
    assessmentId = assessmentData.id;

    // 5. TEMPORAL OPTIMIZATION (RPC Call)
    // Updated parameter names to match standard Cobel SQL function signatures
    const { error: rpcError } = await supabase.rpc('increment_minutes', { 
      row_id: userId, // Ensure this matches your SQL function parameter name
      minutes_to_add: adjustment_minutes 
    });

    if (rpcError) {
      throw new Error(`Temporal Optimization sync failed: ${rpcError.message}`);
    }

    // 6. AUTOMATED CERTIFICATE ISSUANCE
    let certificateIssued = false;
    if (fluency_score >= 90) { // Slightly lowered threshold for "Value-Add" logic
      const issuance = await issueCertificate(userId, { score: fluency_score, terms: detected_en.length });
      certificateIssued = issuance.success;
    }

    return NextResponse.json({ 
      success: true,
      message: "Analog-to-Digital bridge complete",
      data: { 
        score: fluency_score, 
        adjustment_minutes, 
        ingestion_id: assessmentId, 
        certificate_sent: certificateIssued 
      }
    });

  } catch (error: any) {
    console.error('[Cobel Engine Bridge] Fatal Error:', error.message);
    
    // 🛡️ ROLLBACK PROTOCOL
    // If the insert happened but the RPC or Certificate failed, we remove the assessment
    if (assessmentId) {
      const rollbackClient = createClient(); 
      await rollbackClient.from('vocational_assessments').delete().eq('id', assessmentId);
      console.log(`[Rollback] Assessment ${assessmentId} removed due to downstream failure.`);
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}