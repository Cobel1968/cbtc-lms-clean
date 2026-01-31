"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [evidence, setEvidence] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [englishScore, setEnglishScore] = useState(70);
  const [frenchScore, setFrenchScore] = useState(70);

  useEffect(() => {
    setEvidence(localStorage.getItem('last_scanned_evidence'));
    setTitle(localStorage.getItem('last_scanned_title') || "Assessment");
    setStudentId(localStorage.getItem('assigned_student_id') || "");
    setCourseId(localStorage.getItem('assigned_course_id') || "");
  }, []);

  const handleSave = async () => {
    if (!studentId || !courseId) return alert("Enrollment Data Missing - Please restart scan.");

    const { error } = await supabase.from('student_evidence').insert({ 
      student_id: studentId,
      course_id: courseId,
      assessment_title: title,
      english_fluency: englishScore, 
      french_fluency: frenchScore
    });

    if (!error) {
      localStorage.clear();
      router.push('/admin-dashboard'); 
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">{title}</h1>
        <button onClick={handleSave} className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-black shadow-lg">
          COMMIT TO LMS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-4 rounded-3xl border shadow-sm">
          <img src={evidence} className="w-full rounded-2xl shadow-inner" />
        </div>
        <div className="bg-slate-50 p-10 rounded-3xl border space-y-10">
          <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest">Adjust Fluency</h2>
          
          <div>
            <label className="block text-xs font-black mb-2">ENGLISH FLUENCY (%)</label>
            <input type="range" value={englishScore} onChange={(e) => setEnglishScore(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            <p className="text-right font-black text-2xl text-blue-600">{englishScore}%</p>
          </div>

          <div>
            <label className="block text-xs font-black mb-2">FRENCH FLUENCY (%)</label>
            <input type="range" value={frenchScore} onChange={(e) => setFrenchScore(Number(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500" />
            <p className="text-right font-black text-2xl text-rose-500">{frenchScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}