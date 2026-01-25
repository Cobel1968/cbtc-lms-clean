/**
 * COBEL ENGINE: Bilingual Vocational Mapping Logic
 * Feature 4: Analog-to-Digital Pedagogical Bridge
 * Purpose: Maps physical handwriting assessments to digital technical mastery.
 */

const TECHNICAL_DICTIONARY = {
  fr: ["clé dynamométrique", "disjoncteur", "câblage", "tension", "alternateur", "batterie"],
  en: ["torque wrench", "circuit breaker", "wiring", "voltage", "alternator", "battery"]
};

export function mockOcrExtraction(text: string) {
  const lowercaseText = text.toLowerCase();
  
  // Identify terms in both languages
  const detected_fr = TECHNICAL_DICTIONARY.fr.filter(term => lowercaseText.includes(term));
  const detected_en = TECHNICAL_DICTIONARY.en.filter(term => lowercaseText.includes(term));

  // Logic: 240 minutes (4 hours) of credit per unique technical concept identified
  // We use a Set to ensure "câblage" and "wiring" aren't double-counted if they mean the same thing
  const uniqueTerms = new Set([...detected_fr, ...detected_en]).size;
  
  // FIXED: Only grant minutes if unique terms are actually found.
  // If terms exist, we default to a minimum of 480 mins (8 hours) to reward the effort of handwriting.
  const calculated_minutes = uniqueTerms * 240;
  const adjustment_minutes = uniqueTerms > 0 ? Math.max(calculated_minutes, 480) : 0;

  // Fluency score calculation (0 to 100)
  // Assumes 4 technical terms demonstrates 'Mastery' for a single assessment
  const fluency_score = Math.min(100, (uniqueTerms / 4) * 100);

  return {
    detected_en,
    detected_fr,
    fluency_score,
    adjustment_minutes
  };
}