"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AssessmentsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function getStudents() {
      const { data } = await supabase.from('students').select('id, name');
      if (data) setStudents(data);
    }
    getStudents();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startBridge = () => {
    if (!selectedStudent || !title) return alert("Assign a student and title first!");
    setIsProcessing(true);
    localStorage.setItem('assigned_student_id', selectedStudent);
    localStorage.setItem('last_scanned_title', title);
    localStorage.setItem('last_scanned_evidence', preview || "");
    setTimeout(() => router.push('/analytics'), 1500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Pedagogical Bridge</h1>
        <button onClick={() => router.push('/admin-dashboard')} className="text-sm font-bold text-slate-400 hover:text-slate-900">
           RETURN TO DASHBOARD
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Assign to Student</label>
            <select 
              className="w-full p-4 bg-slate-50 border rounded-xl outline-none"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select Student...</option>
              <option value="bulk">Bulk Assignment (All Students)</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Module Title</label>
            <input 
              type="text" 
              placeholder="e.g., Engine Diagnostics" 
              className="w-full p-4 bg-slate-50 border rounded-xl outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="border-4 border-dashed border-slate-100 rounded-2xl p-10 text-center">
          {!preview ? (
            <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
          ) : (
            <div className="space-y-4">
               <img src={preview} className="max-h-48 mx-auto rounded-lg shadow" />
               <button onClick={startBridge} disabled={isProcessing} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black tracking-widest">
                 {isProcessing ? "ANALYZING..." : "START AI SCAN"}
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}