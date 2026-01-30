export const calculateCompletionForecast = (
  startDate: Date,
  baseWeeks: number,
  curriculumDensity: number, // 1.0 is standard, 1.5 is dense/struggling
  frictionScore: number      // Number of flagged technical terms
) => {
  // Logic: Each friction point adds 5% more 'density' (time) to the module
  const adjustedDensity = curriculumDensity + (frictionScore * 0.05);
  const totalWeeksNeeded = baseWeeks * adjustedDensity;
  
  const forecastDate = new Date(startDate);
  forecastDate.setDate(forecastDate.getDate() + (totalWeeksNeeded * 7));
  
  return {
    forecastDate,
    densityPercentage: Math.round(adjustedDensity * 100),
    delayWeeks: Math.max(0, totalWeeksNeeded - baseWeeks)
  };
};
