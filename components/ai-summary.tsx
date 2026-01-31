"use client";
import { useState, useEffect } from 'react';

export default function AISummary() {
  const [text, setText] = useState("");
  const fullText = "SYSTEM STATUS: BILINGUAL ENGINE ACTIVE. // ANALYZING VOCATIONAL MAPPING... // CURRENT EFFICIENCY GAIN: +18%. // BILINGUAL FRICTION DETECTED IN 'HYDRAULIC' SECTOR. // OPTIMIZING PATHS...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black p-6 rounded-3xl border border-emerald-500/30 font-mono mb-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Cobel AI Intelligence</span>
      </div>
      <p className="text-emerald-400 text-xs leading-relaxed lowercase">
        <span className="opacity-50">{">"}</span> {text}
        <span className="animate-ping">_</span>
      </p>
    </div>
  );
}