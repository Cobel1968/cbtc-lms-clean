"use client";
import Navigation from '@/components/navigation';
import { useState } from 'react';

export default function HandwritingBridge() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartScan = () => {
    setIsProcessing(true);
    // Simulate OCR processing delay
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="max-w-5xl mx-auto py-20 px-6">
        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,51,102,0.2)] border border-slate-100 overflow-hidden">
          <div className="bg-[#003366] p-12 text-center relative overflow-hidden">
             {/* Decorative Background Icon */}
            <div className="absolute -right-10 -top-10 text-white opacity-5 rotate-12">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            <h2 className="text-white text-4xl font-black uppercase tracking-tighter italic">Handwriting Bridge</h2>
            <p className="text-[#10B981] text-xs font-black uppercase tracking-[0.4em] mt-3">Bilingual Technical Fluency Ingestion</p>
          </div>

          <div className="p-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] p-12 hover:border-[#003366] transition-all bg-slate-50 group">
                <input type="file" id="assessment-upload" className="hidden" />
                <label htmlFor="assessment-upload" className="cursor-pointer block text-center">
                  <div className="bg-white w-20 h-20 rounded-3xl shadow-md flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <span className="text-[#003366] font-black uppercase text-xs tracking-widest">Select physical assessment</span>
                </label>
              </div>
            </div>

            <div className="bg-[#003366]/5 p-10 rounded-[2.5rem] border border-[#003366]/10">
              <h3 className="text-[#003366] font-black uppercase text-sm tracking-widest mb-6">Engine Specifications</h3>
              <div className="space-y-4 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#10B981] rounded-full"/> OCR Pre-processing Active</div>
                <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#10B981] rounded-full"/> Bilingual Vocational Mapping</div>
                <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#10B981] rounded-full"/> Contextual Extraction</div>
              </div>

              <button 
                onClick={handleStartScan}
                className={`mt-10 w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] transition-all shadow-2xl ${
                  isProcessing ? 'bg-slate-400 cursor-wait' : 'bg-[#003366] hover:bg-[#E91E63] text-white active:scale-95'
                }`}
              >
                {isProcessing ? 'Engine Processing...' : 'Start AI Engine Scan'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}