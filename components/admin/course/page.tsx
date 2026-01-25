'use client';
export const dynamic = 'force-dynamic';
import { BookOpen, PencilRuler, Globe2, Layers, Plus } from 'lucide-react';

// rectification: changed CourseManagement to course_template_management
export default function course_template_management() {
  const modules = [
    { id: 'm1', title: 'technical incident management', terms: 12, status: 'active' },
    { id: 'm2', title: 'bilingual client communication', terms: 8, status: 'draft' },
  ];

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          {/* uppercase is handled via className, not the raw string */}
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
            course architecture
          </h1>
          <p className="text-slate-500 font-medium">
            defining master curriculum & bilingual technical keys
          </p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
          <Plus size={16} /> add module
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* master course list */}
        <div className="lg:col-span-2 space-y-4">
          {modules.map((mod) => (
            <div key={mod.id} className="bg-white border border-slate-100 rounded-[32px] p-6 flex items-center justify-between group hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg italic">{mod.title}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {mod.terms} technical terms mapped
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                  mod.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}>
                  {mod.status}
                </span>
                <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
                  <PencilRuler size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* engine logic stats */}
        <div className="bg-indigo-600 rounded-[40px] p-10 text-white shadow-2xl shadow-indigo-900/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Layers size={120} />
          </div>
          
          <div className="space-y-8 relative z-10">
            <h3 className="font-black uppercase text-[10px] tracking-[0.3em] text-indigo-200">pedagogical metadata</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-lg"><Globe2 size={20} className="text-indigo-200" /></div>
                <div>
                  <p className="text-xs font-bold">bilingual friction: low</p>
                  <p className="text-[10px] opacity-60 italic">english/french mapping verified</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-lg"><Layers size={20} className="text-indigo-200" /></div>
                <div>
                  <p className="text-xs font-bold">curriculum density: 84%</p>
                  <p className="text-[10px] opacity-60 italic">optimized for 12-week base</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm relative z-10">
            <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-indigo-200">engine note</p>
            <p className="text-[10px] italic leading-relaxed opacity-80">
              changes to the master course architecture will force a re-calculation of all active student timeframes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
