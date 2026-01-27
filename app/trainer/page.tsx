'use client';
import React from 'react';

export default function TrainerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
        <h2 className="text-2xl font-black uppercase mb-6">Trainer Access</h2>
        <form className="space-y-4">
          <input 
            type="password" 
            placeholder="Security Key" 
            autoComplete="current-password" 
            className="w-full bg-slate-800 border-none rounded-xl p-4 text-white"
          />
          <button className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
}