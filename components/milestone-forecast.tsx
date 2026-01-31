"use client";
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import Logo from '@/components/logo';

export default function MilestoneForecast({ studentId }: { studentId: string }) {
  const [metrics, setMetrics] = useState<any>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Pre-load the success chime
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    audioRef.current.volume = 0.3;

    async function fetchMetrics() {
      const { data } = await supabase
        .from('profiles')
        .select('current_curriculum_density, total_minutes_saved')
        .eq('id', studentId)
        .single();
      
      if (data) {
        if (metrics && data.current_curriculum_density < metrics.current_curriculum_density) {
          setIsCelebrating(true);
          audioRef.current?.play().catch(() => console.log("Audio play blocked by browser"));
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
    { label: "Baseline", weeks: Math.round(2 * density) },
    { label: "Vocational", weeks: Math.round(6 * density) },
    { label: "Certification", weeks: Math.round(12 * density) }
  ];

  return (
    <div className={`relative mt-6 p-6 rounded-[2.5rem] transition-all duration-700 ${isCelebrating ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-white/5 border-white/10'} border overflow-hidden`}>
      
      {/* --- LOGO BUBBLES & CONFETTI --- */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute animate-float-up opacity-0" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 1.5}s`, bottom: '-20px' }}>
              <div className="p-1.5 bg-white rounded-full shadow-2xl border border-blue-100 scale-75">
                <Logo className="h-3 w-3" />
              </div>
              <div className={`w-1 h-1 mt-1 ${i % 2 === 0 ? 'bg-blue-400' : 'bg-emerald-400'} rounded-full animate-ping`} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Temporal Optimization</h4>
          <p className="text-3xl font-black tracking-tighter uppercase">
            {isCelebrating ? "Efficiency Up!" : `Week ${milestones[2].weeks} Target`}
          </p>
        </div>
        <div className="bg-black/20 p-3 rounded-2xl text-right">
          <span className="text-[9px] font-bold opacity-40 block uppercase tracking-tighter">Time Saved</span>
          <span className="text-xl font-mono font-bold text-emerald-400">+{metrics.total_minutes_saved}m</span>
        </div>
      </div>
      
      <div className="relative h-1.5 bg-white/5 rounded-full flex justify-between items-center px-1">
        <div className="absolute h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
        {milestones.map((m, i) => (
          <div key={i} className="relative group">
            <div className={`w-5 h-5 rounded-full bg-slate-900 border-2 transition-all duration-500 z-10 ${isCelebrating ? 'border-emerald-400 scale-125' : 'border-white/20'}`} />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{m.label}</p>
              <p className="text-sm font-black italic">Wk {m.weeks}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-250px) rotate(360deg) scale(2); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div className="h-12" />
    </div>
  );
}