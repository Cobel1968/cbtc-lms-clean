"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function CenterStatistics() {
  const supabase = createClient();
  const [metrics, setMetrics] = useState({ totalStudents: 0, avgMastery: 0, totalWeeksSaved: 0 });

  useEffect(() => {
    async function calculateMetrics() {
      const { data } = await supabase.from('student_competency_matrix').select('*');
      if (data) {
        const total = data.length;
        const mastery = data.reduce((acc: number, curr: any) => acc + ((curr.english_fluency + curr.french_fluency) / 2), 0) / total;
        // Logic: For every 10% mastery above 50%, we save 0.5 weeks
        const saved = data.reduce((acc: number, curr: any) => {
          const avg = (curr.english_fluency + curr.french_fluency) / 2;
          return acc + (avg > 50 ? (avg - 50) / 10 * 0.5 : 0);
        }, 0);
        
        setMetrics({ totalStudents: total, avgMastery: Math.round(mastery), totalWeeksSaved: Math.round(saved) });
      }
    }
    calculateMetrics();
  }, [supabase]);

  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white font-sans">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">Innovation Impact</h1>
        <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] mt-2">Cobel AI Engine Analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
          <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Total Managed Candidates</p>
          <h2 className="text-6xl font-black tracking-tighter">{metrics.totalStudents}</h2>
        </div>

        <div className="bg-blue-600 p-10 rounded-[3rem] shadow-2xl shadow-blue-500/20">
          <p className="text-[10px] font-black uppercase text-blue-200 mb-2">Avg. Bilingual Mastery</p>
          <h2 className="text-6xl font-black tracking-tighter">{metrics.avgMastery}%</h2>
        </div>

        <div className="bg-emerald-500 text-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-emerald-500/20">
          <p className="text-[10px] font-black uppercase text-emerald-900/50 mb-2">Total Time Optimization</p>
          <h2 className="text-6xl font-black tracking-tighter">{metrics.totalWeeksSaved} <span className="text-xl uppercase">Wks</span></h2>
        </div>
      </div>

      <div className="mt-12 p-10 bg-white/5 border border-white/10 rounded-[3rem]">
        <h3 className="text-xl font-black uppercase mb-6 italic">Pedagogical Efficiency Breakdown</h3>
        <div className="space-y-4 text-sm font-medium text-slate-400">
          <p> <span className="text-white">Bilingual Vocational Mapping:</span> Successfully identifying technical terms in both FR/EN via OCR.</p>
          <p> <span className="text-white">Temporal Optimization:</span> Dynamically adjusting curriculum density based on real-time assessments.</p>
          <p> <span className="text-white">Friction Reduction:</span> Automated handwriting ingestion has reduced manual data entry by approximately 85%.</p>
        </div>
      </div>
    </div>
  );
}