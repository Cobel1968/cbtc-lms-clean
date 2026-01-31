"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BatchScanModal({ studentId }: { studentId: string }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const supabase = createClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setStatus('Image ready for verification...');
    }
  };

  const handleSync = async () => {
    if (!previewUrl) return;
    
    try {
      setUploading(true);
      setStatus('AI Engine: Analyzing Handwriting...');
      
      // We call the RPC we created in the database [cite: 2026-01-01]
      const { error: rpcError } = await supabase.rpc('process_assessment_ocr', {
        target_student_id: studentId,
        raw_text: "Demo: Cylinder pressure test 90% pass", // Simulated OCR output
        detected_language: 'EN'
      });

      if (rpcError) throw rpcError;

      setStatus('Success: Temporal Optimization Applied.');
      setTimeout(() => {
        setPreviewUrl(null);
        setStatus('');
      }, 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-white/10 rounded-2xl bg-slate-950">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Pedagogical Bridge v2.0</h4>
        {status && <span className="text-[9px] font-bold text-emerald-400 animate-pulse">{status}</span>}
      </div>

      {!previewUrl ? (
        <label className="group cursor-pointer border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <span className="text-xs font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase">Upload Physical Assessment</span>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
             <img src={previewUrl} alt="Scan Preview" className="object-contain w-full h-full opacity-80" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setPreviewUrl(null)}
              className="py-3 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSync}
              disabled={uploading}
              className="py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-[10px] font-black uppercase transition-all disabled:opacity-50"
            >
              Confirm & Sync AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}