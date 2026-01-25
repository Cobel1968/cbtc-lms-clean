'use client';

export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  Languages, 
  TrendingUp, 
  Sparkles, 
  Target, 
  AlertCircle 
} from 'lucide-react';

// IMPORTANT: Ensure the file on disk is named "CourseSwitcher.tsx"
import CourseSwitcher from '@/components/CourseSwitcher';

/**
 * COBEL STUDENT PORTAL
 * Feature: Dynamic Path Mapping & Temporal Optimization
 * Path: app/student/page.tsx
 */
export default function StudentPortal() {
  // Maintaining snake_case inside the object as per your preference
  const [engineStats] = useState({
    speed_index: 1.4,
    time_saved_hours: 24,
    fluency: 89.4
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 lowercase">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
            jean&apos;s portal
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <p className="text-slate-500 font-medium italic">cobel ai engine: path mapping active</p>
          </div>
        </div>
        
        {/* ENGINE METRICS */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">speed index</p>
            <p className="text-xl font-black text-indigo-600">{engineStats.speed_index}x</p>
          </div>
          <div className="w-[1px] bg-slate-100" />
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">time saved</p>
            <p className="text-xl font-black text-emerald-600">{engineStats.time_saved_hours}h</p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR: PEDAGOGICAL LOGIC STATUS */}
          <div className="space-y-6">
            <section className="bg-slate-900 text-white rounded-[32px] p-8 shadow-xl">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-indigo-400 uppercase text-xs tracking-widest italic border-b border-slate-800 pb-4">
                <Languages size={18}/> technical fluency
              </h3>
              <p className="text-4xl font-black tracking-tighter mb-6">
                {engineStats.fluency}%
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>curriculum density</span>
                  <span className="text-indigo-400 text-xs font-black">optimized</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                   <div 
                     className="bg-indigo-500 h-full transition-all duration-1000" 
                     style={{ width: `${engineStats.fluency}%` }} 
                   />
                </div>
              </div>
            </section>
          </div>

          {/* MAIN AREA: ADAPTIVE COMPONENT */}
          <div className="lg:col-span-3">
             <CourseSwitcher />
          </div>

        </div>
      </main>
    </div>
  );
}