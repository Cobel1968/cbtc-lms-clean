export const calculateInitialDensity = (score) => score > 85 ? 0.7 : score < 45 ? 1.3 : 1.0;
export const getMappedPath = (domain, score) => {
  const level = score > 75 ? 'advanced' : score > 40 ? 'intermediate' : 'beginner';
  const paths = {
    'manufacturing': {
      'beginner': ['mfg-safety', 'tools-intro'],
      'intermediate': ['mfg-qa-standard', 'iso-9001'],
      'advanced': ['six-sigma-lean', 'advanced-auditing']
    }
  };
  return paths[domain]?.[level] || paths[domain]['beginner'];
};
export const forecastCompletion = (startDate, progress, density) => {
  const baseDays = 21;
  const daysRemaining = (baseDays * density) * (1 - progress / 100);
  const forecast = new Date(startDate);
  forecast.setDate(forecast.getDate() + Math.ceil(daysRemaining));
  return forecast;
};
export const checkTechnicalFluency = (text, glossary) => {
  if (!text) return 0;
  const matches = glossary.filter(term => text.toLowerCase().includes(term.toLowerCase()));
  return Math.round((matches.length / glossary.length) * 100);
};
