'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Brain, ArrowRight } from 'lucide-react';

export default function DiagnosticPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This ensures browser-only logic doesn't run on the server
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-blue-500 font-black">INITIALIZING ENGINE...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-10 rounded-[3rem] text-center shadow-2xl">
        <div className="bg-blue-600/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Brain className="text-blue-500" size={40} />
        </div>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-4">AI Diagnostic</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-bold uppercase tracking-widest">
          Phased Diagnostic: Mapping Technical Fluency
        </p>
        <button className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
          Begin Assessment
        </button>
      </div>
    </div>
  );
}