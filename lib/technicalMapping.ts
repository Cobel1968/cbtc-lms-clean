import { supabase } from './supabase';

export const scoreTechnicalFluency = async (extractedText: string, moduleId: string) => {
  // 1. Fetch relevant terms for this module (simplified for now)
  const { data: terms } = await supabase
    .from('technical_dictionary')
    .select('term_en, term_fr, complexity_weight');

  if (!terms) return { score: 100, missingTerms: [] };

  let totalWeight = 0;
  let missingWeight = 0;
  const missingTerms: string[] = [];

  terms.forEach(term => {
    const regexEn = new RegExp(term.term_en, 'gi');
    const regexFr = new RegExp(term.term_fr, 'gi');
    
    totalWeight += Number(term.complexity_weight);
    
    if (!regexEn.test(extractedText) && !regexFr.test(extractedText)) {
      missingWeight += Number(term.complexity_weight);
      missingTerms.push(term.term_en);
    }
  });

  const score = Math.max(0, 100 - (missingWeight / totalWeight * 100));
  return { score, missingTerms };
};
