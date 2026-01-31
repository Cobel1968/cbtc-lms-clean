'use client';

export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity, FileText, Clock, Languages, Search } from 'lucide-react';

export default function DiagnosticClient() {
  const [assessments, setAssessments] = useState<any[]>([]); // FIXED: PascalCase setter
  const [isLoading, setIsLoading] = useState(true); // FIXED: PascalCase setter

  useEffect(() => {
    async function fetchAssessments() {
      const { data, error } = await supabase
        .from('vocational_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setAssessments(data);
      setIsLoading(false);
    }
    fetchAssessments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-blue-600" />
              Cobel AI Engine Diagnostic
            </h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Feature 4: Analog-to-Digital Integrity Check
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-sm font-bold text-blue-600">
            Total Ingestions: {assessments.length}
          </div>
        </header>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid gap-6">
            {assessments.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <FileText className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                          ID: {item.id.slice(0, 8)}
                        </div>
                        <div className="font-bold text-gray-900">
                          Student Ref: {item.user_id?.slice(0, 8) || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        (item.bilingual_fluency_score || 0) > 0.7 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        Fluency: {((item.bilingual_fluency_score || 0) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-50">
                    <div>
                      <h4 className="text-[10px] uppercase font-black text-gray-400 mb-3 flex items-center gap-1">
                        <Search size={12} /> Raw OCR Ingestion
                      </h4>
                      {/* FIXED: Using &quot; to prevent build errors */}
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        &quot;{item.raw_ocr_text || 'No text extracted'}&quot;
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase font-black text-gray-400 mb-3 flex items-center gap-1">
                        <Languages size={12} /> Vocational Mapping
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.detected_technical_terms_en?.map((t: string) => (
                          <span key={t} className="bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase">EN: {t}</span>
                        ))}
                        {item.detected_technical_terms_fr?.map((t: string) => (
                          <span key={t} className="bg-indigo-500 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase">FR: {t}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase font-black text-gray-400 mb-3 flex items-center gap-1">
                        <Clock size={12} /> Adaptive Adjustment
                      </h4>
                      <div className="text-2xl font-black text-blue-600">
                        {item.suggested_timeframe_adjustment > 0 ? '+' : ''}
                        {item.suggested_timeframe_adjustment} Jours
                      </div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                        Temporal Optimization Applied
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
