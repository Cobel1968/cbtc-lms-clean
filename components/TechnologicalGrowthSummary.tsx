'use client';
import { useEffect, useState } from 'react';
import { TrendingUp, Award, Globe } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TechnicalGrowthSummary() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      const { data, error } = await supabase
        .from('student_assessments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) setAssessments(data);
      setLoading(false);
    }
    fetchAssessments();
  }, []);

  if (loading) return <div className="animate-pulse text-sm text-blue-500">Calculating Path Mapping...</div>;
  if (assessments.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-green-500" size={24} />
        <h3 className="font-bold text-gray-800 text-lg">Bilingual Technical Growth</h3>
      </div>

      <div className="space-y-4">
        {assessments.map((record) => (
          <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe size={14} className="text-blue-400" />
                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  {record.language === 'fr' ? 'Technical French' : 'Technical English'}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {record.terms_extracted?.slice(0, 3).join(', ')}...
              </p>
            </div>
            <div className="text-right">
              <span className="block text-lg font-bold text-blue-600">{(record.fluency_score * 100).toFixed(0)}%</span>
              <span className="text-[10px] text-gray-400 uppercase font-medium">Fluency Score</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-dashed flex justify-between items-center text-xs">
        <span className="text-gray-500 italic">Temporal Optimization: Active</span>
        <div className="flex items-center gap-1 text-blue-600 font-bold">
          <Award size={14} />
          <span>Curriculum Density Adjusted</span>
        </div>
      </div>
    </div>
  );
}