'use client';
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { mapTechnicalTerms } from '@/lib/vocational-logic';

export default function HandwritingIngestion({ courseContext, onScanComplete }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const worker = await createWorker('fra+eng', 1, {
      logger: m => { if (m.status === 'recognizing text') setProgress(Math.floor(m.progress * 100)) }
    });

    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    // CALIBRATION: Filter terms based on the chosen course
    const validated = await mapTechnicalTerms(text, courseContext);
    
    onScanComplete({ 
      raw: text, 
      matchedTerms: validated, 
      confidence: validated.length > 0 ? 0.8 : 0.4 
    });
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 p-10 rounded-3xl cursor-pointer hover:border-blue-500 transition-all">
        <input type="file" className="hidden" onChange={handleUpload} disabled={loading} />
        {loading ? (
          <div className="text-center">
            <Loader2 className="animate-spin text-blue-500 mb-2 mx-auto" size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{progress}% Analyzed</span>
          </div>
        ) : (
          <>
            <Upload className="text-slate-500 mb-2" size={32} />
            <span className="text-xs font-bold uppercase text-slate-400 text-center">Scan Assessment Document</span>
          </>
        )}
      </label>
    </div>
  );
}