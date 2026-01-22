'use client';

import { Zap, Clock, CalendarCheck, TrendingUp } from 'lucide-react';

interface ForecastProps {
  total_minutes_spent: number;
  expected_minutes: number; // e.g., 6000 mins for a 12-week course
}

export default function milestone_forecast({ total_minutes_spent, expected_minutes }: ForecastProps) {
  // Feature 3: Temporal Optimization Logic
  // Calculate velocity (Efficiency relative to expected time)
  const velocity = expected_minutes > 0 ? (total_minutes_spent / expected_minutes) * 100 : 0;
  
  // Logic: Project timeframe reduction (days saved)
  // assuming 480 mins (8 hours) of mastery gained = 1 day saved in the curriculum
  const days_saved = Math.floor(total_minutes_spent / 480);

  return (
    <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden lowercase">
      {/* Decorative Engine Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Zap size={24} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="font-black text-xl uppercase tracking-tighter leading-none">cobel engine</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">milestone forecasting active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Clock size={12} className="text-indigo-400" /> session velocity
            </span>
            <div className="text-4xl font-black italic tracking-tighter">
              {velocity.toFixed(1)}% <span className="text-sm text-indigo-400 not-italic tracking-normal">efficiency</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <CalendarCheck size={12} className="text-emerald-400" /> timeframe reduction
            </span>
            <div className="text-4xl font-black italic tracking-tighter text-emerald-400">
              -{days_saved} <span className="text-sm text-slate-400 not-italic tracking-normal">days saved</span>
            </div>
          </div>
        </div>

        {/* Progress Optimization Bar (Feature 3: Dynamic Path Mapping) */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-400">curriculum density mastery</span>
            <span className="text-indigo-400">adaptive path mapping</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
              style={{ width: `${Math.min(velocity, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
        <TrendingUp size={16} className="text-indigo-500" />
        <p className="text-[11px] font-bold text-slate-400 italic">
          your high technical mastery in <span className="text-white">bilingual vocational mapping</span> has optimized your graduation date.
        </p>
      </div>
    </div>
  );
}