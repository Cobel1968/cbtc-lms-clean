'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Activity, FileText, Clock, Languages, Search , AlertCircle} from 'lucide-react';

export default function DiagnosticTool() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      const { data } = await supabase
        .from('vocational_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setAssessments(data);
      setLoading(false);
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
            <p className="text-gray-500">Feature 4: Analog-to-Digital Integrity Check</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium">
            Total Ingestions: {assessments.length}
          </div>
        </header>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid gap-6">
            {assessments.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <FileText className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-gray-400">ID: {item.id.slice(0,8)}</div>
                        <div className="font-bold text-gray-900">User: {item.user_id.slice(0,8)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.bilingual_fluency_score > 0.7 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Fluency: {(item.bilingual_fluency_score * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1 italic">
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                    {/* Phase 1: Raw Ingestion */}
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1">
                        <Search size={14} /> Raw OCR Text
                      </h4>
                      <p className="text-sm text-gray-600 italic">"{item.raw_ocr_text}"</p>
                    </div>

                    {/* Phase 2: Bilingual Mapping */}
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1">
                        <Languages size={14} /> Technical Terms
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.detected_technical_terms_en?.map((t: string) => (
                          <span key={t} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">EN: {t}</span>
                        ))}
                        {item.detected_technical_terms_fr?.map((t: string) => (
                          <span key={t} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">FR: {t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Phase 3: Temporal Adjustment */}
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1">
                        <Clock size={14} /> Path Adjustment
                      </h4>
                      <div className="text-xl font-black text-blue-600">
                        {item.suggested_timeframe_adjustment} Jours
                      </div>
                      <div className="text-[10px] text-gray-400">Impact on Graduation Forecast</div>
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




