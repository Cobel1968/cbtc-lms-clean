'use client';

import { useEffect, useState } from 'react';

// Define the props to match what the Dashboard is sending
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

  // Hydration & Visibility Guard
  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Welcome, {userName}!</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          To optimize your learning path, the **Cobel AI Engine** needs to conduct a brief initial diagnostic.
        </p>
        <div className="space-y-3">
          <button 
            onClick={onStartDiagnostic}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-md"
          >
            Start Diagnostic
          </button>
          <button 
            onClick={onClose} 
            className="w-full py-3 text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}