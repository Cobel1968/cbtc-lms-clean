import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS for browser requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Get the image from the request
    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file || !userId) throw new Error('Missing file or userId')

    // 2. Perform OCR (Example using a fetch to an OCR service)
    // Replace 'YOUR_OCR_API_KEY' with your actual key in Supabase Secrets
    const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { 'apikey': Deno.env.get('OCR_API_KEY') || 'helloworld' },
      body: formData // Sends the image directly
    })
    
    const ocrData = await ocrResponse.json()
    const extractedText = ocrData.ParsedResults?.[0]?.ParsedText || ""

    // 3. Bilingual Mapping Logic (The Cobel Brain)
    const technicalTerms = [
      { en: 'safety', fr: 'sécurité' },
      { en: 'maintenance', fr: 'maintenance' },
      { en: 'protocol', fr: 'protocole' }
    ]

    let score = 0
    technicalTerms.forEach(term => {
      if (extractedText.toLowerCase().includes(term.en) || extractedText.toLowerCase().includes(term.fr)) {
        score += 33 // Simple weighting for 3 key terms
      }
    })

    // 4. Update the User's Digital Profile
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        handwriting_fluency_score: score,
        last_assessment_text: extractedText.substring(0, 500) 
      })
      .eq('id', userId)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true, score, text: extractedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})