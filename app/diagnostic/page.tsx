'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import HandwritingIngestion from '@/components/HandwritingIngestion';
import { Brain, Target, Loader2, Sparkles } from 'lucide-react';

export default function DiagnosticPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    async function fetchLiveCourses() {
      const { data } = await supabase.from('courses').select('id, title, category, name_fr');
      if (data) setCourses(data);
      setLoading(false);
    }
    fetchLiveCourses();
  }, []);

  const handleFinalize = async () => {
    if (!scanResult) return;
    
    // Feature 3: Automated Milestone Forecasting logic
    const timeframe = scanResult.matchedTerms?.length > 3 ? '4 Weeks' : '8 Weeks';
    
    const { error } = await supabase.from('diagnostic_results').insert([{
      course_id: selectedCourseId,
      gap_analysis: scanResult.matchedTerms,
      predicted_timeframe: timeframe,
      suggested_density: 0.85
    }]);

    if (!error) setPrediction(timeframe);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="flex items-center gap-3">
          <Brain className="text-blue-500" size={32} />
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">AI Path Optimizer</h1>
        </header>

        {loading ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : (
          <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-[10px] font-black uppercase text-blue-500 mb-6 tracking-[0.3em]">Step 1: Select Real Course</h2>
            <div className="grid gap-3">
              {courses.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${selectedCourseId === c.id ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-700'}`}
                >
                  <div className="font-bold text-lg">{c.title}</div>
                  <div className="text-[10px] uppercase opacity-50 font-black">{c.category}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedCourseId && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <HandwritingIngestion 
              courseContext={selectedCourseId} 
              onScanComplete={(data) => setScanResult(data)} 
            />
          </div>
        )}

        {scanResult && !prediction && (
          <button 
            onClick={handleFinalize}
            className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all"
          >
            Finalize & Calculate Path
          </button>
        )}

        {prediction && (
          <div className="bg-slate-900 border border-green-500/50 p-10 rounded-[3rem] text-center animate-in zoom-in">
            <Sparkles className="text-yellow-500 mx-auto mb-4" size={32} />
            <h2 className="text-xl font-black uppercase mb-2">Optimization Complete</h2>
            <p className="text-slate-400 text-sm mb-6">Your adaptive path has been generated.</p>
            <div className="bg-slate-950 p-6 rounded-2xl inline-block border border-slate-800">
               <span className="text-4xl font-black italic text-blue-500">{prediction}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}