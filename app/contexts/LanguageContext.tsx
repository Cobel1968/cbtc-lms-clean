'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageType = 'en' | 'fr';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  isMounted: boolean;
  fluencyScore: number;
  update_fluencyScore: (score: number) => void;
  needsSupport: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>('fr'); 
  const [isMounted, setIsMounted] = useState(false);
  const [fluencyScore, set_fluencyScore] = useState<number>(100);

  const FLUENCY_THRESHOLD = 60; 

  useEffect(() => {
    setIsMounted(true);
    // Explicitly check for window to satisfy the Next.js export worker
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('cobel_lang') as LanguageType;
      const savedScore = localStorage.getItem('cobel_fluencyScore');
      if (savedLang) setLanguage(savedLang);
      if (savedScore) set_fluencyScore(Number(savedScore));
    }
  }, []);

  const handle_setLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') localStorage.setItem('cobel_lang', lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    handle_setLanguage(newLang);
  };

  const update_fluencyScore = (score: number) => {
    set_fluencyScore(score);
    if (typeof window !== 'undefined') localStorage.setItem('cobel_fluencyScore', score.toString());
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
      {/* CRITICAL FIX: We wrap children in a fragment and only 
          allow full interactivity once mounted to prevent hydration errors 
      */}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}