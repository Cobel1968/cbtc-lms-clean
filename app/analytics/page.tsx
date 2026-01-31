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
  const [englishScore, setEnglishScore] = useState(85);
  const [frenchScore, setFrenchScore] = useState(50);

  useEffect(() => {
    setEvidence(localStorage.getItem('last_scanned_evidence'));
    setTitle(localStorage.getItem('last_scanned_title') || "Module Assessment");
    setStudentId(localStorage.getItem('assigned_student_id') || "");
    setCourseId(localStorage.getItem('assigned_course_id') || "");
  }, []);

  const handleSave = async () => {
    if (!studentId || !courseId) return alert("Missing Enrollment Data!");

    const { error } = await supabase.from('student_evidence').insert({ 
      student_id: studentId,
      course_id: courseId,
      assessment_title: title,
      english_fluency: englishScore, 
      french_fluency: frenchScore,
      trainer_notes: 'Bilingual Technical Verification'
    });

    if (!error) {
       localStorage.clear();
       router.push('/admin-dashboard'); 
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">{title}</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl">
          COMMIT TO ACADEMIC RECORD
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-4 rounded-[2rem] border shadow-sm">
           <img src={evidence} className="w-full rounded-2xl" />
        </div>
        <div className="bg-slate-50 p-10 rounded-[2rem] border space-y-8">
           <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Adjust Fluency Levels</h3>
           {/* Sliders for EN/FR would go here as per previous versions */}
        </div>
      </div>
    </div>
  );
}