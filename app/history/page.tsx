"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function HistoryPage() {
  const supabase = createClient();
  const [records, setRecords] = useState<any[]>([]);

  const fetchRecords = async () => {
    const { data } = await supabase.from('student_evidence').select('*, students(name)').order('created_at', { ascending: false });
    if (data) setRecords(data);
  };

  useEffect(() => { fetchRecords(); }, []);

  const deleteRecord = async (id: string) => {
    if (confirm("Permanently delete this assessment from the student's folder?")) {
      const { error } = await supabase.from('student_evidence').delete().eq('id', id);
      if (!error) fetchRecords();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Assessment History</h1>
        <Link href="/admin-dashboard" className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold">RETURN TO DASHBOARD</Link>
      </div>
      <div className="space-y-4">
        {records.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center group">
            <div>
              <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{new Date(r.created_at).toLocaleDateString()}</p>
              <h3 className="text-xl font-bold">{r.assessment_title}</h3>
              <p className="text-slate-400 text-sm italic">Student: {r.students?.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-lg font-black">EN: {r.english_fluency}% | FR: {r.french_fluency}%</div>
              </div>
              <button onClick={() => deleteRecord(r.id)} className="opacity-0 group-hover:opacity-100 bg-rose-50 text-rose-600 p-2 rounded-lg hover:bg-rose-600 hover:text-white transition-all">
                
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}