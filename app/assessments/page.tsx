"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runExtraction = async () => {
    setIsProcessing(true);
    // Simulation of Feature 4: Contextual Extraction logic [cite: 2026-01-01]
    setTimeout(() => {
      setIsProcessing(false);
      alert("Bilingual Extraction Complete: Technical terms identified in English & French.");
      router.push('/admin-dashboard');
    }, 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Analog-to-Digital Bridge</h1>
      <p className="text-slate-500 mb-8">Feature 4: Handwriting Analysis Module [cite: 2026-01-01]</p>
      
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-slate-50">
        {!preview ? (
          <label className="cursor-pointer">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-bold">Select Physical Assessment</h3>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="space-y-6">
            <img src={preview} alt="Scan" className="max-h-80 mx-auto rounded shadow-lg" />
            {!isProcessing ? (
              <button 
                onClick={runExtraction}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-blue-700 transition-all">
                START BILINGUAL EXTRACTION
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-blue-600 font-bold tracking-widest">ANALYZING HANDWRITING...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}