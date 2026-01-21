'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import dynamicImport from 'next/dynamic';
import { 
  Loader2, 
  Book, 
  GraduationCap, 
  Camera, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import supabase from '@/lib/supabaseClient';

// --- BUILD-SAFE DYNAMIC IMPORT ---
const MilestoneForecast = dynamicImport(() => import('@/components/MilestoneForecast'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-[40px]" />
});

export default function StudentDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({ minutes: 0, expected: 6000 });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_minutes_spent, vocational_track')
          .eq('id', user.id)
          .single();

        setUserData(user);
        if (profile) {
          setStats(prev => ({ 
            ...prev, 
            minutes: profile.total_minutes_spent || 0,
            track: profile.vocational_track || 'bilingual electrical engineering'
          }));
        }
      }
      setLoading(false);
    }
    fetchDashboardData();
  }, []);

  /**
   * Feature 4: Handwriting Ingestion Handler
   * Bridges physical assessments to digital technical fluency scores.
   */
  const handleHandwritingUpload = async () => {
    setIsUploading(true);
    
    try {
      // Logic Point: Ingestion via the OCR pre-processing API
      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: 'physical_assessment_01.jpg', 
          userId: userData?.id 
        })
      });

      const result = await response.json();

      if (result.success) {
        setUploadSuccess(true);
        // Temporal Optimization: Update local state to reflect the timeframe adjustment
        // result.data.adjustment_minutes (960) added to total mastery
        setStats(prev => ({ ...prev, minutes: prev.minutes + (result.data.adjustment_minutes || 960) }));
        
        // Success feedback loop
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    } catch (error) {
      // Rollback logic: dashboard state remains intact on failure
      console.error("[Cobel Engine] Ingestion failed. Triggering logic rollback.", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 lowercase">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900">
              student <span className="text-indigo-600">terminal</span>
            </h1>
            <p className="text-slate-500 font-bold tracking-tight">cobel ai engine: path mapping active</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <GraduationCap className="text-indigo-600" size={20} />
              <span className="font-black uppercase text-xs text-slate-700">{stats.minutes} mins mastery</span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* FEATURE 3: MILESTONE FORECAST (Dynamic Temporal Optimization) */}
            <MilestoneForecast 
              total_minutes_spent={stats.minutes} 
              expected_minutes={stats.expected} 
            />

            {/* FEATURE 4: ANALOG-TO-DIGITAL BRIDGE (Handwriting Upload) */}
            <div className={`bg-white border-2 border-dashed rounded-[40px] p-10 transition-all duration-500 ${uploadSuccess ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-indigo-600 shadow-sm'}`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className={`p-5 rounded-3xl transition-all duration-500 ${uploadSuccess ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {uploadSuccess ? <CheckCircle2 size={32} className="animate-in zoom-in" /> : <Camera size={32} />}
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter text-slate-900">
                      {uploadSuccess ? 'Assessment Synced' : 'Analog-to-Digital Bridge'}
                    </h3>
                    <p className="text-sm text-slate-400 font-bold leading-tight">
                      {uploadSuccess ? 'Bilingual technical terms extracted and integrated.' : 'Upload physical assessment for AI analysis.'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleHandwritingUpload}
                  disabled={isUploading}
                  className="w-full md:w-auto min-w-[200px] px-8 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-slate-200"
                >
                  {isUploading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      <FileText size={18} />
                      {uploadSuccess ? 'Sync Another' : 'Sync Physical Work'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="font-black uppercase text-[10px] text-slate-400 mb-4 flex items-center gap-2 tracking-widest">
                <Book size={14} /> current track
              </h3>
              <p className="text-xl font-bold uppercase tracking-tight text-slate-800 italic leading-tight">
                {stats.track || 'bilingual electrical engineering'}
              </p>
            </div>
            
            <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
               <div className="relative z-10">
                 <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">next milestone</h3>
                 <p className="text-lg font-black leading-tight mb-8">practical certification: circuit diagnostics</p>
                 <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all hover:bg-slate-900 hover:text-white shadow-lg">
                  resume adaptive module
                </button>
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}