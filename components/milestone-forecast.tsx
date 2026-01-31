"use client";
import { useEffect, useState } from 'react';

export default function MilestoneForecast({ englishScore = 0, frenchScore = 0, startDate = new Date() }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="p-6 bg-slate-900 rounded-[2rem] h-32 animate-pulse" />;

  const avgScore = (Number(englishScore) + Number(frenchScore)) / 2;
  const standardDurationWeeks = 12;
  
  // Temporal Optimization: High scores reduce the remaining time
  // If avgScore is 100, duration drops by ~66%
  const optimizedDuration = Math.max(4, standardDurationWeeks * (1 - (avgScore / 150)));
  
  const graduationDate = new Date(startDate);
  graduationDate.setDate(graduationDate.getDate() + Math.round(optimizedDuration * 7));

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900 via-indigo-950 to-black text-white rounded-[2rem] shadow-2xl border border-white/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Cobel AI Engine</h3>
          <p className="text-xs font-bold opacity-60">Temporal Optimization Path</p>
        </div>
        <div className="bg-blue-500/20 px-2 py-1 rounded text-[8px] font-black text-blue-300 border border-blue-500/30">
          LIVE PREDICTION
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-4xl font-black tracking-tighter">{optimizedDuration.toFixed(1)} <span className="text-sm uppercase text-slate-400">Weeks</span></p>
          <p className="text-[10px] font-bold opacity-50 uppercase mt-1">Projected Duration</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-emerald-400 tracking-tight">
            {graduationDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
          <p className="text-[10px] font-bold opacity-50 uppercase mt-1">Target Graduation</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-[9px] font-black uppercase mb-2 opacity-40">
          <span>Curriculum Density</span>
          <span>{Math.round(avgScore)}% Mastery</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-1000" 
            style={{ width: `${Math.min(avgScore, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}