export const analyzeTechnicalFluency = (rawText: string) => {
  const lexicon = {
    automotive: {
      en: ['piston', 'gasket', 'crankshaft', 'engine', 'braking'],
      fr: ['piston', 'joint', 'vilebrequin', 'moteur', 'freinage']
    },
    electrical: {
      en: ['ohmmeter', 'fuse', 'transformer', 'voltage', 'circuit'],
      fr: ['ohmmètre', 'fusible', 'transformateur', 'tension', 'courant']
    },
    business: {
      en: ['revenue', 'compliance', 'strategy', 'profit', 'audit'],
      fr: ['chiffre d\'affaires', 'conformité', 'stratégie', 'bénéfice', 'audit']
    }
  };

  const words = rawText.toLowerCase().split(/\W+/);
  
  // Scoring across all domains
  let enPoints = 0;
  let frPoints = 0;
  let detectedDomain = "General Vocational";

  const domains = Object.keys(lexicon) as Array<keyof typeof lexicon>;
  
  domains.forEach(domain => {
    const enMatches = words.filter(w => lexicon[domain].en.includes(w)).length;
    const frMatches = words.filter(w => lexicon[domain].fr.includes(w)).length;
    
    enPoints += enMatches;
    frPoints += frMatches;

    if (enMatches > 2 || frMatches > 2) {
      detectedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    }
  });

  return {
    englishFluency: Math.min(enPoints * 12, 100),
    frenchFluency: Math.min(frPoints * 12, 100),
    domain: detectedDomain,
    timestamp: new Date().toISOString()
  };
};