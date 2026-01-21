'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useCart } from '@/app/contexts/CartContext';

/**
 * COBEL ENGINE - STATE DEBUGGER v5.0
 * Strategy: Capitalized naming for React standards + Hydration Shield.
 */
export default function StateDebugger() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const languageContext = useLanguage();
  const cartContext = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Shield: Prevents execution during Next.js static export
  if (!mounted || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white text-[10px] px-2 py-1 rounded-md opacity-50 hover:opacity-100 transition-opacity"
      >
        {isOpen ? 'CLOSE COBEL DEBUG' : 'COBEL DEBUG'}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-white border-2 border-black rounded-lg shadow-xl w-64 text-[12px] font-mono">
          <h3 className="font-bold border-b mb-2 pb-1 text-blue-600">PEDAGOGICAL STATE</h3>
          <p><strong>Lang:</strong> {languageContext.language}</p>
          <p><strong>Fluency:</strong> {languageContext.fluencyScore}%</p>
          
          <h3 className="font-bold border-b mt-3 mb-2 pb-1 text-purple-600">CART STATE</h3>
          <p><strong>Items:</strong> {cartContext.cart?.length || 0}</p>
        </div>
      )}
    </div>
  );
}