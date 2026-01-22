/**
 * COBEL AI ENGINE: CONTEXTUAL EXTRACTION MOCK
 * Innovation Type: Computer-Implemented Pedagogical Logic
 * Solves: Bilingual technical friction and automated milestone forecasting.
 */

export const mockOcrExtraction = (rawText: string) => {
  // Proprietary Bilingual Vocational Map (Feature 1: Bilingual Vocational Mapping)
  const technicalDictionary = [
    { en: 'torque wrench', fr: 'clé dynamométrique', weight: 50 },
    { en: 'circuit breaker', fr: 'disjoncteur', weight: 40 },
    { en: 'multimeter', fr: 'multimètre', weight: 30 },
    { en: 'grounding', fr: 'mise à la terre', weight: 45 }
  ];

  const detected_en: string[] = [];
  const detected_fr: string[] = [];
  let totalWeight = 0;

  const lowercaseText = rawText.toLowerCase();

  // Logic: Identify French terms in physical assessments and map to English mastery
  technicalDictionary.forEach(term => {
    if (lowercaseText.includes(term.fr.toLowerCase())) {
      detected_fr.push(term.fr);
      detected_en.push(term.en); // Feature 4: Analog-to-Digital Bridge (Term Mapping)
      totalWeight += term.weight;
    }
  });

  /**
   * PEDAGOGICAL SCORE CALCULATION
   * Calculate fluency score (0.0 to 1.0)
   * A total weight of 100 or higher results in 100% fluency for this assessment.
   */
  const fluency_score = Math.min(totalWeight / 100, 1.0);
  
  /**
   * TEMPORAL OPTIMIZATION LOGIC (Feature 3)
   * Formula: 480 mins per 0.5 fluency points.
   * Max Adjustment: 960 minutes (16 hours) per assessment sync.
   */
  const adjustment_minutes = Math.floor(fluency_score * 960);

  return {
    detected_en,
    detected_fr,
    fluency_score: Math.round(fluency_score * 100), // Return as percentage for UI
    adjustment_minutes
  };
};