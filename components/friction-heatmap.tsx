"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function FrictionHeatmap() {
  const [terms, setTerms] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function aggregateFriction() {
      const { data } = await supabase.from('profiles').select('technical_lexicon');
      if (data) {
        // Flatten all lexicons and count occurrences of "low fluency" terms
        const flatTerms = data.flatMap(p => p.technical_lexicon || []);
        const frictionMap = flatTerms.reduce((acc: any, term: any) => {
          acc[term.word] = (acc[term.word] || 0) + (term.friction_score || 1);
          return acc;
        }, {});
        
        const sorted = Object.entries(frictionMap)
          .map(([word, score]) => ({ word, score: score as number }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 12);
        
        setTerms(sorted);
      }
    }
    aggregateFriction();
  }, []);

  return (
    <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Bilingual Friction Audit</h3>
          <p className="text-2xl font-black uppercase tracking-tighter italic">Terminological Bottlenecks</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {terms.map((t, i) => (
          <div 
            key={i}
            className="px-4 py-2 rounded-full border transition-all hover:scale-110 cursor-help"
            style={{ 
              backgroundColor: `rgba(239, 68, 68, ${Math.min(t.score / 10, 0.4)})`,
              borderColor: `rgba(239, 68, 68, ${Math.min(t.score / 10, 0.8)})`,
              fontSize: `${Math.max(10, Math.min(24, 10 + t.score))}px`
            }}
          >
            <span className="font-black uppercase tracking-tighter">{t.word}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-8 text-[9px] font-medium opacity-30 uppercase tracking-widest text-center">
        Data synthesized from Analog-to-Digital Pedagogical Bridge [cite: 2026-01-01]
      </p>
    </div>
  );
}