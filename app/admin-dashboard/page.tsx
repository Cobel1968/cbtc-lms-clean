import Logo from '@/components/logo';
"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import MilestoneForecast from '@/components/milestone-forecast';
import BatchScanModal from '@/components/batch-scan-modal';

export default function AdminDashboard() {
  const supabase = createClient();
  const [students, setStudents] = useState<any[]>([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('student_competency_matrix')
        .select('*')
        .order('name', { ascending: true });
      if (data) setStudents(data);
    }
    fetchData();
  }, [supabase]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {isBatchModalOpen && <BatchScanModal onClose={() => setIsBatchModalOpen(false)} />}

      <div className="flex justify-between items-center mb-10 bg-slate-900 p-6 rounded-[2rem] shadow-2xl">
        <div className="flex gap-6 items-center">
          <h1 className="text-white text-2xl font-black tracking-tighter"><Logo className='h-6' light /></h1>
          <button 
            onClick={() => setIsBatchModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest transition-all"
          >
            + Batch Scan Assessments</button><button onClick={() => window.print()} className='ml-2 bg-white border border-slate-200 text-slate-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest hover:bg-slate-50 transition-all'>Print Class Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MilestoneForecast 
          englishScore={students?.[0]?.english_fluency || 0} 
          frenchScore={students?.[0]?.french_fluency || 0} 
          startDate={new Date()} 
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">Student & Domain</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">Latest Evidence</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-slate-900">{s.name}</p>
                  <span className="text-[9px] font-black text-blue-500 uppercase">{s.domain}</span>
                </td>
                <td className="p-6 text-sm font-medium text-slate-600 italic">
                  {s.latest_title || "No data ingested yet"}
                </td>
                <td className="p-6 text-right space-x-4">
                  <a href="/history/readiness" className="text-[10px] font-black text-slate-400 hover:text-blue-600 tracking-widest">[REPORT]</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
