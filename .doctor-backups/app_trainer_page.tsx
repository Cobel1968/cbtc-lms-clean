'use client';
export const dynamic = 'force-dynamic';
import { Zap, AlertTriangle, Clock, GraduationCap , AlertCircle} from 'lucide-react';

export default function trainer_dashboard() {
  return (
    <div className="p-8 lg:p-12 space-y-10">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">instructor dashboard</h1>
        <p className="text-slate-500 font-medium">monitoring bilingual technical fluency</p>
      </header>

      {/* trainer-specific metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">4</h3>
            <p className="text-xs text-slate-400 font-bold uppercase">high friction students</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl space-y-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black">88%</h3>
            <p className="text-xs text-slate-400 font-bold uppercase">avg. technical fluency</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black">-12 days</h3>
            <p className="text-xs text-slate-400 font-bold uppercase">temporal optimization avg.</p>
          </div>
        </div>
      </div>

      {/* quick-action student list for trainers */}
      <section className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
        <h2 className="font-black text-slate-900 mb-6 uppercase tracking-tight italic">recent assessments (feature 4 sync)</h2>
        <div className="space-y-4 text-sm font-bold text-slate-600">
          <div className="p-4 border-b border-slate-50 flex justify-between items-center">
            <span>moussa t. - industrial mechanics</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[10px]">sync successful</span>
          </div>
          <div className="p-4 border-b border-slate-50 flex justify-between items-center">
            <span>claire d. - hospitality comms</span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-[10px]">92% fluency</span>
          </div>
        </div>
      </section>
    </div>
  );
}