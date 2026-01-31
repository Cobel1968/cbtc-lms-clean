import MilestoneForecast from '@/components/milestone-forecast';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from('student_competency_matrix')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Global Navigation Bar */}
      <div className="flex justify-between items-center mb-10 bg-slate-900 p-4 rounded-2xl shadow-2xl">
        <div className="flex gap-6 items-center">
          <Link href="/admin-dashboard" className="text-white font-black tracking-tighter hover:text-blue-400">
            TRAINER HOME
          </Link>
          <div className="h-4 w-[1px] bg-slate-700"></div>
          <Link href="/history/transcript" className="text-emerald-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
            View Final Transcripts
          </Link>
        </div>
        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">
           <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Database Synced</span>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student & Latest Activity</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bilingual Technical Fluency</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Oversight Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students?.map((s) => (
              <tr key={s.student_id} className="hover:bg-blue-50/30 transition-all group">
                <td className="px-8 py-6">
                  <div className="font-black text-slate-900 text-lg">{s.name}</div>
                  <div className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-tight border border-blue-100">
                    {s.latest_title} <span className={	ext-[8px] px-2 py-0.5 rounded ml-2 font-bold border }>{s.domain || 'General'}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${s.english_fluency}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 w-12 text-right">EN {s.english_fluency}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-rose-400 h-full" style={{ width: `${s.french_fluency}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 w-12 text-right">FR {s.french_fluency}%</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-3">
                    <Link href="/history">
                      <button className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl text-[10px] font-black hover:bg-slate-200 uppercase tracking-widest">
                        Folder
                      </button>
                    </Link>
                    <Link href="/assessments">
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black hover:bg-blue-700 hover:shadow-lg transition-all uppercase tracking-widest">
                        New Review
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
