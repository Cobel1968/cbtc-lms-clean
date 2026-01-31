import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();
  // We add { cache: 'no-store' } logic implicitly by using the server client
  const { data: students } = await supabase
    .from('student_competency_matrix')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Trainer Oversight</h1>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">System Live</span>
           <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase">Student Identity</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase">Bilingual Fluency</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((s) => (
              <tr key={s.student_id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">{s.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-100 h-2 w-24 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${s.english_fluency}%` }}></div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">EN: {s.english_fluency}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   {s.diploma_eligible ? 
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black">ELGIBLE</span> : 
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black">PENDING</span>
                   }
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2"><Link href="/history"><button className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">HISTORY</button></Link></div><Link href="/assessments">
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:shadow-lg transition-all">
                      COBEL REVIEW
                    </button>
                  </Link></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
