'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Clock, Languages, TrendingUp, Users } from 'lucide-react';

export default function GlobalMetrics() {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalTimeSaved: 0,
    avgFluency: 0,
    activeAssessments: 0
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      // 1. Fetch total time saved via Temporal Optimization (Sum of adjustments)
      const { data: assessments } = await supabase
        .from('vocational_assessments')
        .select('suggest_timeframe_adjustment, bilingual_fluency_score');

      const timeSaved = Math.abs(assessments?.reduce((acc, curr) => acc + (curr.suggest_timeframe_adjustment || 0), 0) || 0);
      const avgScore = (assessments?.reduce((acc, curr) => acc + (curr.bilingual_fluency_score || 0), 0) || 0) / (assessments?.length || 1);

      setMetrics({
        totalStudents: 124, // Mocked total
        totalTimeSaved: timeSaved,
        avgFluency: Math.round(avgScore * 100),
        activeAssessments: assessments?.length || 0
      });
    }
    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-[#f8fafc]">
      {/* Time Saved Card (Feature 3: Temporal Optimization) */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock size={24} />
          </div>
          <span className="text-[10px] font-black text-emerald-500 uppercase">+12% vs last month</span>
        </div>
        <h4 className="text-3xl font-black text-slate-900">{metrics.totalTimeSaved}h</h4>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manual Training Time Saved</p>
      </div>

      {/* Bilingual Mapping Card (Feature 4) */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <Languages size={24} />
          </div>
        </div>
        <h4 className="text-3xl font-black text-slate-900">{metrics.avgFluency}%</h4>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Avg. Technical Bilingual Fluency</p>
      </div>

      {/* Other Metrics... */}
      <div className="bg-slate-900 p-6 rounded-[32px] shadow-xl text-white md:col-span-2">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="text-indigo-400" />
          <h3 className="font-bold uppercase tracking-tighter">Engine Efficiency Status</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-xs">
            <span className="opacity-60 uppercase font-bold">Curriculum Density Balance</span>
            <span className="text-indigo-400 font-bold">Optimized</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[85%]"></div>
          </div>
          <p className="text-[10px] opacity-40 leading-relaxed italic">
            Automated Milestone Forecasting has reduced bilingual friction by 40% across all vocational modules.
          </p>
        </div>
      </div>
    </div>
  );
}