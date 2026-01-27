'use client';
import React from 'react';
import { Trophy, Clock, ArrowUpRight } from 'lucide-react';

export const MilestoneNotification = ({ score, densityBoost, timeSaved }: { score: number, densityBoost: number, timeSaved: string }) => {
  return (
    <div className="fixed bottom-10 right-10 max-w-sm bg-slate-900 border-2 border-blue-500 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-right-10 duration-500 z-50">
      <div className="flex items-start gap-4">
        <div className="bg-blue-500 p-3 rounded-2xl">
          <Trophy className="text-white" size={24} />
        </div>
        <div>
          <h4 className="text-white font-black uppercase italic tracking-tighter text-lg">Milestone Reached!</h4>
          <p className="text-slate-400 text-xs mb-4">Cobel AI Engine has updated your profile.</p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="block text-[10px] text-blue-400 font-bold uppercase">Technical Score</span>
              <span className="text-xl font-black text-white">{score}%</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="block text-[10px] text-green-400 font-bold uppercase">Density Boost</span>
              <span className="text-xl font-black text-white">+{densityBoost}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm bg-blue-500/10 p-2 rounded-lg">
            <Clock size={16} />
            <span>Timeframe Prediction: -{timeSaved}</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneNotification;
