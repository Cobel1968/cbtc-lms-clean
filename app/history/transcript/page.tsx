"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function TranscriptPage() {
  const supabase = createClient();
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTranscript() {
      const { data } = await supabase
        .from('student_evidence')
        .select('*, students(name)')
        .order('created_at', { ascending: true });
      
      if (data) setRecords(data);
      setLoading(false);
    }
    fetchTranscript();
  }, []);

  const avg = records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + (r.english_fluency + r.french_fluency)/2, 0) / records.length) 
    : 0;

  if (loading) return <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest">Generating Transcript...</div>;

  return (
    <div className="p-12 max-w-4xl mx-auto bg-white min-h-screen my-10 border shadow-sm print:shadow-none print:my-0 print:border-none">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900">OFFICIAL TRANSCRIPT</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px]">CBTC Vocational Training [cite: 2026-01-01]</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button onClick={() => router.back()} className="bg-slate-100 px-4 py-2 rounded font-bold text-xs hover:bg-slate-200">
            BACK
          </button>
          <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-xs hover:bg-blue-700 shadow-lg">
            PRINT / SAVE PDF
          </button>
        </div>
      </div>

      <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Student Candidate</p>
          <p className="text-2xl font-black text-slate-900">{records[0]?.students?.name || "Pending Record"}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Modules</p>
          <p className="text-2xl font-black text-slate-900">{records.length}</p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-900 text-left text-[10px] font-black uppercase">
            <th className="py-4">Assessment Module / Title</th>
            <th className="py-4 text-center">English %</th>
            <th className="py-4 text-center">French %</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {records.map((r) => (
            <tr key={r.id}>
              <td className="py-4 font-bold text-slate-700">{r.assessment_title || "Untitled Module"}</td>
              <td className="py-4 text-center font-mono font-bold text-blue-600">{r.english_fluency}%</td>
              <td className="py-4 text-center font-mono font-bold text-rose-500">{r.french_fluency}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-16 flex justify-end">
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center min-w-[220px]">
          <p className="text-xs font-bold uppercase opacity-50 mb-1">Final Bilingual GPA</p>
          <p className="text-5xl font-black">{avg}%</p>
        </div>
      </div>
    </div>
  );
}