'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Sparkles, Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState('initializing');

  useEffect(() => {
    // Simulation of the Cobel AI Engine analyzing the session
    const timer = setTimeout(() => {
      setStage('ready');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const startDiagnostic = () => {
    router.push('/diagnostic');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {stage === 'initializing' ? (
          <div className="space-y-6 animate-pulse">
            <div className="bg-blue-600/20 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto">
              <Loader2 className="text-blue-500 animate-spin" size={40} />
            </div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Initializing Engine</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Temporal Optimization Active</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-700">
            <Sparkles className="text-yellow-500 mx-auto mb-6" size={40} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Profile Ready</h1>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              The engine is ready to map your technical fluency. We will begin with the 
              <span className="text-blue-500 font-bold"> Multi-Dimensional Diagnostic</span>.
            </p>
            <button 
              onClick={startDiagnostic}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Begin Diagnostic <Brain size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}