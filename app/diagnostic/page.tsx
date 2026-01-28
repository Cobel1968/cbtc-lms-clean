'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import HandwritingIngestion from '@/components/HandwritingIngestion';
import { Brain, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';

const COURSES = [
  { id: 'solar', name: 'Solar Energy Tech', category: 'Energy' },
  { id: 'elec', name: 'Industrial Electricity', category: 'Electrical' },
  { id: 'hvac', name: 'HVAC Systems', category: 'Mechanical' }
];

export default function DiagnosticPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleCalculatePath = async () => {
    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert([{
        gap_analysis: { course: selectedCourse, detected_terms: scanResult.matchedTerms },
        suggested_density: scanResult.confidence > 0.7 ? 0.95 : 0.75,
        predicted_timeframe: scanResult.matchedTerms.length > 5 ? '3 weeks' : '6 weeks'
      }]).select();

    if (!error) setPrediction(scanResult.matchedTerms.length > 5 ? '3 weeks' : '6 weeks');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <Brain className="text-blue-500" size={40} />
          <h1 className="text-3xl font-black uppercase italic italic tracking-tighter">AI Path Optimizer</h1>
        </header>

        {/* 1. Course Selection */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4 block">Select Target Course</label>
          <div className="grid grid-cols-1 gap-3">
            {COURSES.map(course => (
              <button 
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className={`p-4 rounded-xl border text-left transition-all ${selectedCourse === course.id ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
              >
                <div className="font-bold">{course.name}</div>
                <div className="text-[10px] opacity-60 uppercase">{course.category}</div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Scanning Module */}
        <section className={!selectedCourse ? 'opacity-20 pointer-events-none' : ''}>
          <HandwritingIngestion 
            courseContext={selectedCourse} 
            onScanComplete={(data) => setScanResult(data)} 
          />
        </section>

        {/* 3. Finalize Button (Shows only after scan & selection) */}
        {scanResult && (
          <button 
            onClick={handleCalculatePath}
            className="w-full bg-blue-600 py-6 rounded-2xl font-black uppercase tracking-widest animate-in slide-in-from-bottom-4 shadow-lg shadow-blue-500/30"
          >
            Finalize & Calculate Path
          </button>
        )}

        {prediction && (
          <div className="bg-green-600/20 border border-green-500 p-8 rounded-[2.5rem] text-center animate-bounce">
            <span className="block text-[10px] uppercase font-bold">Optimized Timeframe</span>
            <span className="text-5xl font-black italic">{prediction}</span>
          </div>
        )}
      </div>
    </main>
  );
}