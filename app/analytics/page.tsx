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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEvidence(localStorage.getItem('last_scanned_evidence'));
    setTitle(localStorage.getItem('last_scanned_title') || "Assessment");
    setStudentId(localStorage.getItem('assigned_student_id') || "");
    setCourseId(localStorage.getItem('assigned_course_id') || "");
  }, []);

  const handleSave = async () => {
    if (!studentId || !courseId) return alert("Enrollment data missing.");
    setIsSaving(true);

    // Attempting insert with explicit column mapping
    const { error } = await supabase.from('student_evidence').insert({ 
      student_id: studentId,
      course_id: courseId,
      assessment_title: title,
      english_fluency: englishScore, 
      french_fluency: frenchScore,
      trainer_notes: 'Bilingual Technical Verification'
    });

    if (error) {
      console.error("Critical Sync Error:", error);
      // If schema cache is still broken, we alert the user
      if (error.message.includes("course_id")) {
        alert("Database Sync Issue: The 'course_id' column is still being cached. Please refresh your Supabase dashboard and try again in 60 seconds.");
      } else {
        alert("Error: " + error.message);
      }
      setIsSaving(false);
    } else {
      localStorage.clear();
      router.push('/admin-dashboard'); 
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">{title}</h1>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl disabled:bg-slate-300"
        >
          {isSaving ? "SYNCING..." : "COMMIT TO LMS"}
        </button>
      </div>
      {/* ... Rest of your UI for sliders and image preview ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-4 rounded-3xl border shadow-sm">
          {evidence && <img src={evidence} className="w-full rounded-2xl" />}
        </div>
        <div className="bg-slate-50 p-10 rounded-3xl border space-y-10">
          <div className="space-y-4">
            <label className="block text-xs font-black text-blue-600 uppercase">English Mastery: {englishScore}%</label>
            <input type="range" min="0" max="100" value={englishScore} onChange={(e) => setEnglishScore(Number(e.target.value))} className="w-full accent-blue-600" />
            
            <label className="block text-xs font-black text-rose-500 uppercase">French Mastery: {frenchScore}%</label>
            <input type="range" min="0" max="100" value={frenchScore} onChange={(e) => setFrenchScore(Number(e.target.value))} className="w-full accent-rose-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
