"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function MilestoneForecast({ studentId }: { studentId: string }) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      const { data } = await supabase
        .from('profiles')
        .select('current_curriculum_density, technical_fluency, total_minutes_saved')
        .eq('id', studentId)
        .single();
      
      if (data) {
        // Trigger celebration if density improved (decreased)
        if (metrics && data.current_curriculum_density < metrics.current_curriculum_density) {
          setIsCelebrating(true);
          setTimeout(() => setIsCelebrating(false), 2000);
        }
        setMetrics(data);
      }
    }

    fetchMetrics();
    
    // Subscribe to real-time changes for that student [cite: 2026-01-01]
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${studentId}` },
        () => fetchMetrics()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [studentId, metrics]);

  if (!metrics) return null;

  const density = metrics.current_curriculum_density || 1.0;
  const milestones = [
    { label: "Bilingual Baseline", weeks: Math.round(2 * density) },
    { label: "Advanced Integration", weeks: Math.round(6 * density) },
    { label: "Certification", weeks: Math.round(12 * density) }
  ];

  return (
    <div className={`mt-6 p-4 rounded-xl transition-all duration-500 ${isCelebrating ? 'bg-emerald-500/10 border border-emerald-500/50 scale-[1.02]' : 'bg-transparent'}`}>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Temporal Optimization</h4>
          {isCelebrating && <span className="text-[10px] font-bold text-emerald-400 animate-bounce block">Efficiency Boost Detected!</span>}
        </div>
        <span className="text-[10px] font-bold text-blue-400">{metrics.total_minutes_saved}m Saved</span>
      </div>
      
      <div className="relative h-1 bg-white/5 rounded-full flex justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-4 border-slate-900 z-10 ${isCelebrating ? 'bg-emerald-400' : 'bg-blue-600'}`} />
            <div className="absolute top-6 whitespace-nowrap text-center">
              <p className="text-[9px] font-black uppercase tracking-tighter">{m.label}</p>
              <p className="text-[10px] font-medium opacity-50">Week {m.weeks}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}