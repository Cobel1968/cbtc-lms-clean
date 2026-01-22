'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import dynamicImport from 'next/dynamic';
import { 
  Loader2, 
  Book, 
  Camera, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';

/**
 * FEATURE 3: MILESTONE FORECAST (Temporal Optimization)
 * Lazy loaded to prevent blocking the main thread during ingestion
 */
const MilestoneForecast = dynamicImport(() => import('@/components/MilestoneForecast'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-[40px]" />
});

interface StudentDashboardProps {
  initialProfile: any;
  user: any;
}

export default function StudentDashboardUI({ initialProfile, user }: StudentDashboardProps) {
  // Use state initialized by server-side props for immediate render
  const [stats, setStats] = useState({ 
    minutes: initialProfile?.total_minutes_spent || 0, 
    expected: 6000, 
    track: initialProfile?.vocational_track || 'bilingual technical vocational' 
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * FEATURE 4: ANALOG-TO-DIGITAL BRIDGE
   * Integration of physical workshop assessments into the digital profile
   */
  const handleHandwritingUpload = async () => {
    setIsUploading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: 'physical_assessment_baseline.jpg', // Baseline for extraction
          userId: user?.id 
        })
      });

      const result = await response.json();

      if (result.success) {
        setUploadSuccess(true);
        
        // Dynamic Path Mapping: Update local state based on AI term extraction
        setStats(prev => ({ 
          ...prev, 
          minutes: prev.minutes + (result.data.adjustment_minutes || 480) 
        }));
        
        setTimeout(() => setUploadSuccess(false), 4000);
      } else {
          throw new Error(result.error || "extraction engine timeout");
      }
    } catch (err: any) {
      console.error("[Cobel Engine] Ingestion error:", err);
      setError("bridge ingestion failed. verify technical term clarity.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10 lowercase">
      
      {/* System Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-100 p-5 rounded-3xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top duration-300">
          <AlertCircle size={20} />
          <span className="font-bold text-xs uppercase tracking-widest">{error}</span>
        </div>
      )}

      {/* Hero Metrics: Temporal Optimization Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <MilestoneForecast 
            total_minutes_spent={stats.minutes} 
            expected_minutes={stats.expected} 
          />

          {/* Feature 4: The Ingestion Terminal */}
          <div className={`bg-white border-2 border-dashed rounded-[40px] p-10 transition-all duration-500 ${uploadSuccess ? 'border-emerald-500 bg-emerald-50/30 shadow-emerald-100 shadow-2xl' : 'border-slate-200 hover:border-indigo-600 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 text-center md:text-left">
                <div className={`p-6 rounded-[28px] transition-all duration-700 ${uploadSuccess ? 'bg-emerald-500 text-white rotate-[360deg]' : 'bg-slate-100 text-slate-400'}`}>
                  {uploadSuccess ? <CheckCircle2 size={32} /> : <Camera size={32} />}
                </div>
                <div>
                  <h3 className="font-black text-2xl uppercase tracking-tighter text-slate-900">
                    {uploadSuccess ? 'Ingestion Complete' : 'Handwriting Bridge'}
                  </h3>
                  <p className="text-sm text-slate-400 font-bold leading-tight max-w-[280px]">
                    {uploadSuccess ? 'bilingual technical terms synced to engine.' : 'sync physical vocational work to your digital profile.'}
                  </p>
                </div>
              </div>

              <button 
                onClick={handleHandwritingUpload}
                disabled={isUploading}
                className="w-full md:w-auto px-10 py-6 bg-slate-900 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 disabled:opacity-50 flex items-center justify-center gap-4 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                {isUploading ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <FileText size={18} />
                    {uploadSuccess ? 'sync another' : 'sync physical work'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Track Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-black uppercase text-[10px] text-slate-400 mb-6 flex items-center gap-2 tracking-[0.2em]">
                <Book size={14} className="text-indigo-600" /> current vocational track
              </h3>
              <p className="text-2xl font-black uppercase tracking-tighter text-slate-900 italic leading-none mb-2">
                {stats.track}
              </p>
              <div className="w-12 h-1 bg-indigo-600 rounded-full mt-4" />
            </div>
            <Zap className="absolute -bottom-4 -right-4 text-slate-50 opacity-[0.03]" size={160} />
          </div>
          
          <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 flex items-center gap-2">
                 <Clock size={14} /> next milestone
               </h3>
               <p className="text-xl font-black leading-tight mb-10 italic uppercase tracking-tighter">
                 practical certification: bilingual safety protocols
               </p>
               <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:bg-white hover:text-slate-900 flex items-center justify-center gap-3 group">
                 resume module
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}