'use client';
export const dynamic = 'force-dynamic';
import React from 'react';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Initializing Onboarding</h1>
        <p className="text-slate-400">Setting up your Adaptive Learning Path...</p>
      </div>
    </div>
  );
}