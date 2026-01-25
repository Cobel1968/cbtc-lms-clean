'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Zap, FileUp, Activity } from 'lucide-react';
import Link from 'next/link';

// strictly lowercase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function StudentDirectory() {
  const [students, set_students] = useState<any[]>([]);
  const [is_loading, set_is_loading] = useState(true);

  useEffect(() => {
    async function fetch_students() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('last_bridge_sync', { ascending: false });

      if (!error && data) set_students(data);
      set_is_loading(false);
    }
    fetch_students();
  }, []);

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
            vocational directory
          </h1>
          <p className="text-slate-500 font-medium">
            monitoring technical fluency & temporal optimization
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-2">
          <Activity size={14} className="text-indigo-500" />
          <span className="text-[10px] font-black uppercase text-slate-500">active profiles: {students.length}</span>
        </div>
      </header>

      {is_loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">accessing engine database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {students.map((student) => (
            <div key={student.id} className="bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col lg:flex-row items-center justify-between group hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="flex items-center gap-6 w-full lg:w-auto">
                <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                  <Users size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                    id: {student.id.slice(0, 8)}
                  </p>
                  <h3 className="text-xl font-black text-slate-900">
                    {student.email.split('@')[0]}
                  </h3>
                  <p className="text-xs text-slate-400">{student.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 mt-6 lg:mt-0 w-full lg:w-auto justify-between lg:justify-end">
                <div className="text-center px-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">fluency</p>
                  <span className="text-sm font-black text-slate-700">{student.technical_fluency_score ?? 0}%</span>
                </div>

                <div className="text-center px-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">timeframe</p>
                  <span className="flex items-center gap-1 text-indigo-600 font-black italic">
                    <Zap size={14} className="fill-indigo-600" /> {student.current_curriculum_weeks ?? 12} weeks
                  </span>
                </div>

                <Link 
                  href={`/admin/assessments?id=${student.id}`}
                  className="bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 group-hover:shadow-indigo-200"
                >
                  <FileUp size={16} /> bridge assessment
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
