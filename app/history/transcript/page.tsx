import { createClient } from '@/utils/supabase/server';

export default async function TranscriptPage() {
  const supabase = await createClient();
  const { data: records } = await supabase
    .from('student_evidence')
    .select('*, students(name)')
    .order('created_at', { ascending: true });

  const avg = records && records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + (r.english_fluency + r.french_fluency)/2, 0) / records.length) 
    : 0;

  return (
    <div className="p-12 max-w-4xl mx-auto bg-white min-h-screen shadow-2xl my-10 border-t-8 border-blue-600">
      <div className="flex justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black">OFFICIAL TRANSCRIPT</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cobel Business Training Center</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-bold">STUDENT: {records?.[0]?.students?.name || "Mr. Soro"}</p>
          <p className="text-slate-400">Printed: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <table className="w-full mb-12">
        <thead className="border-b-2 border-slate-900">
          <tr className="text-left text-xs font-black uppercase">
            <th className="py-4">Module / Assessment Title</th>
            <th className="py-4 text-center">EN %</th>
            <th className="py-4 text-center">FR %</th>
          </tr>
        </thead>
        <tbody>
          {records?.map((r) => (
            <tr key={r.id} className="border-b border-slate-50">
              <td className="py-4 font-bold text-slate-700">{r.assessment_title}</td>
              <td className="py-4 text-center font-mono text-blue-600 font-bold">{r.english_fluency}%</td>
              <td className="py-4 text-center font-mono text-rose-500 font-bold">{r.french_fluency}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="bg-slate-900 text-white p-8 rounded-2xl text-center min-w-[200px]">
          <p className="text-xs font-bold uppercase opacity-50 mb-1">Final Bilingual GPA</p>
          <p className="text-5xl font-black">{avg}%</p>
        </div>
      </div>
    </div>
  );
}