export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { createBuildSafeClient } from '@/lib/supabaseDB';

export async function POST(req: NextRequest) {
  try {
    const supabase = createBuildSafeClient(); // Initialize ONLY when called
    const { imageUrl, studentId } = await req.json();

    const extractedText = "L'étudiant a des difficultés avec le système d'embrayage."; 
    const technicalDictionary = [
      { fr: 'embrayage', en: 'clutch', weight: 85 },
      { fr: 'frein', en: 'brake', weight: 40 }
    ];

    const foundFriction = technicalDictionary.filter(term => 
      extractedText.toLowerCase().includes(term.fr)
    );

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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}