'use client';
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, FileText, Languages, Loader2 } from 'lucide-react';

export default function HandwritingIngestion() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [status, setStatus] = useState('ready');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus('processing');

    try {
      const worker = await createWorker('fra+eng'); // Bilingual support: French & English
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      
      setExtractedText(text);
      setStatus('completed');
    } catch (error) {
      console.error("OCR Error:", error);
      setStatus('ready');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] mt-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600/20 rounded-lg">
          <FileText className="text-blue-500" size={24} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tighter text-white">Handwriting Analysis Module</h3>
      </div>

      {status !== 'completed' ? (
        <label className="border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all group relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isProcessing} />
          {isProcessing ? (
            <Loader2 className="text-blue-500 animate-spin mb-4" size={48} />
          ) : (
            <Upload className="text-slate-500 group-hover:text-blue-500 mb-4" size={48} />
          )}
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            {isProcessing ? 'Analyzing Handwriting...' : 'Upload Physical Assessment'}
          </p>
        </label>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/30">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Extracted Bilingual Data</span>
            <p className="text-sm text-slate-300 font-mono leading-relaxed max-h-40 overflow-y-auto">
              {extractedText || "No technical terms detected."}
            </p>
          </div>
          <button onClick={() => setStatus('ready')} className="text-xs font-bold text-slate-500 uppercase hover:text-white transition-colors">
            Reset Scanner
          </button>
        </div>
      )}
    </div>
  );
}