/**
 * COBEL AI ENGINE - FEATURE 4
 * Innovation: Analog-to-Digital Pedagogical Bridge
 * Purpose: Technical Term Extraction from Handwriting OCR
 */

interface TechnicalMapping {
  term: string;
  category: string;
  fluencyScore: number;
}

const VOCATIONAL_DICTIONARY = {
  fr: ['disjoncteur', 'moteur synchrone', 'câblage', 'tension'],
  en: ['circuit breaker', 'synchronous motor', 'wiring', 'voltage']
};

export const processHandwritingOCR = (rawText: string, lang: 'en' | 'fr'): TechnicalMapping[] => {
  const detectedTerms: TechnicalMapping[] = [];
  const normalizedText = rawText.toLowerCase();

  // Extract terms based on the vocational dictionary
  VOCATIONAL_DICTIONARY[lang].forEach(term => {
    if (normalizedText.includes(term)) {
      detectedTerms.push({
        term: term,
        category: "Electrical Engineering", // Example vocational category
        fluencyScore: calculateFluency(normalizedText, term)
      });
    }
  });

  return detectedTerms;
};

// Logic to determine how well the term was used in context
function calculateFluency(text: string, term: string): number {
  const wordCount = text.split(' ').length;
  // Pedagogical Logic: Density of technical terms vs noise
  return Math.min(100, (term.length / wordCount) * 1000);
}