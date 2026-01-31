"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TranscriptPage() {
  const supabase = createClient();
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('student_evidence').select('*, students(name), courses(title, course_code)');
      if (data) setRecords(data);
    }
    fetch();
  }, []);

  return (
    <div className="p-16 max-w-4xl mx-auto bg-white min-h-screen border shadow-sm print:shadow-none">
      <div className="border-b-4 border-slate-900 pb-8 mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">ACADEMIC TRANSCRIPT</h1>
          <p className="font-bold text-blue-600 uppercase text-sm">{records[0]?.courses?.title} ({records[0]?.courses?.course_code})</p>
        </div>
        <div className="text-right">
          <p className="font-black text-xl">{records[0]?.students?.name}</p>
          <p className="text-slate-400 text-xs">Student Identification: {records[0]?.student_id?.slice(0,8)}</p>
        </div>
      </div>
      {/* Table rows for assessments follow here... */}
      <button onClick={() => window.print()} className="mt-10 bg-slate-100 p-4 rounded-xl font-bold print:hidden w-full">PRINT OFFICIAL DOCUMENT</button>
    </div>
  );
}