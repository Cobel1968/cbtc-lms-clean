'use client';

import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Zap, FileText, CheckCircle, Clock } from 'lucide-react';

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [diagnostic, setDiagnostic] = useState<{acceleration: number, terms: string[]} | null>(null);

  // Local handler for file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setExtractedText('');
      setDiagnostic(null);
    }
  };

  // OCR Logic built into the page
  const handleAnalyze = async () => {
    if (!previewUrl) return;
    setIsProcessing(true);
    try {
      const worker = await createWorker('fra+eng');
      const { data: { text } } = await worker.recognize(previewUrl);
      setExtractedText(text);
      await worker.terminate();
    } catch (err) {
      alert("Analysis Error: " + err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Logic to process the confirmed text
  const confirmAnalysis = () => {
    const dictionary: Record<string, number> = { 
        "forage": 1.5, "drilling": 1.5, "hse": 2.0, "securite": 2.0, 
        "qualite": 1.0, "quality": 1.0, "audit": 1.5, "ai": 2.5, "ia": 2.5 
    };
    const words = extractedText.toLowerCase().split(/\W+/);
    let score = 0;
    const found: string[] = [];

    Object.keys(dictionary).forEach(term => {
      if (words.includes(term)) {
        score += dictionary[term];
        found.push(term);
      }
    });

    setDiagnostic({ acceleration: score, terms: found });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans">
      <header className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-black italic text-slate-900">Cobel AI Engine</h1>
          <p className="text-slate-500 font-medium">Analog-to-Digital Pedagogical Bridge</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase">Phase 1: Diagnostic</div>
      </header>

      {/* 1. Upload Section */}
      {!previewUrl && (
        <div className="border-4 border-dashed border-slate-200 rounded-3xl p-16 text-center hover:bg-slate-50 transition-all">
          <input type="file" onChange={onFileChange} className="hidden" id="file-drop" accept="image/*" />
          <label htmlFor="file-drop" className="cursor-pointer flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-slate-700">Drop assessment photo here</span>
            <span className="text-slate-400 text-sm mt-2">Supports JPG, PNG or PDF scans</span>
          </label>
        </div>
      )}

      {/* 2. Analysis Trigger */}
      {previewUrl && !extractedText && (
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border bg-slate-100">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl flex justify-center items-center gap-3 transition-transform active:scale-95"
          >
            {isProcessing ? 'AI READING HANDWRITING...' : 'GENERATE BILINGUAL MAPPING'}
            <Zap className={isProcessing ? 'animate-pulse' : ''} />
          </button>
        </div>
      )}

      {/* 3. Correction Bridge */}
      {extractedText && !diagnostic && (
        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl space-y-4">
          <h3 className="text-white font-bold flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Review Extracted Fluency Data
          </h3>
          <textarea 
            className="w-full h-48 bg-slate-800 text-blue-100 p-4 rounded-xl font-mono text-sm border border-slate-700 outline-none focus:border-blue-500"
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
          />
          <button onClick={confirmAnalysis} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600">
            Confirm & Calculate Optimization
          </button>
        </div>
      )}

      {/* 4. Results Card */}
      {diagnostic && (
        <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 shadow-xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Optimization Result</h2>
                    <p className="text-slate-500">Bilingual Technical Fluency detected</p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-lg font-bold">
                    +{diagnostic.acceleration} Days
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
                {diagnostic.terms.map(term => (
                    <span key={term} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold uppercase border border-blue-100">
                        {term}
                    </span>
                ))}
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">
                Apply to Student Path
            </button>
        </div>
      )}
    </div>
  );
}


