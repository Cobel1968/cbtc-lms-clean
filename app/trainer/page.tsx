'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Check, X, FileText, User, Zap } from 'lucide-react';

export default function TrainerDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      const { data } = await supabase
        .from('assessment_results')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setAssessments(data);
    };
    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Trainer Command Center</h1>
        <p className="text-blue-500 font-bold uppercase text-xs tracking-widest">Cobel AI Engine Oversight</p>
      </header>

      <div className="grid gap-6">
        {assessments.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between hover:border-blue-500/50 transition-all">
            <div className="flex items-center gap-6">
              <div className="bg-slate-800 p-4 rounded-2xl">
                <FileText className="text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <User size={14} className="text-slate-500" />
                   <span className="text-sm font-bold text-slate-300">Student ID: {item.student_id.slice(0,8)}...</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">{item.course_id}</h3>
                <p className="text-xs text-slate-500 font-mono">OCR Detect: {item.ocr_text_raw.substring(0, 50)}...</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <span className="block text-[10px] uppercase font-black text-slate-500">Fluency Score</span>
                <span className="text-2xl font-black text-blue-500">{item.fluency_score}%</span>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-green-600/20 text-green-500 rounded-xl hover:bg-green-600 hover:text-white transition-all"><Check size={20} /></button>
                <button className="p-3 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"><X size={20} /></button>
              </div>
            </div>
          </div>
        ))}
        {assessments.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <Zap className="mx-auto text-slate-700 mb-4" size={48} />
            <p className="text-slate-500 font-bold uppercase">No pending assessments for review</p>
          </div>
        )}
      </div>
    </div>
  );
}
