"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
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
    if (!title) return alert("Please enter an Assessment Title for the transcript.");
    setIsProcessing(true);
    setTimeout(() => {
      localStorage.setItem('last_scanned_evidence', preview || "");
      localStorage.setItem('last_scanned_title', title);
      router.push('/analytics');
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-2">Pedagogical Bridge</h1>
      <p className="text-slate-500 mb-8 font-medium">Capture Evidence for Transcript Reporting [cite: 2026-01-01]</p>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Assessment Title / Module Name</label>
          <input 
            type="text" 
            placeholder="e.g. Mechanical Engine Systems - Quiz 1" 
            className="w-full p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="border-4 border-dashed border-slate-200 rounded-[2rem] p-12 text-center bg-white">
          {!preview ? (
            <label className="cursor-pointer">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-lg font-bold text-slate-800">Scan Physical Document</h3>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          ) : (
            <div className="space-y-6">
              <img src={preview} alt="Scan" className="max-h-72 mx-auto rounded-lg shadow-md border" />
              <button 
                onClick={runExtraction}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black tracking-widest hover:bg-blue-700 shadow-xl disabled:bg-slate-300">
                {isProcessing ? "PROCESSING HANDWRITING..." : "EXTRACT BILINGUAL DATA"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
