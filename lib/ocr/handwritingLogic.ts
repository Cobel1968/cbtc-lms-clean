import { supabase } from '@/lib/supabaseDB';

const VOCATIONAL_DICTIONARY: Record<string, { en: string; cat: string; weight: number }> = {
    // Quality & Finance
    "assurance qualit\u00e9": { en: "quality assurance", cat: "QA", weight: 0.95 },
    "contr\u00f4le qualit\u00e9": { en: "quality control", cat: "QC", weight: 0.9 },
    "am\u00e9lioration continue": { en: "continuous improvement", cat: "QM", weight: 0.95 },
    "flux de tr\u00e9sorerie": { en: "cash flow", cat: "Finances", weight: 0.85 },
    
    // Technical & Industrial
    "apprentissage automatique": { en: "machine learning", cat: "IA", weight: 0.9 },
    "d\u00e9ploiement": { en: "deployment", cat: "IT", weight: 0.7 },
    "cha\u00eene du froid": { en: "cold chain", cat: "Food & Hygiene", weight: 0.9 },
    "forage": { en: "drilling", cat: "Oil & Gas", weight: 0.85 },
    "fid\u00e9lisation": { en: "customer retention", cat: "Sales", weight: 0.75 }
};

export const process_handwriting_data = async (user_id: string, extracted_text: string) => {
    const text = extracted_text.toLowerCase();
    const foundTerms: any[] = [];

    Object.keys(VOCATIONAL_DICTIONARY).forEach(key => {
        if (text.includes(key)) {
            foundTerms.push({ term_fr: key, ...VOCATIONAL_DICTIONARY[key] });
        }
    });

    const { error } = await supabase
        .from('user_profiles')
        .update({ 
            last_assessment_terms: foundTerms,
            updated_at: new Date().toISOString()
        })
        .eq('id', user_id);

    return { success: !error, terms: foundTerms };
};

export function useOCRBridge() {
    return {
        processHandwriting: async (userId: string, text: string) => {
            return await process_handwriting_data(userId, text);
        },
        isProcessing: false
    };
}