'use client'
import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export default function IELTSProgress({ currentBand, targetBand, density }) {
  const progressPercent = (currentBand / targetBand) * 100;
  const statusColor = density > 1.3 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />
          <h3 className="font-bold text-slate-800">IELTS Band Tracker</h3>
        </div>
        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">AI Predicted</span>
      </div>

      <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
        <div 
          className={h-full \ transition-all duration-1000} 
          style={{ width: \% }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 rounded-lg text-center">
          <p className="text-[10px] uppercase text-slate-500 font-bold">Current Band</p>
          <p className="text-2xl font-black text-slate-800">{currentBand}</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg text-center border border-indigo-100">
          <p className="text-[10px] uppercase text-indigo-500 font-bold">Target Band</p>
          <p className="text-2xl font-black text-indigo-900">{targetBand}</p>
        </div>
      </div>

      {density > 1.2 && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <TrendingUp className="text-amber-600 shrink-0" size={16} />
          <p className="text-[10px] text-amber-800">
            <strong>Friction Alert:</strong> High lexical gap detected. 
            Predicted timeline extended by {Math.round((density - 1) * 100)}% to reach target.
          </p>
        </div>
      )}
    </div>
  );
}
