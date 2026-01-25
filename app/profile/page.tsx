'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { MilestoneForecast } from '@/components/admin/MilestoneForecast';

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const USER_ID = "ef4642ff-f1cc-4b05-bea1-a3ba60cc627f"; // Your verified ID

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', USER_ID)
        .single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="p-10 text-center font-mono">LOADING COBEL ENGINE DATA...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header: Personalized Welcome */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Your Learning Trajectory</h1>
            <p className="text-slate-500">Bilingual Vocational Specialization</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase">
              Student ID: {USER_ID.slice(0, 8)}
            </span>
          </div>
        </div>

        {/* The Forecast: Feature 3 */}
        <MilestoneForecast user_id={USER_ID} />

        {/* Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Technical Fluency Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Bilingual Technical Fluency
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-blue-600">{profile.technical_fluency}%</div>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-1000" 
                  style={{ width: `${profile.technical_fluency}%` }}
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Based on your <strong>Analog-to-Digital</strong> assessments, your mastery of bilingual technical terms is increasing.
            </p>
          </div>

          {/* Curriculum Density Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Curriculum Density
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-indigo-600">{profile.curriculum_density}x</div>
              <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                OPTIMIZED
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              The <strong>Temporal Optimization</strong> algorithm has adjusted your path. You are currently learning 
              {profile.curriculum_density < 1 ? ' faster than ' : ' at '} the standard vocational pace.
            </p>
          </div>

        </div>

        {/* Feature 4: Analog-to-Digital Status */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center">
          <h3 className="text-lg font-bold mb-2">Ready for your next assessment?</h3>
          <p className="text-slate-400 text-sm mb-6">Scan your physical assessment to update your technical fluency instantly.</p>
          <a href="/admin" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
            GO TO UPLOAD PORTAL
          </a>
        </div>

      </div>
    </div>
  );
}
