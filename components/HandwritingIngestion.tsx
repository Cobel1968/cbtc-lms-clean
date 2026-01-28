'use client';
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { mapTechnicalTerms } from '@/lib/vocational-logic';

interface IngestionProps {
  courseContext: string;
  onScanComplete: (data: any) => void;
}

export default function HandwritingIngestion({ courseContext, onScanComplete }: IngestionProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      const worker = await createWorker('fra+eng', 1, {
        logger: m => { 
          if (m.status === 'recognizing text') setProgress(Math.floor(m.progress * 100)) 
        }
      });

      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      // Calibration: Cross-reference with Supabase vocational mapping
      const validated = await mapTechnicalTerms(text, courseContext);
      
      onScanComplete({ 
        raw: text, 
        matchedTerms: validated, 
        confidence: validated.length > 0 ? 0.8 : 0.4 
      });
    } catch (err) {
      setError("Calibration failed. Please try a clearer photo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] transition-all">
      <label className={`flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-3xl cursor-pointer transition-all ${loading ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 hover:border-blue-500'}`}>
        <input type="file" className="hidden" onChange={handleUpload} disabled={loading || !courseContext} />
        
        {loading ? (
          <div className="text-center">
            <Loader2 className="animate-spin text-blue-500 mb-4 mx-auto" size={40} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">{progress}% Analyzing</span>
          </div>
        ) : (
          <div className="text-center">
            <Upload className={`${courseContext ? 'text-blue-500' : 'text-slate-600'} mb-4 mx-auto`} size={40} />
            <span className="text-sm font-bold uppercase text-slate-400">
              {courseContext ? 'Scan Assessment' : 'Select a Course First'}
            </span>
          </div>
        )}
      </label>
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
          <AlertCircle size={14} /> {error}
        </div>
      )}
    </div>
  );
}