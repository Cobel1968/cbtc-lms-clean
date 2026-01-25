/**
 * INNOVATION: Automated Milestone Forecasting
 * Logic: Maps Bilingual Fluency to Temporal Optimization.
 */

export interface MilestoneForecast {
  currentProgress: number;
  predictedCompletionDate: string;
  weeksSaved: number;
  status: 'standard' | 'accelerated' | 'elite';
}

export const getMilestoneForecast = (
  startDate: Date,
  baseWeeks: number,
  fluencyScore: number
): MilestoneForecast => {
  // Logic: 1.0 fluency = 30% reduction in time. 0.5 fluency = 0% reduction.
  const timeReductionFactor = Math.max(0, (fluencyScore - 0.5) * 0.6); 
  const optimizedWeeks = Math.ceil(baseWeeks * (1 - timeReductionFactor));
  const weeksSaved = baseWeeks - optimizedWeeks;

  const completionDate = new Date(startDate);
  completionDate.setDate(startDate.getDate() + (optimizedWeeks * 7));

  let status: 'standard' | 'accelerated' | 'elite' = 'standard';
  if (fluencyScore > 0.85) status = 'elite';
  else if (fluencyScore > 0.7) status = 'accelerated';

  return {
    currentProgress: Math.round(fluencyScore * 100),
    predictedCompletionDate: completionDate.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }),
    weeksSaved,
    status
  };
};