'use client';

import { Globe2, Terminal } from 'lucide-react';

interface Term {
  text: string;
  lang: 'en' | 'fr';
}

export default function TechnicalTermCloud({ terms }: { terms: Term[] }) {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-700">
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={14} className="text-indigo-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          extracted technical lexicon
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {terms.map((term, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all hover:scale-105 ${
              term.lang === 'fr' 
                ? 'bg-blue-50 border-blue-100 text-blue-600' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-600'
            }`}
          >
            <Globe2 size={10} className="opacity-50" />
            {term.text.toLowerCase()}
            <span className="text-[8px] opacity-40 uppercase tracking-tighter">{term.lang}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-[9px] text-slate-400 italic">
        *lexicon ingestion complete. curriculum density mapping updated.
      </p>
    </div>
  );
}
