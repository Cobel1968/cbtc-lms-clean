'use client';

// icons are third-party components, so PascalCase is required for imports
import { ShieldCheck, Database, FileCode, Zap } from 'lucide-react';
// rectification: ensuring the component import name follows lowercase/snake_case
import audit_dashboard_component from '@/components/admin/auditdashboard';

export default function audit_page() {
  return (
    <div className="p-8 lg:p-12 lowercase bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* head: command center identification */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
              system health audit
            </h1>
            <p className="text-slate-500 font-medium">
              abel c. / administrative command center
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border border-emerald-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              engine: online
            </div>
          </div>
        </header>

        {/* innovation metrics grid: feature 1 & 2 tracking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-8 border border-slate-100 rounded-[32px] bg-slate-50/50 shadow-sm hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group">
            <Database className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-1">cloud sync</h3>
            <p className="text-xs text-slate-500 font-mono truncate">rvlcpygatguvxhuliand</p>
          </div>
          
          <div className="p-8 border border-slate-100 rounded-[32px] bg-slate-50/50 shadow-sm hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group">
            <FileCode className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-1">asset track</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">4 vocational modules</p>
          </div>
          
          <div className="p-8 border border-slate-100 rounded-[32px] bg-slate-50/50 shadow-sm hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group">
            <ShieldCheck className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-1">security</h3>
            <p className="text-xs text-slate-500 italic font-bold uppercase">role: admin / abel c.</p>
          </div>
        </div>

        {/* core engine logic visualization wrapper */}
        <div className="bg-white rounded-[44px] border border-slate-100 p-2 shadow-2xl shadow-slate-200/20 overflow-hidden">
          <div className="bg-slate-50/30 rounded-[40px] p-6">
            <audit_dashboard_component />
          </div>
        </div>

        {/* trademark footer */}
        <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] leading-relaxed">
            cobel business training center Ã‚Â© 2026<br/>
            pedagogical logic v2.7 | all systems nominal
          </p>
        </footer>
      </div>
    </div>
  );
}