'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { Users, Calendar, Clock, ChevronRight, TrendingDown, Search , AlertCircle} from 'lucide-react';

export default function StudentDirectory() {
  const [search_query, set_search_query] = useState('');

  // simulated data representing the engine's temporal mapping
  const trainees = [
    { 
      id: 'st_01', 
      name: 'moussa traorÃƒÂ©', 
      specialty: 'industrial mechanics', 
      progress: 65,
      forecasted_finish: '2026-03-15',
      optimized_weeks: -2, // feature 3: time saved by the engine
      fluency: 'b2'
    },
    { 
      id: 'st_02', 
      name: 'claire dubois', 
      specialty: 'automotive systems', 
      progress: 42,
      forecasted_finish: '2026-05-20',
      optimized_weeks: -1,
      fluency: 'c1'
    }
  ];

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
            trainee directory
          </h1>
          <p className="text-slate-500 font-medium">
            temporal optimization & milestone forecasting (feature 3)
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="search trainee..."
            className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm font-bold w-full md:w-64 focus:ring-2 focus:ring-indigo-500 transition-all"
            onChange={(e) => set_search_query(e.target.value)}
          />
        </div>
      </header>

      {/* Trainee Grid */}
      <div className="grid grid-cols-1 gap-4">
        {trainees.map((student) => (
          <div 
            key={student.id}
            className="group bg-white border border-slate-100 p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            <div className="flex items-center gap-6 w-full md:w-1/3">
              <div className="w-16 h-16 bg-slate-900 rounded-[22px] flex items-center justify-center text-indigo-400 font-black text-xl uppercase italic">
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg">{student.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{student.specialty}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 w-full md:w-auto">
              {/* Progress Stat */}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">curriculum density</p>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: `${student.progress}%` }} />
                  </div>
                  <span className="text-xs font-black">{student.progress}%</span>
                </div>
              </div>

              {/* Optimization Stat (Feature 3) */}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">temporal shift</p>
                <div className="flex items-center gap-2 text-emerald-500 font-black text-xs">
                  <TrendingDown size={14} />
                  <span>{student.optimized_weeks} weeks</span>
                </div>
              </div>

              {/* Forecast Stat */}
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ai forecast</p>
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                  <Calendar size={14} className="text-indigo-600" />
                  <span>{student.forecasted_finish}</span>
                </div>
              </div>
            </div>

            <button className="w-full md:w-auto bg-slate-50 text-slate-900 p-4 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}