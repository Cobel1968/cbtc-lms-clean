'use client';
import React from 'react';
import { BrandingVisual } from './BrandingVisual';
import Link from 'next/link';
import { Zap, ShieldCheck, Globe } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-slate-950 overflow-hidden py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Zap size={16} className="text-blue-500" />
            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Now Live in Abidjan</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
            Master Your Craft <br /> 
            <span className="text-blue-600">Faster Than Ever.</span>
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 max-w-lg font-medium leading-relaxed">
            The Cobel AI Engine uses adaptive logic and bilingual technical mapping to shave weeks off your vocational training.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/onboarding" className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-sm transition-all text-center shadow-xl shadow-blue-600/20">
              Start Your Journey
            </Link>
            <Link href="/about" className="bg-slate-900 border border-slate-800 text-white font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-sm hover:bg-slate-800 transition-all text-center">
              Our Methodology
            </Link>
          </div>

          <div className="flex items-center gap-8 border-t border-slate-900 pt-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-500" size={20} />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">AI Verified<br/>Certification</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-blue-500" size={20} />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Bilingual Technical<br/>Fluency (EN/FR)</span>
            </div>
          </div>
        </div>

        {/* Branding Image */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
            <BrandingVisual />
          </div>
        </div>

      </div>
    </section>
  );
}

