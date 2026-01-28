import { supabase } from '@/lib/supabase';

export async function mapTechnicalTerms(rawText: string, courseId: string) {
  if (!rawText) return [];
  
  const words = rawText.toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3); // Filter out short noise

  if (words.length === 0) return [];

  const { data: matches, error } = await supabase
    .from('vocational_mapping')
    .select('term_en, term_fr, trade_category')
    .or(`term_en.in.(${words.join(',')}),term_fr.in.(${words.join(',')})`);

  if (error) {
    console.error("Mapping Error:", error);
    return [];
  }

  // Filter matches that belong to the selected trade/course
  return matches || [];
}