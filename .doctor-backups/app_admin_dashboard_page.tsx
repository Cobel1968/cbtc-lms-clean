'use client';
export const dynamic = 'force-dynamic';
// Ensure these imports match the actual lowercase filenames in your /lib or /components
import { ShieldAlert, Users, BarChart3, Plus, Activity , AlertCircle} from 'lucide-react'

export default function admin_dashboard() {
  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      {/* header section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
            system oversight
          </h1>
          <p className="text-slate-500 font-medium">
            managing rbac & engine efficiency
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
            <Activity size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase">engine: operational</span>
          </div>
        </div>
      </header>

      {/* global innovation metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            total institutional time saved
          </p>
          <p className="text-5xl font-black text-indigo-600 tracking-tighter italic">1,420h</p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            active ai optimizations
          </p>
          <p className="text-5xl font-black text-emerald-600 tracking-tighter italic">84%</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            security status
          </p>
          <div className="mt-2 flex items-center gap-2 text-emerald-500">
            <ShieldAlert size={20} />
            <span className="text-xs font-black uppercase tracking-tight">rls active (supabase)</span>
          </div>
        </div>
      </div>

      {/* rbac management table */}
      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden">
        <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-black text-slate-900 uppercase text-sm tracking-tight">access control list</h3>
            <p className="text-[10px] text-slate-500 italic">permissions for trainers and students</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all">
            <Plus size={14}/> new user
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="p-6 px-8">user identity</th>
                <th className="p-6">role mapping</th>
                <th className="p-6">pedagogical permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 px-8 font-bold text-slate-700">abel c.</td>
                <td className="p-6">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">trainer</span>
                </td>
                <td className="p-6 text-xs text-slate-500 italic">
                  assessments, path mapping, pdf sync, analog ingestion
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 px-8 font-bold text-slate-700">jean marc</td>
                <td className="p-6">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">student</span>
                </td>
                <td className="p-6 text-xs text-slate-500 italic">
                  view path, download materials, bilingual exercises
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}