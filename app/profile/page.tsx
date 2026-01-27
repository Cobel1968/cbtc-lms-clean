'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCertificate } from '../../lib/certificate-engine';
import { Award, Clock, TrendingUp, Download } from 'lucide-react';

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfileData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch student progress and technical fluency
        const { data } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('student_id', user.id)
          .order('created_at', { ascending: false });
        
        setProfile({ user, assessments: data || [] });
      }
      setLoading(false);
    }
    getProfileData();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black italic uppercase">Loading Cobel Profile...</div>;

  const averageScore = profile?.assessments.length 
    ? Math.round(profile.assessments.reduce((acc: any, curr: any) => acc + curr.fluency_score, 0) / profile.assessments.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">My Learning Path</h1>
            <p className="text-blue-500 font-bold uppercase text-xs tracking-widest">Cobel AI Progress Tracker</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs font-bold uppercase">Status</p>
            <p className="text-green-500 font-black italic uppercase">Accelerated</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <Clock className="text-blue-500 mb-2" />
            <span className="block text-slate-500 text-[10px] font-black uppercase">Time Saved</span>
            <span className="text-3xl font-black italic">14 Days</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <TrendingUp className="text-green-500 mb-2" />
            <span className="block text-slate-500 text-[10px] font-black uppercase">Technical Fluency</span>
            <span className="text-3xl font-black italic">{averageScore}%</span>
          </div>
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <Award className="text-purple-500 mb-2" />
            <span className="block text-slate-500 text-[10px] font-black uppercase">Certifications</span>
            <span className="text-3xl font-black italic">{averageScore > 80 ? '1' : '0'}</span>
          </div>
        </div>

        {/* Certificate Section */}
        {averageScore > 80 && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-3xl flex items-center justify-between shadow-2xl shadow-blue-500/20">
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Curriculum Mastery</h2>
              <p className="text-blue-100 text-sm opacity-80">Your technical proficiency exceeds the vocational benchmark.</p>
            </div>
            <button 
              onClick={() => generateCertificate(profile.user.email.split('@')[0], 'Bilingual Vocational Training', averageScore)}
              className="bg-white text-blue-600 px-6 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Download size={18} /> Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

