"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AssessmentsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const { data: c } = await supabase.from('courses').select('*');
      const { data: s } = await supabase.from('students').select('*');
      if (c) setCourses(c);
      if (s) setStudents(s);
    }
    loadData();
  }, []);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const startScan = () => {
    if (!selectedStudent || !selectedCourse || !title) {
      alert("Please select Student, Course, and Module Title first!");
      return;
    }
    // Anchor the Golden Thread
    localStorage.setItem('assigned_student_id', selectedStudent);
    localStorage.setItem('assigned_course_id', selectedCourse);
    localStorage.setItem('last_scanned_title', title);
    localStorage.setItem('last_scanned_evidence', preview || "");
    
    router.push('/analytics');
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-8">New Pedagogical Scan</h1>
      <div className="space-y-6 bg-white p-8 rounded-[2rem] border shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select onChange={(e) => setSelectedCourse(e.target.value)} className="p-4 bg-slate-50 border rounded-xl font-bold">
            <option value="">-- Select Course --</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select onChange={(e) => setSelectedStudent(e.target.value)} className="p-4 bg-slate-50 border rounded-xl font-bold">
            <option value="">-- Select Student --</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <input 
          placeholder="Module Name (e.g., Engine Safety)" 
          className="w-full p-4 bg-slate-50 border rounded-xl font-bold"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700" />
        
        {preview && (
          <button onClick={startScan} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">
            INITIALIZE AI DIAGNOSTIC
          </button>
        )}
      </div>
    </div>
  );
}