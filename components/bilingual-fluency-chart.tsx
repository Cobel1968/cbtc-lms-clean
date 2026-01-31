"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BilingualFluencyChart({ studentId }: { studentId: string }) {
  const [data, setData] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: profile } = await supabase
        .from('profiles')
        .select('bilingual_technical_fluency, technical_lexicon, technical_fluency')
        .eq('id', studentId)
        .single();
      if (profile) setData(profile);
    }
    fetchData();
  }, [studentId]);

  if (!data) return null;

  // Calculate language split from the technical_lexicon JSON [cite: 2026-01-01]
  const lexicon = data.technical_lexicon || [];
  const enCount = lexicon.filter((item: any) => item.lang === 'EN').length;
  const frCount = lexicon.filter((item: any) => item.lang === 'FR').length;
  const total = enCount + frCount || 1;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Bilingual Vocational Mapping</h4>
        <span className="text-[10px] font-bold opacity-40">{enCount + frCount} Terms Mapped</span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase">
            <span>English</span>
            <span>{Math.round((enCount / total) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${(enCount / total) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase">
            <span>Français</span>
            <span>{Math.round((frCount / total) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(frCount / total) * 100}%` }} />
          </div>
        </div>
      </div>

      <p className="mt-6 text-[9px] leading-relaxed opacity-40 font-medium italic">
        "Adaptive HTML Injection and OCR pre-processing are optimizing current curriculum density based on these linguistic ratios."
      </p>
    </div>
  );
}