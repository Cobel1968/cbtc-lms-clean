'use client'
import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';

export default function IELTSProgress({ currentBand, targetBand, density }) {
  const statusColor = density > 1.3 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />
          <span className="font-semibold text-slate-700">IELTS Progress</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}>
          Density: {density}x
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Current Band: {currentBand}</span>
          <span className="text-slate-400">Target: {targetBand}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${(currentBand / 9) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}