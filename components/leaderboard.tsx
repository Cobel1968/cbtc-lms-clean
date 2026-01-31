"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Leaderboard() {
  const [students, setStudents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, technical_fluency, technical_domain')
        .order('technical_fluency', { ascending: false })
        .limit(5);
      if (data) setStudents(data);
    }
    fetchLeaderboard();
  }, [supabase]);

  return (
    <div className="bg-[#003366] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Competitive Analysis</h3>
          <p className="text-2xl font-black uppercase tracking-tighter italic text-white">Fluency Leaderboard</p>
        </div>
        <div className="bg-emerald-500/20 px-4 py-1 rounded-full border border-emerald-500/30">
          <span className="text-[10px] font-black text-emerald-400 uppercase">Top 5 Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {students.map((s, i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all group">
            <span className={`text-xl font-black italic ${i === 0 ? 'text-emerald-400' : 'text-white/20'}`}>
              0{i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-tight text-white">{s.full_name}</p>
              <p className="text-[9px] font-bold text-white/40 uppercase">{s.technical_domain}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-emerald-400">{s.technical_fluency}%</p>
              <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${s.technical_fluency}%` }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}