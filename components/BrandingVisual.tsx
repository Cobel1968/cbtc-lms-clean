'use client';
import React from 'react';
import { Activity, Cpu, Zap, Globe } from 'lucide-react';

export const BrandingVisual = () => {
  return (
    <div className="relative w-full aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 flex flex-col p-8 shadow-2xl">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', size: '20px 20px' }}></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/40">
            <Cpu className="text-white" size={32} />
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest">Engine Status</span>
            <span className="text-white font-mono text-sm">OPTIMIZING...</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Bilingual Fluency (EN/FR)</span>
              <span className="text-[10px] text-blue-400 font-bold">98%</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[98%] shadow-[0_0_10px_#3b82f6]"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
               <Activity className="text-green-500 mb-2" size={16} />
               <span className="block text-[10px] text-slate-400 font-bold uppercase">Time Saved</span>
               <span className="text-xl font-black text-white italic">+30 DAYS</span>
            </div>
            <div className="bg-blue-600 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
               <Zap className="text-white mb-1" size={16} />
               <span className="text-[9px] text-blue-100 font-black uppercase tracking-tighter leading-tight">Adaptive Path Mapping</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
          <Globe size={14} className="text-slate-500" />
          <span className="text-[9px] text-slate-500 font-mono italic">Node: Abidjan_Autonomous_District_IV</span>
        </div>
      </div>
    </div>
  );
};
