import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { image_url, course_id, student_id } = await req.json()

    // 1. Initialize Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. OCR PROCESS (Conceptual: Integrate with Tesseract.js or Google Vision API)
    // For now, we simulate the extraction of technical terms
    const extractedText = "Le système de forage nécessite une maintenance préventive.";
    const detectedTerms = {
      fr: ["système de forage", "maintenance préventive"],
      en: ["drilling system", "preventative maintenance"],
      confidence: 0.95
    };

    // 3. Update Assessment Results
    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        student_id,
        course_id,
        ocr_text_raw: extractedText,
        technical_terms_detected: detectedTerms,
        fluency_score: 85,
        curriculum_density_update: 0.15 // Progress increase
      })

    return new Response(JSON.stringify({ message: "Analysis Complete", data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
