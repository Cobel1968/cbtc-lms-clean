import { createClient } from '@/utils/supabase/server';
import MilestoneForecast from '@/components/milestone-forecast';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from('student_competency_matrix')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Global Navigation Bar */}
      <div className="flex justify-between items-center mb-10 bg-slate-900 p-6 rounded-[2rem] shadow-2xl">
        <div className="flex gap-6 items-center">
          <h1 className="text-white text-2xl font-black tracking-tighter">COBEL ADMIN</h1>
          <nav className="flex gap-4">
            <a href="/analytics" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest">Analytics</a>
            <a href="/history" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest">History</a>
          </nav>
        </div>
      </div>

      {/* Feature 3: Temporal Optimization Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MilestoneForecast 
          englishScore={students?.[0]?.english_fluency || 0} 
          frenchScore={students?.[0]?.french_fluency || 0} 
          startDate={new Date()} 
        />
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">Student & Domain</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">Latest Assessment</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((s) => (
              <tr key={s.student_id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-slate-900">{s.name}</p>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-bold border ${
                    s.domain === 'Automotive' ? 'border-orange-200 text-orange-600 bg-orange-50' : 
                    s.domain === 'Electrical' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' : 
                    'border-blue-200 text-blue-600 bg-blue-50'
                  }`}>
                    {s.domain || 'General'}
                  </span>
                </td>
                <td className="p-6">
                  <p className="text-sm font-medium">{s.latest_title}</p>
                </td>
                <td className="p-6 text-right">
                  <a href="/history/readiness" className="text-[10px] font-black text-blue-600 hover:underline tracking-widest">
                    [READINESS REPORT]</a> <button className='ml-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest'>[Quick Scan]</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
