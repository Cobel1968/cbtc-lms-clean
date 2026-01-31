"use client";
import Navigation from '@/components/navigation';
import StudentQR from '@/components/qr-generator';
import MilestoneForecast from '@/components/milestone-forecast';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStudents() {
      const { data } = await supabase.from('profiles').select('*');
      if (data) setStudents(data);
    }
    fetchStudents();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-12 px-6">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#003366]">Command Center</h2>
            <p className="text-[#10B981] text-xs font-black uppercase tracking-[0.3em]">Adaptive Learning Algorithm Active</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Cohort</span>
             <p className="text-xl font-black text-[#003366]">{students.length} Students</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              
              {/* Left Side: Stats & Forecast */}
              <div className="flex-1 p-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-[#003366]">{student.full_name || 'Vocational Student'}</h3>
                  <p className="text-[#10B981] text-[10px] font-bold uppercase tracking-widest">{student.technical_domain || 'General Technical'}</p>
                </div>
                
                <MilestoneForecast studentId={student.id} />
              </div>

              {/* Right Side: QR Access Badge */}
              <div className="w-full md:w-64 bg-[#003366]/5 border-l border-slate-100 p-10 flex flex-col items-center justify-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#003366] mb-4">Mobile Access</p>
                <StudentQR studentId={student.id} />
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}