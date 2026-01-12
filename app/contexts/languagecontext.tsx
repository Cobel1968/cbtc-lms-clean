'use client';

import React, { createContext, useContext, useState as useState, useEffect as useEffect } from 'react';

// Define supported languages for the Cobel Training Center
type LanguageType = 'en' | 'fr';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  isMounted: boolean; // Vercel Hydration Guard
  fluencyScore: number; // Feature 1: Technical Fluency Mapping
  update_fluencyScore: (score: number) => void;
  needsSupport: boolean; // Adaptive Pedagogical Logic
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * PRODUCTION NOTE: We use PascalCase 'languageprovider' for the export.
 * This ensures Next.js/Vercel recognizes it as a React Component.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>('fr'); 
  const [isMounted, setIsMounted] = useState(false);
  const [fluencyScore, set_fluencyScore] = useState<number>(100);

  const FLUENCY_THRESHOLD = 60; 

  // Sync language and fluency on mount to prevent server-side mismatches
  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem('cobel_lang') as LanguageType;
    const savedScore = localStorage.getItem('cobel_fluencyScore');

    if (savedLang) setLanguage(savedLang);
    if (savedScore) set_fluencyScore(Number(savedScore));
  }, []);

  const handle_setLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem('cobel_lang', lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    handle_setLanguage(newLang);
  };

  const update_fluencyScore = (score: number) => {
    set_fluencyScore(score);
    localStorage.setItem('cobel_fluencyScore', score.toString());
  };

  const needsSupport = fluencyScore < FLUENCY_THRESHOLD;

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handle_setLanguage, 
        toggleLanguage, 
        isMounted,
        fluencyScore,
        update_fluencyScore,
        needsSupport
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(language_context);
  if (context === undefined) {
    // Corrected error message to match PascalCase export
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}