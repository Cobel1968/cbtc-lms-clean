"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function MilestoneForecast({ studentId }: { studentId: string }) {
  const [metrics, setMetrics] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      const { data } = await supabase
        .from('profiles')
        .select('current_curriculum_density, technical_fluency, total_minutes_saved')
        .eq('id', studentId)
        .single();
      if (data) setMetrics(data);
    }
    fetchMetrics();
  }, [studentId]);

  if (!metrics) return null;

  // AI Forecasting Logic [cite: 2026-01-01]
  const density = metrics.current_curriculum_density || 1.0;
  const milestones = [
    { label: "Bilingual Technical Baseline", weeks: Math.round(2 * density), color: "bg-blue-500" },
    { label: "Advanced Vocational Integration", weeks: Math.round(6 * density), color: "bg-emerald-500" },
    { label: "Final Certification & Placement", weeks: Math.round(12 * density), color: "bg-indigo-600" }
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-end">
        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Temporal Optimization Forecast</h4>
        <span className="text-[10px] font-bold text-blue-400">{metrics.total_minutes_saved}m Saved to Date</span>
      </div>
      
      <div className="relative h-1 bg-white/5 rounded-full flex justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${m.color} border-4 border-slate-900 z-10`} />
            <div className="absolute top-6 whitespace-nowrap text-center">
              <p className="text-[9px] font-black uppercase tracking-tighter leading-none">{m.label}</p>
              <p className="text-[10px] font-medium opacity-50">Week {m.weeks}</p>
            </div>
          </div>
        ))}
        <div className="absolute top-0 left-0 h-full bg-blue-600/20 rounded-full" style={{ width: '100%' }} />
      </div>
      <div className="h-12" /> {/* Spacer for labels */}
    </div>
  );
}