/**
 * COBEL AI ENGINE - FEATURE 4
 * Logic for Analog-to-Digital Pedagogical Bridge
 * Filename: handwritinglogic.ts (lowercase, no-hyphens)
 */

import { supabase } from '@/lib/supabaseClient';

// 1. Bilingual Vocational Dictionary (Technical Jargon)
const VOCATIONAL_DICTIONARY = {
        // Quality Management (QA/QC/QM)
    "assurance qualité": { en: "quality assurance", cat: "QA", weight: 0.95 },
    "contrôle qualité": { en: "quality control", cat: "QC", weight: 0.9 },
    "gestion de la qualité totale": { en: "total quality management", cat: "QM", weight: 1.0 },
    "non-conformité": { en: "non-conformance", cat: "QC", weight: 0.85 },
    "audit interne": { en: "internal audit", cat: "QA", weight: 0.9 },
    "amélioration continue": { en: "continuous improvement", cat: "QM", weight: 0.95 },
    "norme iso": { en: "iso standard", cat: "QM", weight: 1.0 },
    // IT & IA (AI)
    "apprentissage automatique": { en: "machine learning", cat: "IA", weight: 0.9 },
    "déploiement": { en: "deployment", cat: "IT", weight: 0.7 },
    
    // Oil and Petrol Industry
    "forage": { en: "drilling", cat: "Oil & Gas", weight: 0.85 },
    "raffinage": { en: "refining", cat: "Oil & Gas", weight: 0.8 },

    // Health & Safety (HSE) & Food Hygiene
    "epi": { en: "ppe", cat: "Health & Safety", weight: 0.95 },
    "haccp": { en: "hazard analysis", cat: "Food & Hygiene", weight: 1.0 },
    "chaîne du froid": { en: "cold chain", cat: "Food & Hygiene", weight: 0.9 },

    // Sales & Customer Service
    "fidélisation": { en: "customer retention", cat: "Sales", weight: 0.75 },
    "prospection": { en: "prospecting", cat: "Sales", weight: 0.7 },
    "gestion des litiges": { en: "dispute management", cat: "Customer Service", weight: 0.8 },

    // Budgeting & Finance
    "flux de trésorerie": { en: "cash flow", cat: "Finances", weight: 0.85 },
    "amortissement": { en: "depreciation", cat: "Finances", weight: 0.9 }
};

// Feature 3: Temporal Optimization & Adaptive Acceleration
const calculate_pedagogical_acceleration = (foundTerms) => {
    let totalReductionDays = 0;
    const categoriesFound = new Set();

    foundTerms.forEach(term => {
        // Base reduction: weight * 2 days (e.g., weight 1.0 = 2 days saved)
        totalReductionDays += (term.weight || 0.5) * 2;
        categoriesFound.add(term.cat);
    });

    // Multi-Domain Bonus: If Quality (QA/QM) is combined with Technical (IT/Oil), add 20% bonus
    const hasQuality = [...categoriesFound].some(c => ["QA", "QC", "QM"].includes(c));
    const hasTechnical = [...categoriesFound].some(c => ["IT", "IA", "Oil & Gas"].includes(c));

    if (hasQuality && hasTechnical) {
        totalReductionDays *= 1.2; // 20% "Expertise Synergy" bonus
    }

    return Math.round(totalReductionDays * 10) / 10;
};

// Updated process function to include acceleration
export const process_handwriting_data = async (user_id: string, extracted_text: string) => {
    // ... (previous dictionary logic remains)
    const acceleration = calculate_pedagogical_acceleration(foundTerms);
    
    const { data, error } = await supabase
        .from('user_profiles')
        .update({ 
            last_assessment_terms: foundTerms,
            timeframe_prediction_offset: acceleration, // The 'Time Waste' solution
            updated_at: new Date().toISOString()
        })
        .eq('id', user_id);

    return { success: !error, acceleration, terms: foundTerms };
};
};
}

// Feature 4: Custom Hook for Ingestion Page
export function useOCRBridge() {
    return {
        processHandwriting: async (userId, text) => {
            return await process_handwriting_data(userId, text);
        },
        isProcessing: false
    };
}




