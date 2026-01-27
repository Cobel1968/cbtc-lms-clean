'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import MilestoneNotification from './MilestoneNotification';

export const HandwritingUpload = ({ courseId }: { courseId: string }) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [results, setResults] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading');

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: storageData } = await supabase.storage
        .from('handwriting-assessments')
        .upload(fileName, file);

      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image_url: storageData?.path, 
          course_id: courseId,
          student_id: (await supabase.auth.getUser()).data.user?.id 
        }),
      });

      const resData = await response.json();
      setResults(resData.data);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <>
      <div className="mt-8 p-6 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-center hover:border-blue-400 transition-all">
        {status === 'idle' && (
          <label className="cursor-pointer">
            <Upload className="mx-auto text-slate-300 mb-2" size={40} />
            <span className="block text-sm font-bold text-slate-600 uppercase tracking-tighter">Scan Technical Assessment</span>
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          </label>
        )}
        {status === 'uploading' && (
          <div className="py-4"><Loader2 className="mx-auto text-blue-600 animate-spin mb-2" size={40} /><p className="text-sm font-black uppercase italic">Cobel AI Engine: Analyzing Handwriting...</p></div>
        )}
        {status === 'success' && (
          <div className="py-4 text-green-600"><CheckCircle className="mx-auto mb-2" size={40} /><p className="font-bold uppercase tracking-widest">Assessment Integrated</p></div>
        )}
      </div>

      {status === 'success' && results && (
        <MilestoneNotification 
          score={88} 
          densityBoost={12} 
          timeSaved="4 Days" 
        />
      )}
    </>
  );
};
export default HandwritingUpload;
