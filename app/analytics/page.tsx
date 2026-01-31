"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [evidence, setEvidence] = useState<string | null>(null);
  const [englishScore, setEnglishScore] = useState(82);
  const [frenchScore, setFrenchScore] = useState(45);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedEvidence = localStorage.getItem('last_scanned_evidence');
    if (savedEvidence) setEvidence(savedEvidence);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    // 1. Identify the student in the folder
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('name', 'Mr. Soro')
      .single();

    if (student) {
      // 2. Commit the Record of Evidence [cite: 2026-01-01]
      const { error } = await supabase
        .from('student_evidence')
        .insert({ 
          student_id: student.id,
          english_fluency: englishScore, 
          french_fluency: frenchScore,
          trainer_notes: localStorage.getItem('last_scanned_title') || 'Standard Assessment'
        });

      if (!error) {
        alert("Success: Assessment archived in Mr. Soro's folder.");
        localStorage.removeItem('last_scanned_evidence');
        router.push('/admin-dashboard'); 
      } else {
        alert("Error archiving: " + error.message);
      }
    } else {
      alert("Student identity not found in database.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Finalize Assessment</h1>
          <p className="text-slate-500 font-medium">Bilingual Vocational Mapping [cite: 2026-01-01]</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push('/admin-dashboard')} className="px-6 py-2 font-bold text-slate-400">Cancel</button>
          <button onClick={handleSave} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all">
            {isSaving ? "Archiving..." : "Commit to Student Folder"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-4 text-slate-400 uppercase text-xs tracking-widest">Analog Evidence Record</h3>
          <div className="aspect-[3/4] bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
             {evidence ? <img src={evidence} className="w-full h-full object-contain p-4" /> : <p className="text-slate-300 italic">No document found in current session.</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Trainer Verification Layer</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2"><span className="text-sm font-bold text-slate-600">English Fluency</span><span className="font-mono text-blue-600 font-bold">{englishScore}%</span></div>
                <input type="range" min="0" max="100" value={englishScore} onChange={(e) => setEnglishScore(Number(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="text-sm font-bold text-slate-600">French Fluency</span><span className="font-mono text-rose-500 font-bold">{frenchScore}%</span></div>
                <input type="range" min="0" max="100" value={frenchScore} onChange={(e) => setFrenchScore(Number(e.target.value))} className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-3xl">
             <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Temporal Optimization Impact</h4>
             <p className="text-sm opacity-80">Saving this record will update the Curriculum Density for Mr. Soro. Graduation forecast: Feb 2026.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
