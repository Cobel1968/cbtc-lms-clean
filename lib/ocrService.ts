/**
 * Cobel AI Engine: Contextual Extraction Mock
 * Solves: Bilingual technical fluency assessment.
 */

export const mockOcrExtraction = (rawText: string) => {
  // Proprietary Bilingual Vocational Map
  const technicalDictionary = [
    { en: 'torque wrench', fr: 'clé dynamométrique', weight: 50 },
    { en: 'circuit breaker', fr: 'disjoncteur', weight: 40 },
    { en: 'multimeter', fr: 'multimètre', weight: 30 },
    { en: 'grounding', fr: 'mise à la terre', weight: 45 }
  ];

  const detected_en: string[] = [];
  const detected_fr: string[] = [];
  let totalWeight = 0;

  technicalDictionary.forEach(term => {
    if (rawText.toLowerCase().includes(term.fr)) {
      detected_fr.push(term.fr);
      detected_en.push(term.en);
      totalWeight += term.weight;
    }
  });

  // Calculate fluency score (0.0 to 1.0)
  const fluency_score = Math.min(totalWeight / 100, 1.0);
  
  // Temporal Optimization: 480 mins per 0.5 fluency points
  const adjustment_minutes = Math.floor(fluency_score * 960);

  return {
    detected_en,
    detected_fr,
    fluency_score,
    adjustment_minutes
  };
};