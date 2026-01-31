'use client';
import React from 'react';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-8">About Cobel BTC</h1>
        <p className="text-slate-400 leading-relaxed">
          The Cobel Business Training Center (LMS) implements adaptive learning algorithms 
          to solve knowledge gaps and bilingual technical friction.
        </p>
      </div>
    </main>
  );
}