import React from 'react';

interface OptimizationProps {
  originalWeeks: number;
  optimizedWeeks: number;
  courseName: string;
}

export const OptimizationSuccess = ({ originalWeeks, optimizedWeeks, courseName }: OptimizationProps) => {
  const weeksSaved = originalWeeks - optimizedWeeks;

  if (weeksSaved <= 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Temporal Optimization Active
        </span>
        <div className="h-8 w-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-black mb-2">Congratulations!</h2>
      <p className="text-blue-100 text-sm leading-relaxed mb-6">
        Based on our <strong>Analog-to-Digital Handwriting Analysis</strong>, your technical fluency in 
        <span className="text-white font-bold"> {courseName}</span> is above average. 
        We have optimized your curriculum density.
      </p>

      <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl">
        <div className="text-center flex-1">
          <p className="text-[10px] uppercase opacity-60">Standard Path</p>
          <p className="text-xl font-bold line-through opacity-50">{originalWeeks} Weeks</p>
        </div>
        <div className="text-2xl font-black">â†’</div>
        <div className="text-center flex-1">
          <p className="text-[10px] uppercase text-green-300">Fast Track</p>
          <p className="text-3xl font-black text-green-400">{optimizedWeeks} Weeks</p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-center italic opacity-70">
        You have saved {weeksSaved} weeks of training time.
      </p>
    </div>
  );
};