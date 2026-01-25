'use client';
import { useState } from 'react';
import { Upload, FileSearch, CheckCircle, AlertTriangle, RefreshCcw } from 'lucide-react';

interface AssessmentUploaderProps {
  studentId: string;
}

export default function AssessmentUploader({ studentId }: AssessmentUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');

    try {
      // 1. Mock Image Upload (In production, upload to Supabase Storage first)
      const mockImageUrl = `https://storage.cobel-btc.com/assessments/${file.name}`;
      
      setStatus('analyzing');

      // 2. Trigger the Ingestion API Route we just built
      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: mockImageUrl,
          userId: studentId // The student being assessed
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Ingestion failed');

      setResult(data.data);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-8 transition-all hover:border-indigo-300">
      {status === 'idle' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-900">Upload Handwritten Assessment</h3>
            <p className="text-sm text-slate-500">Scan or take a photo of the workshop evaluation</p>
          </div>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
          {file && (
            <button onClick={handleUpload} className="mt-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all">
              Start AI Analysis
            </button>
          )}
        </div>
      )}

      {(status === 'uploading' || status === 'analyzing') && (
        <div className="flex flex-col items-center gap-4 py-8">
          <RefreshCcw className="animate-spin text-indigo-600" size={40} />
          <p className="font-bold text-slate-900 uppercase tracking-widest text-xs">
            {status === 'uploading' ? 'Uploading Image...' : 'AI Bilingual Mapping...'}
          </p>
        </div>
      )}

      {status === 'success' && result && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl">
            <CheckCircle size={24} />
            <div>
              <p className="font-bold text-sm">Ingestion Complete</p>
              <p className="text-xs opacity-80">Temporal Optimization: {result.adjustment_minutes} mins saved</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2">English Terms</p>
              <ul className="text-xs font-bold text-slate-700">
                {['Wrench', 'Circuit'].map(term => <li key={term}>• {term}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2">French Terms</p>
              <ul className="text-xs font-bold text-slate-700">
                {['Clé', 'Disjoncteur'].map(term => <li key={term}>• {term}</li>)}
              </ul>
            </div>
          </div>

          <button onClick={() => setStatus('idle')} className="w-full py-3 text-slate-400 font-bold text-xs uppercase tracking-tighter">
            Analyze Another Document
          </button>
        </div>
      )}
    </div>
  );
}
