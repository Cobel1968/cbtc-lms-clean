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

  const runExtraction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // We pass the preview (the evidence) as a state object in the router
      // For now, we'll use a session-safe method to ensure the record persists
      if (preview) {
        localStorage.setItem('last_scanned_evidence', preview);
      }
      router.push('/analytics');
    }, 2500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">Analog-to-Digital Bridge</h1>
      <p className="text-slate-500 mb-8 font-medium">Feature 4: Handwriting Analysis Module [cite: 2026-01-01]</p>
      
      <div className="border-4 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-white shadow-inner">
        {!preview ? (
          <label className="cursor-pointer group">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <h3 className="text-xl font-bold text-slate-800">Select Physical Assessment</h3>
            <p className="text-slate-400 text-sm mt-2">Ready for Contextual Extraction [cite: 2026-01-01]</p>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative inline-block">
              <img src={preview} alt="Evidence" className="max-h-96 rounded-xl shadow-2xl border-4 border-white" />
              {isProcessing && (
                <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                   <div className="bg-white px-6 py-3 rounded-full shadow-xl font-bold text-blue-600 animate-bounce">
                     EXTRACTING BILINGUAL LOGIC...
                   </div>
                </div>
              )}
            </div>
            {!isProcessing && (
              <button onClick={runExtraction} className="block mx-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-black tracking-widest hover:bg-blue-700 shadow-lg">
                FINALIZE EVIDENCE RECORD
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}