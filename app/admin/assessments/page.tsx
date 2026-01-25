'use client';

export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { FileSearch, UploadCloud, Languages, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { submit_bridge_assessment } from '@/lib/actions';

export default function HandwritingBridge() {
  // We use camelCase here only because the Vercel Linter requires 'set' + 'PascalCase'
  const [is_processing, setIsProcessing] = useState(false);
  const [sync_status, setSyncStatus] = useState('idle');

  const extraction_preview = {
    student: "active_user_id",
    detected_terms: ["embrayage", "clutch", "transmission"],
    fluency_score: 88,
    friction_index: 0.12
  };

  const handle_ingestion = async () => {
    setIsProcessing(true);
    const result = await submit_bridge_assessment(extraction_preview.student, {
      fluency: extraction_preview.fluency_score,
      friction: extraction_preview.friction_index,
      terms: extraction_preview.detected_terms.length
    });
    
    if (result.success) setSyncStatus('synced');
    setIsProcessing(false);
  };

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
          handwriting bridge
        </h1>
        <p className="text-slate-500 font-medium">
          analog-to-digital pedagogical ingestion (feature 4)
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border-4 border-dashed border-slate-100 rounded-[40px] p-12 flex flex-col items-center justify-center text-center space-y-6 hover:border-indigo-100 transition-colors group">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
            <UploadCloud size={40} />
          </div>
          <div>
            <p className="font-black text-lg text-slate-800">drop vocational assessment</p>
            <p className="text-sm text-slate-400">supports scanned pdf or high-res jpeg</p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">
            select file
          </button>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
              <h3 className="font-black uppercase text-[10px] tracking-[0.3em] text-indigo-400">engine extraction preview</h3>
              <Zap size={20} className="text-indigo-400" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-xs opacity-60">detected terms:</span>
                <span className="text-xs font-bold text-emerald-400">{extraction_preview.detected_terms.join(', ')}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-xs opacity-60">technical fluency:</span>
                <span className="text-xs font-bold">{extraction_preview.fluency_score}%</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-xs opacity-60">bilingual friction:</span>
                <span className="text-xs font-bold">{extraction_preview.friction_index}</span>
              </div>
            </div>

            <button 
              onClick={handle_ingestion}
              disabled={is_processing || sync_status === 'synced'}
              className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                sync_status === 'synced' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-white hover:text-indigo-600'
              }`}
            >
              {sync_status === 'synced' ? (
                <><CheckCircle2 size={16} /> integrated into profile</>
              ) : is_processing ? (
                "processing..."
              ) : (
                "confirm & sync to temporal engine"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}