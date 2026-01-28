'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Brain, Loader2, ChevronRight } from 'lucide-react';

export default function DiagnosticPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.from('courses').select('*');
      if (data) setCourses(data);
      setLoading(false);
    }
    init();
  }, []);

  const handleSelectCourse = async (course) => {
    setSelectedCourse(course);
    const { data } = await supabase
      .from('modules')
      .select('*')
      .eq('course_id', course.id)
      .order('created_at', { ascending: true });
    if (data) setModules(data);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex items-center gap-4 border-b border-white/10 pb-6">
          <Brain className="text-blue-500" size={40} />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Path Optimizer</h1>
        </header>

        {loading ? <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} /> : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Course Selection */}
            <section className="space-y-4">
              <h2 className="text-xs font-black uppercase text-blue-500 tracking-[0.3em]">1. Select Course</h2>
              <div className="grid gap-3">
                {courses.map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => handleSelectCourse(c)}
                    className={`p-6 rounded-3xl border-2 text-left transition-all ${
                      selectedCourse?.id === c.id ? 'bg-blue-600 border-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* TEXT COLOR FIXED: Black text on white buttons for high contrast */}
                    <div className={`font-bold text-xl ${selectedCourse?.id === c.id ? 'text-white' : 'text-slate-900'}`}>
                      {c.name_en || c.title}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${selectedCourse?.id === c.id ? 'text-blue-200' : 'text-slate-500'}`}>
                      {c.category}  {c.level}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Module Preview (The "Knowledge Anchor") */}
            <section className="space-y-4">
              <h2 className="text-xs font-black uppercase text-blue-500 tracking-[0.3em]">2. Reference Structure</h2>
              {selectedCourse ? (
                <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 space-y-3">
                  <p className="text-xs text-slate-400 mb-4 font-medium italic">Detection points for {selectedCourse.name_en}:</p>
                  {modules.length > 0 ? modules.map((m, i) => (
                    <div key={m.id} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                      <span className="text-blue-500 font-black text-xs">0{i+1}</span>
                      <span className="text-sm font-bold text-white">{m.title_en}</span>
                    </div>
                  )) : (
                    <div className="p-10 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">No modules linked</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-900 rounded-[2.5rem] p-12 text-center">
                  <p className="text-slate-700 font-black uppercase text-[10px] tracking-[0.4em]">Select a course to load the AI Reference Map</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}