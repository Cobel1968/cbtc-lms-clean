'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Brain, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DiagnosticPage() {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Ensure the component only runs logic after mounting to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1 w-12 rounded-full ${step >= i ? 'bg-blue-500' : 'bg-slate-800'}`} />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phase: Diagnostic</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <Brain className="text-blue-500 mb-6" size={40} />
          <h1 className="text-3xl font-black uppercase italic italic tracking-tighter mb-4">
            AI Multi-Dimensional Diagnostic
          </h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Our engine is ready to map your technical fluency. This assessment adjusts in real-time based on your responses.
          </p>

          <button 
            onClick={() => setStep(step + 1)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            Start Assessment <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}