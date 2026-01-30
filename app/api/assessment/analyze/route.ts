import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseDB';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, studentId } = await req.json();

    // 1. ANALOG-TO-DIGITAL EXTRACTION (Simulation of OCR Pipeline)
    // In production, you would call an AI Vision API here
    const extractedText = "L'étudiant a des difficultés avec le système d'embrayage."; 
    
    // 2. BILINGUAL TECHNICAL MAPPING
    // Searching for technical terms in the extracted text
    const technicalDictionary = [
      { fr: 'embrayage', en: 'clutch', weight: 85 },
      { fr: 'frein', en: 'brake', weight: 40 }
    ];

    const foundFriction = technicalDictionary.filter(term => 
      extractedText.toLowerCase().includes(term.fr)
    );

    // 3. UPDATE CURRICULUM DENSITY
    if (foundFriction.length > 0) {
      await supabase.from('friction_logs').insert(
        foundFriction.map(f => ({
          student_id: studentId,
          term: f.fr,
          friction_index: f.weight,
          timestamp: new Date().toISOString()
        }))
      );
    }

    return NextResponse.json({ success: true, termsFound: foundFriction });
  } catch (error) {
    return NextResponse.json({ error: 'Extraction failed' }, { status: 500 });
  }
}