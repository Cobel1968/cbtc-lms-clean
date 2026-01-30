'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BarChart3, Clock, Zap, Users, Activity, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function TrainerFrictionReport() {
  const [stats, setStats] = useState({ totalHoursSaved: 0, totalAssessments: 0, avgFluency: 0 });
  const [activities, setActivities] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const supabase = createClient();

  // Cloud-hosted logo URL for stability
  const logoUrl = "https://rvlcpygatguvxhuliand.supabase.co/storage/v1/object/public/assets/cobel-logo.png";

  // PDF Export Logic
  const downloadPDF = async () => {
    const element = document.getElementById('report-container');
    if (!element) return;
    
    setIsExporting(true);
    // useCORS: true is critical now that the logo is on Supabase storage
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Cobel-Efficiency-Report-${new Date().toISOString().split('T')[0]}.pdf`);
    setIsExporting(false);
  };

  useEffect(() => {
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
        setActivities(data.slice(0, 5));
      }
    }

    fetchStats();

    const channel = supabase
      .channel('realtime-assessments')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'vocational_assessments' }, 
        (payload) => {
          setActivities((prev) => [payload.new, ...prev].slice(0, 5));
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
      {/* Target for PDF Export */}
      <div id="report-container" className="space-y-8 bg-gray-50 p-4">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
               <img 
                 src={logoUrl}
                 alt="Cobel Logo" 
                 className="h-14 w-auto object-contain" 
                 crossOrigin="anonymous"
                 onError={(e) => { 
                   (e.target as HTMLImageElement).src = logoUrl; 
                 }}
               />
            </div>
            <div>
              <h1 className="text-3xl font-black text-blue-950 tracking-tight">Trainer Friction Report</h1>
              <p className="text-gray-500 font-medium text-sm italic">Innovation Type: Computer-Implemented Pedagogical Logic</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={downloadPDF}
              disabled={isExporting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
            >
              {isExporting ? 'Generating...' : <><Download size={18} /> Export PDF</>}
            </button>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-green-200">
              <Activity size={14} className="animate-pulse" /> AI Engine Live
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Manual Labor Saved" value={`${stats.totalHoursSaved}h`} icon={<Clock className="text-blue-600" />} sub="Reclaimed Trainer Hours" />
          <StatCard title="Automated Milestones" value={stats.totalAssessments.toString()} icon={<Zap className="text-amber-500" />} sub="Bridges Ingested" />
          <StatCard title="Technical Mastery" value={`${stats.avgFluency}%`} icon={<Users className="text-indigo-600" />} sub="Bilingual Proficiency Avg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
              <BarChart3 size={20} className="text-blue-600" /> Temporal Optimization Phase
            </h3>
            <p className="text-sm text-gray-500 mb-8">Visualizing the <strong>Automated Milestone Forecasting</strong> logic across the training center.</p>
            <div className="h-72 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
               <BarChart3 size={48} className="text-slate-200 mb-3" />
               <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Proprietary Optimization Mapping</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-800">
              <Activity size={20} className="text-green-500" /> Live Pedagogical Feed
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {activities.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm italic">Waiting for submissions...</div>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 border-l-4 border-l-blue-600">
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
    </div>
  );
}

function StatCard({ title, value, icon, sub }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
      </div>
      <div className="text-4xl font-black text-blue-950 tracking-tighter">{value}</div>
      <div className="text-[10px] text-blue-600 font-black uppercase tracking-tight">{sub}</div>
    </div>
  );
}
