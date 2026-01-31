import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function HistoryPage() {
  const supabase = await createClient();
  
  // Fetch all historical records for Mr. Soro
  const { data: records } = await supabase
    .from('student_evidence')
    .select(`
      id,
      english_fluency,
      french_fluency,
      trainer_notes,
      created_at,
      students ( name )
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Pedagogical Audit Trail</h1>
          <p className="text-slate-500">Feature 4: Historical Evidence Records [cite: 2026-01-01]</p>
        </div>
        <Link href="/admin-dashboard" className="text-blue-600 font-bold hover:underline"> Back to Oversight</Link>
      </div>

      <div className="space-y-4">
        {records?.map((record) => (
          <div key={record.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">
                {new Date(record.created_at).toLocaleDateString()} - {new Date(record.created_at).toLocaleTimeString()}
              </div>
              <h3 className="text-lg font-bold text-slate-800">Assessment for {record.students?.name}</h3>
              <p className="text-sm text-slate-500 italic">"{record.trainer_notes}"</p>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-2xl font-black text-blue-600">{record.english_fluency}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">English</div>
              </div>
              <div>
                <div className="text-2xl font-black text-rose-500">{record.french_fluency}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">French</div>
              </div>
            </div>
          </div>
        ))}
        {(!records || records.length === 0) && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No archived evidence found in this folder.</p>
          </div>
        )}
      </div>
    </div>
  );
}