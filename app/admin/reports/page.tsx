'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BarChart3, Clock, Zap, Users, Activity } from 'lucide-react';

export default function TrainerFrictionReport() {
  const [stats, setStats] = useState({ totalHoursSaved: 0, totalAssessments: 0, avgFluency: 0 });
  const [activities, setActivities] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // 1. Initial Stats Fetch (Innovation Impact Analytics)
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
          <div className="flex items-center gap-4 mb-2">
            {/* LOGO CACHE-BUSTER: Forcing refresh to bypass Vercel deployment cache */}
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
               <img 
                 src="/logo.png?v=2026-01-23" 
                 alt="Cobel Logo" 
                 className="h-14 w-auto object-contain" 
                 onError={(e) => {
                   // Fallback if the root path is still struggling
                   (e.target as HTMLImageElement).src = '/assets/logo.png';
                 }}
               />
            </div>
            <div>
              <h1 className="text-3xl font-black text-blue-950 tracking-tight">Trainer Friction Report</h1>
              <p className="text-gray-500 font-medium text-sm italic">Innovation Type: Computer-Implemented Pedagogical Logic</p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-green-200">
          <Activity size={14} className="animate-pulse" /> AI Engine Live
        </div>
      </header>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Manual Labor Saved" 
          value={`${stats.totalHoursSaved}h`} 
          icon={<Clock className="text-blue-600" />} 
          sub="Reclaimed Trainer Hours"
        />
        <StatCard 
          title="Automated Milestones" 
          value={stats.totalAssessments.toString()} 
          icon={<Zap className="text-amber-500" />} 
          sub="Bridges Ingested"
        />
        <StatCard 
          title="Technical Mastery" 
          value={`${stats.avgFluency}%`} 
          icon={<Users className="text-indigo-600" />} 
          sub="Bilingual Proficiency Avg"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Visualization Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
            <BarChart3 size={20} className="text-blue-600" /> Temporal Optimization Phase
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            This visualizes the <strong>Automated Milestone Forecasting</strong>. The engine adjusts the student curriculum density based on analog assessments.
          </p>
          
          <div className="h-72 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
             <div className="absolute inset-0 opacity-5 pointer-events-none">
                {/* Visual texture representing grid lines */}
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '20px 20px' }}></div>
             </div>
             <BarChart3 size={48} className="text-slate-300 mb-3" />
             <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Proprietary Optimization Mapping</span>
          </div>
        </div>

        {/* Real-Time Activity Feed */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-800">
            <Activity size={20} className="text-green-500" /> Live Pedagogical Feed
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {activities.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm italic">Waiting for student submissions...</div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:shadow-md hover:bg-white border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">A2D Bridge</span>
                    <span className="text-[10px] text-gray-400 font-mono">{new Date(act.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm font-black text-gray-900">{act.bilingual_fluency_score}% Fluency</p>
                  <p className="text-[11px] text-gray-500 mt-1 font-medium">Optimization: +{act.suggest_timeframe_adjustment} mins</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, sub }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3 transition-all hover:border-blue-200 group">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">{icon}</div>
      </div>
      <div className="text-4xl font-black text-blue-950 tracking-tighter">{value}</div>
      <div className="text-[10px] text-blue-600 font-black uppercase tracking-tight">{sub}</div>
    </div>
  );
}