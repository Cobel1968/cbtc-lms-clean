"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Logo from '@/components/logo';

export default function MilestoneForecast({ studentId }: { studentId: string }) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      const { data } = await supabase
        .from('profiles')
        .select('current_curriculum_density, total_minutes_saved')
        .eq('id', studentId)
        .single();
      
      if (data) {
        if (metrics && data.current_curriculum_density < metrics.current_curriculum_density) {
          setIsCelebrating(true);
          setTimeout(() => setIsCelebrating(false), 3000);
        }
        setMetrics(data);
      }
    }
    fetchMetrics();

    const channel = supabase.channel(`realtime-${studentId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${studentId}` }, () => fetchMetrics())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [studentId, metrics]);

  if (!metrics) return null;

  const density = metrics.current_curriculum_density || 1.0;
  const milestones = [
    { label: "Bilingual Baseline", weeks: Math.round(2 * density) },
    { label: "Advanced Vocational", weeks: Math.round(6 * density) },
    { label: "Certification", weeks: Math.round(12 * density) }
  ];

  return (
    <div className="relative mt-6 p-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
      
      {/* --- LOGO BUBBLES & CONFETTI LAYER --- */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(12)].map((_, i) => (
            <div key={i} 
              className="absolute animate-float-up opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                bottom: '-20px'
              }}
            >
              {/* Logo Bubble */}
              <div className="p-2 bg-white rounded-full shadow-lg scale-75 border-2 border-blue-500">
                <Logo className="h-4 w-4" />
              </div>
              {/* Confetti Particle */}
              <div className={`w-2 h-2 mt-2 ${i % 2 === 0 ? 'bg-blue-400' : 'bg-emerald-400'} rounded-sm animate-spin`} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-end mb-6">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Temporal Optimization</h4>
          <p className="text-xl font-black text-blue-400">Week {milestones[2].weeks} Target</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-emerald-400 block uppercase">Time Saved</span>
          <span className="text-2xl font-black">{metrics.total_minutes_saved}m</span>
        </div>
      </div>
      
      <div className="relative h-1 bg-white/10 rounded-full flex justify-between items-center">
        <div className="absolute h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
        {milestones.map((m, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white z-10" />
            <div className="absolute top-6 whitespace-nowrap text-center">
              <p className="text-[9px] font-black uppercase tracking-tighter">{m.label}</p>
              <p className="text-[12px] font-bold text-blue-400">Wk {m.weeks}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 2.5s ease-out forwards;
        }
      `}</style>
      <div className="h-10" />
    </div>
  );
}