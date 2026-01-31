"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import MilestoneForecast from '@/components/milestone-forecast';

export default function StudentPortal({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchStudentData() {
      const { data: student } = await supabase
        .from('student_competency_matrix')
        .select('*')
        .eq('student_id', params.id)
        .single();
      if (student) setData(student);
    }
    fetchStudentData();
  }, [params.id]);

  if (!data) return <div className="p-10 text-center font-black animate-pulse">SYNCING WITH COBEL AI...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight">Bonjour, <br/>{data.name.split(' ')[0]}</h1>
        <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-1">Student Progress Portal</p>
      </div>

      {/* Mobile-Optimized Forecast */}
      <div className="mb-6">
        <MilestoneForecast 
          englishScore={data.english_fluency} 
          frenchScore={data.french_fluency} 
          startDate={new Date(data.created_at)} 
        />
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
        <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Technical Mastery</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase mb-2">
              <span>{data.domain} (EN)</span>
              <span>{data.english_fluency}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${data.english_fluency}%` }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase mb-2">
              <span>{data.domain} (FR)</span>
              <span>{data.french_fluency}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.french_fluency}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-50">
          <p className="text-[9px] font-bold text-slate-400 uppercase italic text-center">
            Last updated via Handwriting Analysis: {new Date(data.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}