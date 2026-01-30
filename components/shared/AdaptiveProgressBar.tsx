import React from 'react';

interface Props {
  density: number;
  progress: number; // 0 to 100
  forecastDate: string;
}

export default function AdaptiveProgressBar({ density, progress, forecastDate }: Props) {
  const getBarColor = () => {
    if (density <= 1.0) return 'bg-emerald-500';
    if (density <= 1.3) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full bg-slate-100 rounded-lg p-4 border border-slate-200">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase">AI Forecasted Completion</span>
          <p className="text-sm font-semibold text-slate-800">{forecastDate}</p>
        </div>
        <span className="text-xs font-bold text-slate-500">Density: {Math.round(density * 100)}%</span>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div 
          className={h-full transition-all duration-500 }
          style={{ width: ${progress}% }}
        />
      </div>
      
      {density > 1.0 && (
        <p className="text-[10px] text-amber-600 mt-2 font-medium">
           Learning path adapted: {Math.round((density - 1) * 100)}% additional depth required.
        </p>
      )}
    </div>
  );
}
