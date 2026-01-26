'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Zap, Clock, CheckCircle, Languages, TrendingUp, Sparkles, Target , AlertCircle} from 'lucide-react';

// audit: ensured lowercase naming for local component paths
import course_switcher from '@/components/CourseSwitcher';
import milestone_forecast from '@/components/milestone_forecast';
// feature 4: analog-to-digital bridge component
import assessment_uploader from '@/components/assessment/assessmentuploader';

export default function StudentPortal() {
  // state keys forced to lowercase snake_case
  const [engine_stats, set_engine_stats] = useState({
    total_minutes: 0,
    speed_index: 1.0,
    time_saved_hours: 0
  });

  useEffect(() => {
    async function sync_temporal_data() {
      try {
        const res = await fetch('/api/courses');
        const json = await res.json();
        // logic: simulating engine calculation for jean
        set_engine_stats({
          total_minutes: 1450,
          speed_index: 1.4,
          time_saved_hours: 24
        });
      } catch (e) {
        console.error("cobel_engine: dashboard_sync_error", e);
      }
    }
    sync_temporal_data();
  }, []);

  return (<a href="/" style={{position:"fixed", top:10, right:10, zIndex:9999, background:"black", color:"white", padding:"5px", fontSize:"10px"}} id="GOTO_HOME">HOME</a>
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 lowercase">
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">jean's portal</h1>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <p className="text-slate-500 font-medium italic">cobel ai engine: path mapping active</p>
          </div>
        </div>
        
        {/* speed metrics */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">speed index</p>
            <p className="text-xl font-black text-indigo-600">{engine_stats.speed_index}x</p>
          </div>
          <div className="w-[1px] bg-slate-100" />
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">time saved</p>
            <p className="text-xl font-black text-emerald-600">{engine_stats.time_saved_hours}h</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <milestone_forecast 
              total_minutes_spent={engine_stats.total_minutes} 
              expected_minutes={6000} 
            />
          </div>

          <section className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target size={20} className="text-indigo-600" />
                <h3 className="font-black text-slate-900 uppercase italic tracking-tighter text-sm">active track</h3>
              </div>
              <p className="text-2xl font-black text-slate-800 uppercase leading-none mb-2">hospitality esp</p>
            </div>
            
            <div className="mt-8 space-y-3">
               <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                 <div className="bg-slate-900 h-full rounded-full" style={{ width: '68%' }} />
               </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            {/* technical fluency card */}
            <section className="bg-slate-900 text-white rounded-[32px] p-8 shadow-xl">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-indigo-400 uppercase text-xs tracking-widest italic border-b border-slate-800 pb-4">
                <Languages size={18}/> technical fluency
              </h3>
              <p className="text-4xl font-black tracking-tighter mb-6">89.4%</p>
              <div className="space-y-5">
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </section>

            {/* feature 4 bridge uploader injection */}
            <section className="bg-indigo-50 rounded-[32px] p-6 border border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-indigo-600" />
                <h3 className="font-black text-indigo-900 uppercase italic text-[10px] tracking-widest">
                  bridge ingestion
                </h3>
              </div>
              <assessment_uploader userId="jean_001" />
            </section>
          </div>

          <div className="lg:col-span-3">
              <course_switcher />
          </div>
        </div>
      </div>
    </div>
  );
}






