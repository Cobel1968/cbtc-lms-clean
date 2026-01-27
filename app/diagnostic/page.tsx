'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Brain, CheckCircle, Clock } from 'lucide-react';

export default function DiagnosticPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleCompleteDiagnostic = async () => {
    setIsSubmitting(true);
    
    // Logic for Temporal Optimization / Curriculum Density
    // Mock data: In a real scenario, these values come from user answers
    const diagnosticData = {
      gap_analysis: { technical_vocabulary: 'low', logic_flow: 'high' },
      suggested_density: 0.85,
      predicted_timeframe: '6 weeks'
    };

    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert([diagnosticData])
      .select();

    if (!error) {
      setPrediction(diagnosticData.predicted_timeframe);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl">
        {!prediction ? (
          <>
            <Brain className="text-blue-500 mb-6" size={48} />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Diagnostic Assessment</h1>
            <p className="text-slate-400 mb-8 text-sm">Analyze your technical fluency to generate your optimized path.</p>
            <button 
              onClick={handleCompleteDiagnostic}
              disabled={isSubmitting}
              className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all"
            >
              {isSubmitting ? 'Processing Algorithm...' : 'Calculate My Path'}
            </button>
          </>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
            <h2 className="text-2xl font-black uppercase mb-2">Optimization Ready</h2>
            <div className="bg-slate-800 p-6 rounded-2xl mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                <Clock size={20} />
                <span className="font-bold uppercase tracking-widest text-xs">Predicted Timeframe</span>
              </div>
              <span className="text-4xl font-black italic">{prediction}</span>
            </div>
            <p className="text-slate-400 text-sm italic">Curriculum density adjusted to 85% efficiency.</p>
          </div>
        )}
      </div>
    </div>
  );
}