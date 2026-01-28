'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import HandwritingIngestion from '@/components/HandwritingIngestion';
import { Brain, AlertTriangle, Loader2 } from 'lucide-react';

export default function DiagnosticPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveCourses() {
      try {
        const { data, error } = await supabase.from('courses').select('id, title, category');
        if (error) throw error;
        if (data && data.length > 0) {
          setCourses(data);
        } else {
          setError("No courses found in database. Check your SQL Injection.");
        }
      } catch (err) {
        setError(err.message || "Connection failed.");
      } finally {
        setLoading(false);
      }
    }
    fetchLiveCourses();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center gap-3">
          <Brain className="text-blue-500" size={32} />
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">AI Path Optimizer</h1>
        </header>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Connecting to Cobel Engine...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-3xl flex items-center gap-4">
            <AlertTriangle className="text-red-500" />
            <div className="text-xs font-bold uppercase tracking-tight text-red-200">{error}</div>
          </div>
        ) : (
          <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
            <h2 className="text-[10px] font-black uppercase text-blue-500 mb-6 tracking-[0.3em]">Step 1: Select Course</h2>
            <div className="grid gap-3">
              {courses.map(c => (
                <button key={c.id} className="p-5 rounded-2xl border border-slate-700 bg-slate-800 text-left font-bold hover:border-blue-500 transition-all">
                  {c.title}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}