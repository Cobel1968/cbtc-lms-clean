'use client';
import { useLanguage } from '@/app/contexts/LanguageContext'; 
import { useState, useEffect } from 'react';

interface bilingualtextProps {
  text: {
    fr: string;
    en: string;
  };
  className?: string; 
}

/**
 * PRODUCTION COMPLIANT: bilingualtext Component
 * Solves the technical problem of bilingual friction and hydration mismatches.
 */
export default function bilingualtext({ text, className = "" }: bilingualtextProps) {
  const { language } = useLanguage();
  const [isMounted, set_is_mounted] = useState(false);

  // Phase 1: Browser-Sync (Hydration Guard)
  // Ensures the UI doesn't crash during Vercel's SSR (Server Side Rendering)
  useEffect(() => {
    set_is_mounted(true);
  }, []);

  // Phase 2: Pedagogical Fallback
  // While the engine is warming up (mounting), default to French (Abidjan Standard)
  if (!isMounted) {
    return (
      <span className={className} aria-hidden="true">
        {text.fr}
      </span>
    );
  }

  // Phase 3: Adaptive Logic Render
  // Swaps content dynamically based on the student's Language Context
  return (
    <span className={className}>
      {language === 'en' ? text.en : text.fr}
    </span>
  );
}