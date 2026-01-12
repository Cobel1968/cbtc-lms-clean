'use client';

import React, { useMemo } from 'react';
import { Calendar, Clock, TrendingUp, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import bilingualtext from '@/components/bilingualtext'; // Standard lowercase path

interface GraduationPredictorProps {
  diagnostic_score: number;
  fluency_score: number;
  start_date: string;
}

/**
 * FEATURE 3: Automated Milestone Forecasting
 * Component: GraduationPredictor (PascalCase)
 * File: graduationpredictor.tsx (lowercase)
 */
export default function GraduationPredictor({ 
  diagnostic_score, 
  fluency_score, 
  start_date 
}: GraduationPredictorProps) {
  
  // COBEL ENGINE: Temporal Optimization Logic
  const forecast = useMemo(() => {
    const base_days = 90; // Standard curriculum length for Abidjan centers
    
    // Density logic: Lower fluency increases the "Curriculum Density" (time multiplier)
    const density_multiplier = 1 + ((100 - fluency_score) / 100);
    const predicted_days = Math.ceil(base_days * density_multiplier);
    
    const start = new Date(start_date);
    const graduation = new Date(start);
    graduation.setDate(start.getDate() + predicted_days);

    return {
      density: density_multiplier.toFixed(2),
      days_total: predicted_days,
      date_string: graduation.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      is_on_track: fluency_score >= 60
    };
  }, [fluency_score, start_date]);

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
            <bilingualtext text={{ fr: "Optimisation Temporelle", en: "Temporal Optimization" }} />
          </h3>
          <p className="text-2xl font-black text-slate-900 italic tracking-tight">
            {forecast.date_string}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
          <TrendingUp size={14} className="text-indigo-600" />
          <span className="text-indigo-600 text-xs font-bold">{forecast.density}x Density</span>
        </div>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Initial Knowledge Gap */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Calendar size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Diagnostic</span>
          </div>
          <p className="text-lg font-black text-slate-900">{diagnostic_score}%</p>
        </div>

        {/* Metric 2: Adjusted Duration */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Duration</span>
          </div>
          <p className="text-lg font-black text-slate-900">{forecast.days_total} Days</p>
        </div>

        {/* Metric 3: Technical Fluency */}
        <div className={`p-4 rounded-2xl text-white transition-colors duration-500 ${forecast.is_on_track ? 'bg-indigo-600 shadow-indigo-100 shadow-lg' : 'bg-slate-800'}`}>
          <div className="flex items-center gap-2 mb-2 opacity-60">
            <Zap size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Fluency</span>
          </div>
          <p className="text-lg font-black">{fluency_score}%</p>
        </div>
      </div>
      
      {/* Milestone Indicator Gate */}
      <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <div className="flex items-center gap-3">
          {forecast.is_on_track ? (
            <CheckCircle2 className="text-green-500" size={18} />
          ) : (
            <AlertCircle className="text-amber-500 animate-pulse" size={18} />
          )}
          <span className="text-[11px] font-bold text-slate-600 lowercase tracking-tight">
            <bilingualtext 
              text={{ 
                fr: forecast.is_on_track ? "Seuil de fluence technique atteint." : "Seuil de fluence requis: 60%.", 
                en: forecast.is_on_track ? "Technical fluency threshold met." : "Technical threshold required: 60%." 
              }} 
            />
          </span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-slate-400 italic">
        * <bilingualtext 
            text={{ 
              fr: "CalculÃ© dynamiquement via le Cobel AI Engine.", 
              en: "Dynamically calculated via the Cobel AI Engine." 
            }} 
          />
      </p>
    </div>
  );
}