import React from 'react';
import { Clock, Zap, Target } from 'lucide-react';

interface DiagnosticCardProps {
  studentName: string;
  originalTimeframe: number; // in weeks
  timeSavedDays: number;
  identifiedTerms: any[];
}

export const DiagnosticCard = ({ 
  studentName, 
  originalTimeframe, 
  timeSavedDays, 
  identifiedTerms 
}: DiagnosticCardProps) => {
  
  const optimizedWeeks = (originalTimeframe - (timeSavedDays / 5)).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Target className="text-blue-400 w-5 h-5" />
          Pedagogical Diagnostic: {studentName}
        </h3>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          AI Optimized
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Acceleration */}
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Zap className="text-blue-600 w-8 h-8 mb-2" />
          <span className="text-sm text-slate-500">Acceleration</span>
          <span className="text-2xl font-bold text-blue-700">-{timeSavedDays} Days</span>
        </div>

        {/* Metric 2: New Timeline */}
        <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-100">
          <Clock className="text-green-600 w-8 h-8 mb-2" />
          <span className="text-sm text-slate-500">New Timeline</span>
          <span className="text-2xl font-bold text-green-700">{optimizedWeeks} Weeks</span>
        </div>

        {/* Metric 3: Term Density */}
        <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
          <span className="text-2xl font-bold text-purple-700">{identifiedTerms.length}</span>
          <span className="text-sm text-slate-500">Technical Terms</span>
          <span className="text-xs text-purple-400 italic">Bilingual Mapping Active</span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
          Detected Technical Fluency
        </h4>
        <div className="flex flex-wrap gap-2">
          {identifiedTerms.map((term, index) => (
            <span key={index} className="bg-slate-100 border border-slate-300 px-3 py-1 rounded-md text-xs font-medium text-slate-600">
              {term.term_fr} → <span className="text-blue-600">{term.en}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};