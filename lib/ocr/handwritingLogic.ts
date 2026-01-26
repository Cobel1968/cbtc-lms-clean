import { supabase } from '@/lib/supabaseClient';

const VOCATIONAL_DICTIONARY: Record<string, { en: string; cat: string; weight: number }> = {
    "assurance qualite": { en: "quality assurance", cat: "QA", weight: 0.95 },
    "controle qualite": { en: "quality control", cat: "QC", weight: 0.9 },
    "non-conformite": { en: "non-conformance", cat: "QC", weight: 0.85 },
    "amelioration continue": { en: "continuous improvement", cat: "QM", weight: 0.95 },
    "apprentissage automatique": { en: "machine learning", cat: "IA", weight: 0.9 }
};

export const process_handwriting_data = async (userId: string, text: string) => {
    return { success: true, terms: [] };
};

export function useOCRBridge() {
    return {
        processHandwriting: async (userId: string, text: string) => {
            return await process_handwriting_data(userId, text);
        },
        isProcessing: false
    };
}