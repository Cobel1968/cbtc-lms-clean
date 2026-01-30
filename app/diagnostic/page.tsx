'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseDB';
import { Brain, CheckCircle2, Loader2 } from 'lucide-react';

export default function DiagnosticPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase.from('courses').select('*');
      if (data) setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  const selectCourse = async (course) => {
    setSelectedCourse(course);
    setModules([]); // Clear old modules immediately to show loading state
    const { data } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', course.id);
    if (data) setModules(data);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Left Column: Course Selection */}
        <section className="space-y-6">
          <header className="flex items-center gap-3 mb-8">
            <Brain className="text-blue-500" size={32} />
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">Cobel BTC Engine</h1>
          </header>
          
          <h2 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em]">Step 1: Choose Vocational Path</h2>
          <div className="space-y-3">
            {courses.map(c => (
              <button 
                key={c.id} 
                onClick={() => selectCourse(c)}
                className={`w-full p-6 rounded-3xl border-2 transition-all text-left ${
                  selectedCourse?.id === c.id ? 'bg-blue-600 border-white' : 'bg-white border-slate-800'
                }`}
              >
                <div className={`font-bold text-lg ${selectedCourse?.id === c.id ? 'text-white' : 'text-slate-900'}`}>
                  {c.name_en}
                </div>
                <div className={`text-[9px] font-black uppercase tracking-widest ${selectedCourse?.id === c.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {c.category} • {c.level}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Right Column: Reference Map (Detection Points) */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-8">
          <h2 className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] mb-6">Step 2: AI Reference Map</h2>
          
          {selectedCourse ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <p className="text-sm text-slate-400 italic">Technical anchors for {selectedCourse.name_en}:</p>
              {modules.length > 0 ? modules.map((m) => (
                <div key={m.id} className="flex items-start gap-4 p-5 bg-slate-800 rounded-2xl border border-white/5">
                  <CheckCircle2 className="text-blue-500 mt-1" size={18} />
                  <div>
                    <div className="font-bold text-white text-md leading-tight">{m.title_en}</div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase mt-1">{m.title_fr}</div>
                  </div>
                </div>
              )) : <div className="p-10 text-center text-slate-600">Loading module anchors...</div>}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-center opacity-20 italic">
              <p className="text-sm uppercase tracking-widest font-bold">Select a course to initialize mapping</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}