export type friction_data = {
  term: string;
  category: 'mechanical' | 'hospitality' | 'electrical';
  english_score: number;
  french_score: number;
  attempts: number;
};

export function calculate_friction_index(data: friction_data[]) {
  return data.map(item => {
    // friction is high when there is a large gap between EN and FR 
    // or when scores are low despite multiple attempts
    const gap = Math.abs(item.english_score - item.french_score);
    const avg = (item.english_score + item.french_score) / 2;
    const friction_score = (gap * 0.6) + ((100 - avg) * 0.4);
    
    return {
      ...item,
      friction_index: Math.min(friction_score, 100).toFixed(1)
    };
  }).sort((a, b) => Number(b.friction_index) - Number(a.friction_index));
}