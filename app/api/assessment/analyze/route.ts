export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseDB';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Check for URL presence inside the handler to prevent build-time panics
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn("Supabase URL missing during request execution");
      return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    const body = await req.json();
    const { imageUrl, studentId } = body;

    // 1. ANALOG-TO-DIGITAL EXTRACTION (Simulation)
    const extractedText = "L'étudiant a des difficultés avec le système d'embrayage."; 
    
    // 2. BILINGUAL TECHNICAL MAPPING
    const technicalDictionary = [
      { fr: 'embrayage', en: 'clutch', weight: 85 },
      { fr: 'frein', en: 'brake', weight: 40 }
    ];

    const foundFriction = technicalDictionary.filter(term => 
      extractedText.toLowerCase().includes(term.fr)
    );

    // 3. UPDATE CURRICULUM DENSITY
    if (foundFriction.length > 0) {
      const { error: dbError } = await supabase.from('friction_logs').insert(
        foundFriction.map(f => ({
          student_id: studentId,
          term: f.fr,
          friction_index: f.weight,
          timestamp: new Date().toISOString()
        }))
      );
      if (dbError) throw dbError;
    }

    return NextResponse.json({ success: true, termsFound: foundFriction });
  } catch (error: any) {
    console.error("OCR Error:", error.message);
    return NextResponse.json({ error: 'Extraction failed', details: error.message }, { status: 500 });
  }
}