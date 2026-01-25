'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
// lib imports are already standardized to lowercase snake_case
import { process_handwritten_assessment, update_curriculum_from_handwriting } from '@/lib/handwritingprocessor';
import { Upload, FileText, CheckCircle, Zap, Clock, RefreshCw } from 'lucide-react';

export default function AssessmentsPage() {
  const [is_uploading, set_is_uploading] = useState(false);
  const [result, set_result] = useState<any>(null);

  const handle_upload = async () => {
    if (is_uploading) return;
    set_is_uploading(true);
    
    try {
      // Feature 4: Ingesting physical scan (Analog-to-Digital Bridge)
      const data = await process_handwritten_assessment('physical_scan_001.jpg');
      
      // Feature 3: Calculating Temporal Optimization (Automated Milestone Forecasting)
      // Logic: Start with base 12 weeks, subtract the adjustment found in the scan
      const new_timeline = update_curriculum_from_handwriting(12, data.adjustment_value);
      
      set_result({ ...data, new_timeline });
    } catch (error) {
      console.error("bridge_failure", error);
    } finally {
      set_is_uploading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
          analog-to-digital bridge
        </h1>
        <p className="text-slate-500 font-medium">
          feature 4: handwriting analysis & milestone forecasting
        </p>
      </header>

      {/* scan / upload zone */}
      <div 
        onClick={handle_upload}
        className={`border-4 border-dashed rounded-[40px] p-16 text-center transition-all cursor-pointer group
          ${is_uploading ? 'bg-indigo-50 border-indigo-200 animate-pulse' : 'bg-white border-slate-100 hover:border-indigo-400 hover:bg-slate-50/50'}`}
      >
        <div className="bg-indigo-600 w-20 h-20 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 group-hover:scale-105 transition-transform">
          {is_uploading ? <RefreshCw className="text-white animate-spin" size={32} /> : <Upload className="text-white" size={32} />}
        </div>
        <p className="text-xl font-black text-slate-900 uppercase tracking-tight">
          {is_uploading ? 'processing technical vocabulary...' : 'upload handwritten vocational assessment'}
        </p>
        <p className="text-slate-400 text-sm mt-2">supports jpg, png or pdf (bilingual vocational mapping active)</p>
      </div>

      {/* adaptive result display (the pedagogical bridge results) */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* extraction module info */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] text-indigo-600 mb-8">
              <FileText size={18} /> extraction results
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.extracted_terms.map((term: string) => (
                <span key={term} className="bg-slate-100 px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 border border-slate-200/50">
                  {term}
                </span>
              ))}
            </div>
            <p className="mt-8 text-[10px] text-slate-400 italic">ocr pre-processing: technical fluency detected</p>
          </div>

          {/* optimization module info */}
          <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} />
            </div>
            <h3 className="flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] text-indigo-400 mb-8 relative z-10">
              <Zap size={18} /> temporal optimization
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-sm lowercase pb-1">new timeframe:</span>
                <span className="text-5xl font-black text-emerald-400 italic tracking-tighter">{result.new_timeline} weeks</span>
              </div>
              <div className="flex justify-between items-center text-[10px] pt-6 border-t border-slate-800">
                <span className="text-slate-500 font-bold uppercase tracking-widest italic">adjustment applied:</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-black">
                  {result.adjustment_value} weeks saved
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
