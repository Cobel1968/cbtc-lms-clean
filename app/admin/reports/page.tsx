'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BarChart3, Clock, Zap, Users, Activity } from 'lucide-react';

export default function TrainerFrictionReport() {
  const [stats, setStats] = useState({ totalHoursSaved: 0, totalAssessments: 0, avgFluency: 0 });
  const [activities, setActivities] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // 1. Initial Stats Fetch
    async function fetchStats() {
      const { data } = await supabase
        .from('vocational_assessments')
        .select('suggest_timeframe_adjustment, bilingual_fluency_score, created_at')
        .order('created_at', { ascending: false });

      if (data) {
        const totalMinutes = data.reduce((acc, curr) => acc + (curr.suggest_timeframe_adjustment || 0), 0);
        const totalScore = data.reduce((acc, curr) => acc + (curr.bilingual_fluency_score || 0), 0);
        
        setStats({
          totalHoursSaved: Math.round(totalMinutes / 60),
          totalAssessments: data.length,
          avgFluency: data.length > 0 ? Math.round(totalScore / data.length) : 0
        });
        setActivities(data.slice(0, 5)); // Show last 5 assessments
      }
    }

    fetchStats();

    // 2. Real-Time Subscription (Feature 4 Live Monitoring)
    const channel = supabase
      .channel('realtime-assessments')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'vocational_assessments' }, 
        (payload) => {
          setActivities((prev) => [payload.new, ...prev].slice(0, 5));
          // Update total count and hours on the fly
          setStats(prev => ({
            ...prev,
            totalAssessments: prev.totalAssessments + 1,
            totalHoursSaved: prev.totalHoursSaved + Math.round((payload.new.suggest_timeframe_adjustment || 0) / 60)
          }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {/* LOGO CACHE-BUSTER: Forcing refresh with ?v=1 */}
            <img src="/logo.png?v=1" alt="Cobel Logo" className="h-12 w-auto object-contain" />
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-blue-900">Trainer Friction Report</h1>
          </div>
          <p className="text-gray-500 font-medium italic">Innovation Impact: Measuring pedagogical time-waste reduction</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
          <Activity size={14} /> System Live
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Manual Labor Saved" 
          value={`${stats.totalHoursSaved} Hours`} 
          icon={<Clock className="text-blue-600" />} 
          sub="Reclaimed Trainer Time"
        />
        <StatCard 
          title="Automated Milestones" 
          value={stats.totalAssessments.toString()} 
          icon={<Zap className="text-yellow-500" />} 
          sub="OCR Ingestions Completed"
        />
        <StatCard 
          title="Avg. Technical Mastery" 
          value={`${stats.avgFluency}%`} 
          icon={<Users className="text-purple-600" />} 
          sub="Bilingual Proficiency Rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" /> Innovation Impact: Temporal Optimization
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Visualizing the <strong>Automated Milestone Forecasting</strong> logic.
          </p>
          <div className="h-64 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
            <BarChart3 size={48} className="text-slate-200 mb-2" />
            <span className="text-slate-400 font-medium">Real-time Data Visualization Active</span>
          </div>
        </div>

        {/* Real-Time Activity Feed */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Activity size={20} className="text-green-600" /> Live Pedagogical Feed
          </h3>
          <div className="space-y-4">
            {activities.length === 0 && <p className="text-sm text-gray-400 italic">No recent assessments...</p>}
            {activities.map((act) => (
              <div key={act.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-blue-50">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Assessment Ingested</span>
                  <span className="text-[10px] text-gray-400">{new Date(act.created_at).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{act.bilingual_fluency_score}% Fluency Detected</p>
                <p className="text-[11px] text-gray-500">+{act.suggest_timeframe_adjustment} mins saved</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, sub }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <div className="text-4xl font-black text-gray-900 tracking-tighter">{value}</div>
      <div className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">{sub}</div>
    </div>
  );
}