import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: students } = await supabase.from('student_competency_matrix').select('*');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Trainer Oversight</h1>
          <p className="text-slate-500 font-medium">Live Temporal Optimization Metrics [cite: 2026-01-01]</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold border border-blue-100">
          {students?.length || 0} ACTIVE NODES
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Student Identity</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Bilingual Fluency (E/F)</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Temporal Forecast</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Pedagogical Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students?.map((student) => (
              <tr key={student.student_id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">{student.name || 'External Entry'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-slate-100 h-2 rounded-full flex overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{width: '75%'}}></div>
                    <div className="bg-rose-400 h-full" style={{width: '25%'}}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Vocational Mapping Active</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                  {student.diploma_eligible ? 'Feb 2026' : 'TBD'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.diploma_eligible ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {student.diploma_eligible ? 'READY' : 'COBEL REVIEW'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}