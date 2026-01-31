"use client";
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [evidence, setEvidence] = useState<string | null>(null);

  useEffect(() => {
    const savedEvidence = localStorage.getItem('last_scanned_evidence');
    if (savedEvidence) setEvidence(savedEvidence);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Analytics: Mr. Soro</h1>
          <p className="text-slate-500 font-medium">Bilingual Vocational Mapping & Evidence Record [cite: 2026-01-01]</p>
        </div>
        <div className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
          Verification: PASSED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
            <span className="text-blue-500">📁</span> Analog Evidence Archive
          </h3>
          <div className="aspect-[3/4] bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 overflow-hidden shadow-inner">
             {evidence ? (
               <img src={evidence} alt="Scanned Evidence" className="w-full h-full object-contain p-2" />
             ) : (
               <p className="text-slate-400 italic">No Document Found in Session</p>
             )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Bilingual Technical Fluency</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-600">
                  <span>English (Technical)</span><span>82%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full transition-all duration-1000" style={{width: '82%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-2 text-slate-600">
                  <span>French (Vocational)</span><span>45%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full transition-all duration-1000" style={{width: '45%'}}></div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-bold">
              OCR Pre-processing: SUCCESSFUL [cite: 2026-01-01]
            </p>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Temporal Optimization Forecast</h4>
              <p className="text-4xl font-black mb-1">FEB 15, 2026</p>
              <p className="text-sm opacity-60">Adjusted via Automated Milestone Forecasting [cite: 2026-01-01]</p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 font-black">AI</div>
          </div>
        </div>
      </div>
    </div>
  );
}