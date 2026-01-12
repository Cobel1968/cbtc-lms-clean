'use client';

import { useState } from 'react';
import { UserCheck, Shield, Layers, Settings2, Fingerprint } from 'lucide-react';

export default function trainer_management() {
  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
          trainer configuration
        </h1>
        <p className="text-slate-500 font-medium">
          defining pedagogical authority & group access
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role Identity Card */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <UserCheck size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 italic">pedagogical lead</h2>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em]">authorized engine actor</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4">
                <Layers className="text-slate-400" size={20} />
                <span className="font-bold text-slate-700">assigned technical groups</span>
              </div>
              <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 border border-slate-200">
                group_a, group_b
              </span>
            </div>

            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4">
                <Fingerprint className="text-slate-400" size={20} />
                <span className="font-bold text-slate-700">handwriting bridge access</span>
              </div>
              <span className="text-emerald-500 font-black uppercase text-[10px]">enabled</span>
            </div>
          </div>
        </div>

        {/* Permission Settings Sidebar */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col justify-between border border-slate-800 shadow-2xl">
          <div className="space-y-8">
            <h3 className="flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] text-indigo-400">
              <Settings2 size={18} /> role permissions
            </h3>
            
            <ul className="space-y-4">
              {['view student path', 'upload assessments', 'modify timeline', 'export reports'].map((perm) => (
                <li key={perm} className="flex items-center gap-3 text-xs text-slate-400 italic">
                  <Shield size={12} className="text-indigo-500" />
                  {perm}
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-12 w-full py-4 bg-indigo-600 hover:bg-white hover:text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
            save configuration
          </button>
        </div>
      </div>
    </div>
  );
}