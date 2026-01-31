import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  // Fetch all vocational assessments to identify term struggle patterns
  const { data, error } = await supabase
    .from('vocational_assessments')
    .select('detected_technical_terms_en, detected_technical_terms_fr, bilingual_fluency_score');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Logic: Identify terms from low-scoring assessments (< 0.7)
  const frictionTerms = data
    .filter(a => a.bilingual_fluency_score < 0.7)
    .flatMap(a => [...a.detected_technical_terms_en, ...a.detected_technical_terms_fr]);

  // Count occurrences to find the "Heat"
  const heatmap = frictionTerms.reduce((acc: any, term: string) => {
    acc[term] = (acc[term] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ 
    success: true, 
    heatmap,
    averageFriction: data.length > 0 ? 1 - (data.reduce((s, a) => s + Number(a.bilingual_fluency_score), 0) / data.length) : 0
  });
}
