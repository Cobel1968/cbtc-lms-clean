'use client';

import { useEffect, useState } from 'react';

// Props aligned with DashboardPage requirements
interface DiagnosticWelcomeModalProps {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onStartDiagnostic: () => void;
}

export default function DiagnosticWelcomeModal({
  userName,
  isOpen,
  onClose,
  onStartDiagnostic
}: DiagnosticWelcomeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration & Visibility Guard: Ensures consistent server/client rendering
  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">
            Welcome, {userName}!
          </h2>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed">
          To personalize your learning path, the <strong>Cobel AI Engine</strong> needs to conduct a brief Multi-Dimensional Diagnostic. This assesses your bilingual technical fluency to optimize your curriculum density.
        </p>

        <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
          <p className="text-xs text-slate-500 font-medium italic">
            &quot;Solving knowledge gaps and bilingual friction in vocational training.&quot;
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onStartDiagnostic}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            Start Diagnostic Assessment
          </button>
          
          <button 
            onClick={onClose} 
            className="w-full py-2 text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors"
          >
            I&apos;ll do this later
          </button>
        </div>
      </div>
    </div>
  );
}