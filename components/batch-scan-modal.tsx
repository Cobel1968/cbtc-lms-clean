"use client";
import { useState } from 'react';

export default function BatchScanModal({ onClose }: { onClose: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startBatchProcess = async () => {
    setIsUploading(true);
    // Simulating the sequential processing of 5 assessment scans
    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 800));
      setProgress(i * 20);
    }
    setIsUploading(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Batch Assessment Scan</h2>
          <p className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">Pedagogical Bridge v1.0</p>
        </div>

        <div className="px-8 pb-8">
          {!isUploading ? (
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-emerald-400 transition-colors cursor-pointer" onClick={startBatchProcess}>
              <p className="text-sm font-bold text-slate-400">Drag & Drop Assessment Photos Here</p>
              <p className="text-[10px] text-slate-300 mt-1 uppercase italic">(Supports JPG, PNG, PDF)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>AI Analyzing Handwriting...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}