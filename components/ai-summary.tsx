"use client";
import { useState, useEffect } from 'react';

export default function AISummary() {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');
  const [text, setText] = useState("");
  
  const reports = {
    EN: "SYSTEM STATUS: ACTIVE. // ANALYZING VOCATIONAL MAPPING... // EFFICIENCY GAIN: +18%. // BILINGUAL FRICTION DETECTED IN 'HYDRAULIC' SECTOR. // OPTIMIZING PATHS...",
    FR: "STATUT DU SYSTÈME: ACTIF. // ANALYSE DE LA CARTOGRAPHIE... // GAIN D'EFFICACITÉ: +18%. // FRICTION BILINGUE DÉTECTÉE DANS LE SECTEUR 'HYDRAULIQUE'. // OPTIMISATION DES PARCOURS..."
  };

  useEffect(() => {
    let i = 0;
    setText(""); // Reset text on toggle
    const interval = setInterval(() => {
      setText(reports[lang].slice(0, i));
      i++;
      if (i > reports[lang].length) clearInterval(interval);
    }, 30).
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div className="bg-black p-6 rounded-[2rem] border border-emerald-500/20 font-mono mb-10 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Cobel AI Intelligence</span>
        </div>
        
        {/* Responsive Bilingual Toggle */}
        <div className="flex bg-white/10 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setLang('EN')}
            className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${lang === 'EN' ? 'bg-[#10B981] text-white' : 'text-white/40'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('FR')}
            className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${lang === 'FR' ? 'bg-[#10B981] text-white' : 'text-white/40'}`}
          >
            FR
          </button>
        </div>
      </div>

      <p className="text-emerald-400 text-xs leading-relaxed lowercase h-12">
        <span className="opacity-30">{">"}</span> {text}
        <span className="animate-ping inline-block w-1 h-3 bg-emerald-400 ml-1" />
      </p>
    </div>
  );
}