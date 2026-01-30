&apos;use client&apos;;
export const dynamic = &apos;force-dynamic&apos;;
import { useEffect, useState } from &apos;react&apos;;
import { supabase } from &apos;@/lib/supabaseDB&apos;;
import { Activity, FileText, Clock, Languages, Search , AlertCircle} from &apos;lucide-react&apos;;

export default function DiagnosticTool() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      const { data } = await supabase
        .from(&apos;vocational_assessments&apos;)
        .select(&apos;*&apos;)
        .order(&apos;created_at&apos;, { ascending: false });
      
      if (data) setAssessments(data);
      setLoading(false);
    }
    fetchAssessments();
  }, []);

  return (
    <div className=&quot;min-h-screen bg-gray-50 p-8&quot;>
      <div className=&quot;max-w-6xl mx-auto&quot;>
        <header className=&quot;mb-8 flex justify-between items-center&quot;>
          <div>
            <h1 className=&quot;text-2xl font-bold text-gray-900 flex items-center gap-2&quot;>
              <Activity className=&quot;text-blue-600&quot; />
              Cobel AI Engine Diagnostic
            </h1>
            <p className=&quot;text-gray-500&quot;>Feature 4: Analog-to-Digital Integrity Check</p>
          </div>
          <div className=&quot;bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium&quot;>
            Total Ingestions: {assessments.length}
          </div>
        </header>

        {loading ? (
          <div className=&quot;animate-pulse space-y-4&quot;>
            {[1, 2, 3].map(i => <div key={i} className=&quot;h-24 bg-gray-200 rounded-xl&quot; />)}
          </div>
        ) : (
          <div className=&quot;grid gap-6&quot;>
            {assessments.map((item) => (
              <div key={item.id} className=&quot;bg-white rounded-xl shadow-sm border overflow-hidden&quot;>
                <div className=&quot;p-6&quot;>
                  <div className=&quot;flex justify-between items-start mb-4&quot;>
                    <div className=&quot;flex gap-4 items-center&quot;>
                      <div className=&quot;bg-blue-50 p-3 rounded-lg&quot;>
                        <FileText className=&quot;text-blue-600&quot; size={24} />
                      </div>
                      <div>
                        <div className=&quot;text-sm font-mono text-gray-400&quot;>ID: {item.id.slice(0,8)}</div>
                        <div className=&quot;font-bold text-gray-900&quot;>User: {item.user_id.slice(0,8)}</div>
                      </div>
                    </div>
                    <div className=&quot;text-right&quot;>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.bilingual_fluency_score > 0.7 ? &apos;bg-green-100 text-green-700&apos; : &apos;bg-yellow-100 text-yellow-700&apos;
                      }`}>
                        Fluency: {(item.bilingual_fluency_score * 100).toFixed(0)}%
                      </div>
                      <div className=&quot;text-xs text-gray-500 mt-1 italic&quot;>
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className=&quot;grid md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100&quot;>
                    {/* Phase 1: Raw Ingestion */}
                    <div>
                      <h4 className=&quot;text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1&quot;>
                        <Search size={14} /> Raw OCR Text
                      </h4>
                      <p className=&quot;text-sm text-gray-600 italic&quot;>&quot;{item.raw_ocr_text}&quot;</p>
                    </div>

                    {/* Phase 2: Bilingual Mapping */}
                    <div>
                      <h4 className=&quot;text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1&quot;>
                        <Languages size={14} /> Technical Terms
                      </h4>
                      <div className=&quot;flex flex-wrap gap-1&quot;>
                        {item.detected_technical_terms_en?.map((t: string) => (
                          <span key={t} className=&quot;bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold&quot;>EN: {t}</span>
                        ))}
                        {item.detected_technical_terms_fr?.map((t: string) => (
                          <span key={t} className=&quot;bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold&quot;>FR: {t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Phase 3: Temporal Adjustment */}
                    <div>
                      <h4 className=&quot;text-xs uppercase font-bold text-gray-400 mb-2 flex items-center gap-1&quot;>
                        <Clock size={14} /> Path Adjustment
                      </h4>
                      <div className=&quot;text-xl font-black text-blue-600&quot;>
                        {item.suggested_timeframe_adjustment} Jours
                      </div>
                      <div className=&quot;text-[10px] text-gray-400&quot;>Impact on Graduation Forecast</div>
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




