'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BarChart3, Clock, Zap, Users } from 'lucide-react';

export default function TrainerFrictionReport() {
  const [stats, setStats] = useState({ totalHoursSaved: 0, totalAssessments: 0, avgFluency: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from('vocational_assessments')
        .select('suggest_timeframe_adjustment, bilingual_fluency_score');

      if (data) {
        const totalMinutes = data.reduce((acc, curr) => acc + (curr.suggest_timeframe_adjustment || 0), 0);
        const totalScore = data.reduce((acc, curr) => acc + (curr.bilingual_fluency_score || 0), 0);
        
        setStats({
          totalHoursSaved: Math.round(totalMinutes / 60),
          totalAssessments: data.length,
          avgFluency: data.length > 0 ? Math.round(totalScore / data.length) : 0
        });
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Trainer Friction & Efficiency Report</h1>
        <p className="text-gray-500 italic">Measuring pedagogical time-waste reduction via Cobel AI Engine</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Manual Labor Saved" 
          value={`${stats.totalHoursSaved} Hours`} 
          icon={<Clock className="text-blue-600" />} 
          sub="Equivalent to ~2 full work weeks"
        />
        <StatCard 
          title="Automated Milestones" 
          value={stats.totalAssessments.toString()} 
          icon={<Zap className="text-yellow-500" />} 
          sub="Assessments processed via OCR"
        />
        <StatCard 
          title="Avg. Bilingual Fluency" 
          value={`${stats.avgFluency}%`} 
          icon={<Users className="text-purple-600" />} 
          sub="Technical term mastery rate"
        />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Innovation Impact: Timeframe Adjustments
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          This chart visualizes the <strong>Temporal Optimization</strong> phase, showing how much time was reclaimed for trainers by automating the handwriting analysis and digital ingestion.
        </p>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed">
          {/* Integration point for a chart library like Chart.js or Recharts */}
          <span className="text-gray-400">Live Optimization Chart Loading...</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, sub }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-500 uppercase">{title}</span>
        {icon}
      </div>
      <div className="text-4xl font-black text-gray-900">{value}</div>
      <div className="text-xs text-blue-600 font-medium">{sub}</div>
    </div>
  );
}