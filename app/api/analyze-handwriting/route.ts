export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image_url, course_id, student_id } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ANALOG-TO-DIGITAL LOGIC (OCR Simulation)
    // In production, you would call Google Vision or Tesseract here
    const extractedText = "Vocational assessment: Drilling and Safety protocols.";
    const detectedTerms = {
      fr: ["forage", "sécurité"],
      en: ["drilling", "safety"],
      confidence: 0.98
    };

    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        student_id,
        course_id,
        ocr_text_raw: extractedText,
        technical_terms_detected: detectedTerms,
        fluency_score: 92,
        curriculum_density_update: 0.20
      });

    if (error) throw error;

    return NextResponse.json({ message: "Analysis Complete", data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
