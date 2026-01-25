'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { Lock, Unlock, ArrowRight, Award, ShieldCheck } from 'lucide-react';
import BilingualText from '@/components/bilingualtext';

interface FinalAssessmentProps {
  course: {
    title: string;
  };
  pre_test: {
    score: number;
  } | null;
  enrollment_id: string;
  on_take_test: () => void;
}

/**
 * FEATURE 3 & 4: Temporal Optimization Gate
 * Verified PascalCase component name and lowercase filename for Vercel.
 */
export default function FinalAssessment({ 
  course, 
  pre_test, 
  on_take_test 
}: FinalAssessmentProps) {
  
  // Logic: The gate unlocks at 60% Technical Fluency
  const technical_score = pre_test?.score || 0;
  const is_locked = technical_score < 60;

  return (
    <div className={`relative overflow-hidden rounded-[32px] p-8 border transition-all duration-700 ${
      is_locked 
        ? 'bg-slate-50 border-slate-200 shadow-inner' 
        : 'bg-white border-indigo-100 shadow-xl shadow-indigo-50'
    }`}>
      
      {/* Decorative Watermark */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none rotate-12">
        <ShieldCheck size={180} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl transition-colors ${is_locked ? 'bg-slate-200 text-slate-500' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'}`}>
            {is_locked ? <Lock size={24} /> : <Unlock size={24} />}
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/60 leading-none mb-1">
              <BilingualText text={{ fr: "Certification Finale", en: "Final Certification" }} />
            </h3>
            <p className="text-xl font-black text-slate-900 tracking-tight italic uppercase">
              {course?.title || "Vocational Module"}
            </p>
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-8 max-w-md leading-relaxed font-medium">
          <BilingualText 
            text={{ 
              fr: is_locked 
                ? "Accès restreint. Le Cobel AI Engine exige une fluence technique de 60% (via analyse manuscrite) pour débloquer cet examen." 
                : "Seuil de fluence atteint ! Vous êtes maintenant autorisé Ã  passer l'examen de certification finale.",
              en: is_locked 
                ? "Access restricted. The Cobel AI Engine requires 60% technical fluency (via handwriting analysis) to unlock this exam." 
                : "Fluency threshold reached! You are now authorized to take the final certification exam."
            }} 
          />
        </p>

        {is_locked ? (
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-200 rounded-2xl text-slate-500 cursor-not-allowed font-bold text-xs uppercase tracking-widest">
              <BilingualText text={{ fr: "Examen Verrouillé", en: "Exam Locked" }} />
            </div>
            
            {/* Progress to Unlock */}
            <div className="max-w-[200px]">
              <div className="flex justify-between text-[9px] font-black uppercase mb-1 text-slate-400">
                <span>Progression</span>
                <span>{technical_score}% / 60%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-400 transition-all duration-1000"
                  style={{ width: `${Math.min((technical_score / 60) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={on_take_test}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:gap-6 shadow-xl"
          >
            <BilingualText text={{ fr: "Lancer l'Ã‰valuation", en: "Launch Assessment" }} />
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
