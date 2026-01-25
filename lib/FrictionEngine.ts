export type friction_data = {
  term: string;
  category: 'mechanical' | 'hospitality' | 'electrical';
  english_score: number;
  french_score: number;
  attempts: number;
};

/**
 * Cobel AI Engine: Bilingual Friction Algorithm
 * Weights the gap between L1 (French) and L2 (English) technical fluency.
 */
export function calculate_friction_index(data: friction_data[]) {
  return data.map(item => {
    // 1. The Bilingual Gap (The 'Friction' core)
    const gap = Math.abs(item.english_score - item.french_score);
    
    // 2. The Competency Deficit (How far they are from 100%)
    const avg = (item.english_score + item.french_score) / 2;
    const deficit = 100 - avg;

    // 3. The Attempt Penalty (Increases friction if they struggle repeatedly)
    const attempt_multiplier = item.attempts > 1 ? 1 + (item.attempts * 0.05) : 1;

    /**
     * Mathematical Logic:
     * - 60% weight on the bilingual imbalance (Friction)
     * - 40% weight on general lack of knowledge (Deficit)
     */
    const base_friction = (gap * 0.6) + (deficit * 0.4);
    const final_score = base_friction * attempt_multiplier;
    
    return {
      ...item,
      // Ensure we don't exceed 100% and return as a formatted string
      friction_index: Math.min(final_score, 100).toFixed(1)
    };
  }).sort((a, b) => Number(b.friction_index) - Number(a.friction_index));
}
