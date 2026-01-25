'use client';
import { Clock, Zap, Calendar } from 'lucide-react';
import { calculateOptimizedPath } from '@/lib/pathMappingEngine';

interface Props {
  baseWeeks: number;
  currentFluency: number;
}

export default function PathProjectionCard({ baseWeeks, currentFluency }: Props) {
  const projection = calculateOptimizedPath(baseWeeks, currentFluency);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white p-6 rounded-2xl shadow-xl border border-blue-400/20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Zap className="text-yellow-400 fill-current" size={20} />
          Temporal Optimization
        </h3>
        <span className="text-[10px] bg-blue-500/30 px-2 py-1 rounded-full border border-blue-400/50 uppercase">
          AI Engine Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 p-3 rounded-xl">
          <p className="text-blue-200 text-[10px] uppercase font-bold">Standard Path</p>
          <p className="text-xl font-bold">{projection.originalWeeks} Weeks</p>
        </div>
        <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30">
          <p className="text-green-300 text-[10px] uppercase font-bold">Cobel Optimized</p>
          <p className="text-xl font-bold text-green-400">{projection.optimizedWeeks} Weeks</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm bg-black/20 p-3 rounded-lg">
        <Clock className="text-yellow-400" size={18} />
        <span>
          You are saving <strong>{projection.timeSaved} weeks</strong> of training time!
        </span>
      </div>

      <div className="mt-4 text-[10px] text-blue-300 italic text-center">
        Based on Bilingual Technical Fluency of {(currentFluency * 100).toFixed(0)}%
      </div>
    </div>
  );
}