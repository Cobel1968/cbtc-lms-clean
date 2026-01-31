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
  const [englishScore, setEnglishScore] = useState(82);
  const [frenchScore, setFrenchScore] = useState(45);

  useEffect(() => {
    setEvidence(localStorage.getItem('last_scanned_evidence'));
    setTitle(localStorage.getItem('last_scanned_title') || "General Technical Assessment");
    setStudentId(localStorage.getItem('assigned_student_id') || "");
  }, []);

  const handleSave = async () => {
    if (!studentId) return alert("Error: No student linked to this session.");

    const { error } = await supabase.from('student_evidence').insert({ 
      student_id: studentId,
      assessment_title: title,
      english_fluency: englishScore, 
      french_fluency: frenchScore,
      trainer_notes: 'Verified via Cobel AI Engine'
    });

    if (!error) {
      localStorage.clear(); // Clear the bridge cache [cite: 2026-01-15]
      router.push('/admin-dashboard'); 
    } else {
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{title}</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px]">Commiting to Student ID: {studentId.slice(0,8)}</p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all">
          FINALIZE & COMMIT
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-3xl border shadow-sm">
           <img src={evidence} className="w-full rounded-2xl" />
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border space-y-8">
           <h3 className="font-bold">Adjust Bilingual Metrics</h3>
           <div>
             <label className="block text-[10px] font-black text-slate-400 mb-2">ENGLISH FLUENCY</label>
             <input type="range" value={englishScore} onChange={(e) => setEnglishScore(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
             <div className="text-right font-black text-blue-600">{englishScore}%</div>
           </div>
           <div>
             <label className="block text-[10px] font-black text-slate-400 mb-2">FRENCH FLUENCY</label>
             <input type="range" value={frenchScore} onChange={(e) => setFrenchScore(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500" />
             <div className="text-right font-black text-rose-500">{frenchScore}%</div>
           </div>
        </div>
      </div>
    </div>
  );
}