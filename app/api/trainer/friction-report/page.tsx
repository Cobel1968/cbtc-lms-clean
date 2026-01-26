'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { AlertTriangle, Gauge, Zap, ChevronRight, Activity } from 'lucide-react';
import supabase from '@/lib/supabaseClient';

export default function FrictionReport() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFriction = async () => {
      const { data } = await supabase
        .from('friction_logs')
        .select('*')
        .order('friction_index', { ascending: false });
      if (data) setLogs(data);
    };
    fetchFriction();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 lowercase">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2 text-indigo-600">
              <Activity size={24} />
              <span className="font-black uppercase tracking-widest text-xs">AI Engine Oversight</span>
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter text-slate-900">
              Friction <span className="text-indigo-600">Audit</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-400">active students: 124</p>
            <p className="font-black text-indigo-600 uppercase italic">optimization level: high</p>
          </div>
        </header>

        {/* High Friction Heat Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {logs.slice(0, 3).map((log, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertTriangle size={80} />
              </div>
              <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2 block">Critical Friction Term</span>
              <h2 className="text-2xl font-black uppercase italic mb-4">"{log.term}"</h2>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${log.friction_index}%` }} />
                </div>
                <span className="font-black text-xs">{log.friction_index}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated Logs */}
        <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest">
                <th className="p-6">Technical Term</th>
                <th className="p-6">Language Friction</th>
                <th className="p-6">Curriculum Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="p-6 font-bold text-slate-900 uppercase italic">{log.term}</td>
                  <td className="p-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${log.friction_index > 70 ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      {log.friction_index > 70 ? 'critical gap' : 'moderate'}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-slate-400">auto-assigned module</td>
                  <td className="p-6 text-right">
                    <button className="p-3 bg-slate-100 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




