/**
 * COBEL ENGINE: Bilingual Vocational Mapping Logic
 * Maps French technical terms found in handwriting to technical mastery minutes.
 */

const TECHNICAL_DICTIONARY = {
  fr: ["clé dynamométrique", "disjoncteur", "câblage", "tension"],
  en: ["torque wrench", "circuit breaker", "wiring", "voltage"]
};

export function mockOcrExtraction(text: string) {
  const lowercaseText = text.toLowerCase();
  
  const detected_fr = TECHNICAL_DICTIONARY.fr.filter(term => lowercaseText.includes(term));
  const detected_en = TECHNICAL_DICTIONARY.en.filter(term => lowercaseText.includes(term));

  // Logic: 240 minutes (4 hours) of credit per unique technical term identified
  const uniqueTerms = new Set([...detected_fr, ...detected_en]).size;
  const adjustment_minutes = uniqueTerms * 240;

  // Fluency score calculation (0 to 100)
  const fluency_score = Math.min(100, (uniqueTerms / 4) * 100);

  return {
    detected_en,
    detected_fr,
    fluency_score,
    adjustment_minutes: adjustment_minutes || 480 // Default to 8 hours if terms found
  };
}