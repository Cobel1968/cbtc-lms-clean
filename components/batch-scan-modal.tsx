"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BatchScanModal({ studentId }: { studentId: string }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const supabase = createClient();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setStatus('Ingesting Physical Assessment...');
      
      const file = event.target.files?.[0];
      if (!file) return;

      // 1. Upload to the 'assessments' bucket we created
      const fileExt = file.name.split('.').pop();
      const fileName = \/\.\;
      
      const { error: uploadError } = await supabase.storage
        .from('assessments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Trigger the AI Engine Processing Logic [cite: 2026-01-01]
      // We simulate the OCR string for the demo, which triggers our SQL function
      const mockOcrText = "Technical terms identified: Cylinder, Alternator, Circuit, Resistance";
      
      const { error: rpcError } = await supabase.rpc('process_assessment_ocr', {
        target_student_id: studentId,
        raw_text: mockOcrText,
        detected_language: 'EN'
      });

      if (rpcError) throw rpcError;

      setStatus('Sync Complete: Curriculum Density Updated.');
      setTimeout(() => setStatus(''), 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-white/10 rounded-xl bg-white/5">
      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">Analog-to-Digital Bridge</h4>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload} 
        disabled={uploading}
        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
      />
      {status && <p className="text-[10px] font-bold text-emerald-400 animate-pulse uppercase">{status}</p>}
    </div>
  );
}