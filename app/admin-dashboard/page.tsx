"use client";
import Logo from '@/components/logo';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import MilestoneForecast from '@/components/milestone-forecast';
import BatchScanModal from '@/components/batch-scan-modal';

export default function AdminDashboard() {
  const supabase = createClient();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.from('student_competency_matrix').select('*');
      if (data) setStudents(data);
    }
    getData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <Logo className="h-8" light />
        <BatchScanModal />
      </header>

      <div className="grid grid-cols-1 gap-6">
        {students.map((student) => (
          <div key={student.student_id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold uppercase tracking-tighter">{student.name}</h3>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{student.domain || 'General'}</span>
            </div>
            <MilestoneForecast studentId={student.student_id} />
          </div>
        ))}
      </div>
    </div>
  );
}