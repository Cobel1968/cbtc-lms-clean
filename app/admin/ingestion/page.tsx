'use client';

import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Zap, FileText, CheckCircle } from 'lucide-react';
import { DiagnosticCard } from '@/components/admin/DiagnosticCard';
import { processHandwriting } from '@/lib/handwritingLogic';

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<any>(null);

  // 1. Handle Local File Selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setExtractedText(''); // Reset on new file
      setDiagnosticData(null);
    }
  };

  // 2. OCR Analysis Logic
  const handleAnalyze = async () => {
    if (!previewUrl) return;
    setIsProcessing(true);
    try {
      const worker = await createWorker('fra+eng');
      const { data: { text } } = await worker.recognize(previewUrl);
      setExtractedText(text);
      await worker.terminate();
    } catch (err) {
      console.error(err);
      alert("OCR Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold italic">Analog-to-Digital Bridge</h1>
      
      {/* Step 1: Upload Box */}
      <div className="border-4 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-400 transition-all bg-white">
        <input type="file" onChange={onFileChange} className="hidden" id="file-input" accept="image/*" />
        <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
          <FileText className="w-16 h-16 text-slate-300 mb-4" />
          <span className="text-lg font-semibold text-slate-600">
            {file ? file.name : 'Select Physical Assessment'}
          </span>
        </label>
      </div>

      {/* Step 2: The Analysis Button (Only visible if file exists) */}
      {previewUrl && !extractedText && (
        <button 
          onClick={handleAnalyze}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl flex justify-center items-center gap-3"
        >
          {isProcessing ? 'Reading Handwriting...' : 'RUN COBEL AI ANALYSIS'}
          <Zap className={isProcessing ? 'animate-pulse text-yellow-400' : ''} />
        </button>
      )}

      {/* Step 3: The Preview/Correction Bridge */}
      {extractedText && !diagnosticData && (
        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
          <label className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">Extracted Technical Data</label>
          <textarea 
            className="w-full h-48 bg-slate-800 text-slate-200 p-4 rounded-xl font-mono text-sm border border-slate-700 focus:border-blue-500 outline-none"
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
          />
          <button 
            onClick={async () => {
                const result = await processHandwriting('test-user', extractedText);
                if (result.success) setDiagnosticData(result);
            }}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600"
          >
            Confirm Accuracy & Calculate Savings
          </button>
        </div>
      )}

      {/* Step 4: Final Diagnostic Result */}
      {diagnosticData && (
        <DiagnosticCard 
          studentName="Abel C."
          originalTimeframe={12}
          timeSavedDays={diagnosticData.acceleration}
          identifiedTerms={diagnosticData.terms}
        />
      )}
    </div>
  );
}
