import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: records } = await supabase
    .from('student_evidence')
    .select('*, students(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Student Folder Evidence</h1>
        <Link href="/admin-dashboard" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">BACK TO DASHBOARD</Link>
      </div>
      <div className="grid gap-4">
        {records?.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between">
            <div>
              <p className="text-blue-600 font-black text-xs uppercase tracking-widest">{new Date(r.created_at).toLocaleDateString()}</p>
              <h3 className="text-xl font-bold">{r.assessment_title}</h3>
              <p className="text-slate-400 text-sm">Target: {r.students?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-slate-700">EN: {r.english_fluency}% | FR: {r.french_fluency}%</div>
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 uppercase">Archive ID: {r.id.slice(0,8)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}