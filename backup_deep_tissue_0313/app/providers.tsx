'use client';

import { useEffect, useState } from 'react';
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { CartProvider } from "@/app/contexts/CartContext";
import Navbar from "@/components/layout/navbar";
import StateDebugger from "@/components/debug/StateDebugger";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // THE HYDRATION SHIELD
  // During 'npm run build', this forces the exporter to skip the 
  // complex AI Engine logic and just render the static content.
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow">{children}</div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <StateDebugger />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
