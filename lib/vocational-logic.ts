import { supabase } from '@/lib/supabaseDB';

export async function mapTechnicalTerms(rawText: string, courseId: string) {
  if (!rawText || rawText.length < 5) return [];
  
  // 1. Clean the text and create a list of words
  const words = rawText.toLowerCase()
    .replace(/[^\w\sàâäéèêëîïôöùûüç]/gi, ' ') // Support French characters
    .split(/\s+/)
    .filter(w => w.length > 3);

  if (words.length === 0) return [];

  // 2. Search for ANY matching terms in your vocational_mapping
  const { data: matches, error } = await supabase
    .from('vocational_mapping')
    .select('term_en, term_fr, trade_category')
    .or(`term_en.in.(${words.join(',')}),term_fr.in.(${words.join(',')})`);

  if (error) {
    console.error("Mapping Error:", error);
    return [];
  }

  return matches || [];
}