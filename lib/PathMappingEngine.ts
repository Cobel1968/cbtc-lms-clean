/**
 * FEATURE 2: Dynamic Path Mapping
 * Logic: Adjusts graduation dates based on Technical Fluency Scores.
 * Author: Abel C.
 */

export interface PathProjection {
  originalWeeks: number;
  optimizedWeeks: number;
  timeSaved: number;
  densityAdjustment: string;
}

export const calculateOptimizedPath = (
  baseDuration: number, 
  fluencyScore: number
): PathProjection => {
  // Logic: High fluency (e.g., 0.85) reduces duration by up to 30%
  // Formula: Optimized = Base * (1 - (Fluency * 0.3))
  
  const optimizationFactor = fluencyScore * 0.3; 
  const optimizedWeeks = Math.ceil(baseDuration * (1 - optimizationFactor));
  const timeSaved = baseDuration - optimizedWeeks;

  return {
    originalWeeks: baseDuration,
    optimizedWeeks: optimizedWeeks,
    timeSaved: timeSaved,
    densityAdjustment: fluencyScore > 0.7 ? 'High Density / Fast Track' : 'Standard Density'
  };
};