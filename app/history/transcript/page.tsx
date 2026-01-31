import { createClient } from '@/utils/supabase/server';

export default async function TranscriptPage() {
  const supabase = await createClient();
  const { data: records } = await supabase.from('student_evidence').select('*, students(name)').order('created_at', { ascending: true });

  return (
    <div className="p-12 max-w-4xl mx-auto bg-white min-h-screen my-10 border shadow-sm print:shadow-none print:my-0">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900">OFFICIAL TRANSCRIPT</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px]">CBTC Vocational Training [cite: 2026-01-01]</p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-100 px-4 py-2 rounded font-bold text-xs print:hidden hover:bg-slate-200">
          PRINT / SAVE PDF
        </button>
      </div>

      <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Student Candidate</p>
        <p className="text-xl font-black">{records?.[0]?.students?.name || "Pending Selection"}</p>
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
          {records?.map((r) => (
            <tr key={r.id}>
              <td className="py-4 font-bold text-slate-700">{r.assessment_title}</td>
              <td className="py-4 text-center font-mono font-bold text-blue-600">{r.english_fluency}%</td>
              <td className="py-4 text-center font-mono font-bold text-rose-500">{r.french_fluency}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}