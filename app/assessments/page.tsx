"use client";
import { useState } from 'react';

export default function AssessmentsPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Analog-to-Digital Bridge</h1>
      <p className="text-slate-500 mb-8">Feature 4: Handwriting Analysis Module [cite: 2026-01-01]</p>
      
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-slate-50 relative">
        {!preview ? (
          <>
            <div className="text-5xl mb-4"></div>
            <h3 className="text-lg font-bold">Upload Physical Assessment</h3>
            <p className="text-slate-500 text-sm mb-6">Drop scanned PDF or Image here</p>
            <label className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold cursor-pointer hover:bg-rose-600">
              Select Files
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
            </label>
          </>
        ) : (
          <div className="space-y-4">
            <img src={preview} alt="Scanned Assessment" className="max-h-64 mx-auto rounded-lg shadow-md border" />
            <button onClick={() => setPreview(null)} className="text-rose-500 text-sm font-bold">Clear and Rescan</button>
            <div className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold animate-pulse">
              RUNNING BILINGUAL EXTRACTION...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}