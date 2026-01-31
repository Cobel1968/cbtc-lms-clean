export const analyzeTechnicalFluency = (rawText: string) => {
  const technicalLexicon = {
    en: ['voltage', 'circuit', 'torque', 'manifold', 'injector', 'maintenance'],
    fr: ['tension', 'courant', 'couple', 'collecteur', 'injecteur', 'entretien']
  };

  const words = rawText.toLowerCase().split(/\W+/);
  
  const enCount = words.filter(w => technicalLexicon.en.includes(w)).length;
  const frCount = words.filter(w => technicalLexicon.fr.includes(w)).length;

  // Logic: 10% fluency boost for every unique technical term found
  return {
    englishBoost: Math.min(enCount * 10, 100),
    frenchBoost: Math.min(frCount * 10, 100),
    detectedTerms: words.filter(w => [...technicalLexicon.en, ...technicalLexicon.fr].includes(w))
  };
};