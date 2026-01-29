'use client';
import React from 'react';

export default function TrainerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Trainer Access</h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Secure Oversight Portal</p>
        
        <form className="space-y-6">
          {/* Visually hidden username field for Accessibility/DOM compliance */}
          <input 
            type="text" 
            name="username" 
            defaultValue="trainer_admin" 
            className="hidden" 
            autoComplete="username" 
          />
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Security Key</label>
            <input 
              type="password" 
              name="password"
              placeholder="" 
              autoComplete="current-password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20">
            Authorize Session
          </button>
        </form>
      </div>
    </div>
  );
}