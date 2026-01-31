'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StudentHome() {
    const [profile, setProfile] = useState(null);
    const totalNodes = 191; // The backbone of our pedagogical bank

    useEffect(() => {
        async function fetchMyProgress() {
            // Using id: 1 for testing as established in the Bridge fix
            const { data } = await supabase.from('user_profiles').select('*').eq('id', 1).single();
            setProfile(data);
        }
        fetchMyProgress();
    }, []);

    if (!profile) return <div className="p-10 text-center font-bold">Syncing Progress...</div>;

    // Calculate progress based on fluency score as a proxy for node completion
    const nodesCompleted = Math.round((profile.fluency_score / 100) * totalNodes);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-slate-900">Your Progress</h1>
                <p className="text-slate-500 text-sm">Cobel AI Engine: {profile.curriculum_density} Path</p>
            </header>

            {/* Progress Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl mb-6 border border-slate-100">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-4xl font-black text-blue-600">{nodesCompleted}</span>
                        <span className="text-slate-400 font-bold"> / {totalNodes}</span>
                        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Nodes Mastered</p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-bold text-slate-800">{profile.predicted_timeframe}</span>
                        <p className="text-[10px] uppercase text-slate-400">Remaining</p>
                    </div>
                </div>

                {/* The Charting Bar */}
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                        style={{ width: `${(nodesCompleted / totalNodes) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Insight Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-2xl text-white">
                    <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Fluency</p>
                    <p className="text-xl font-black">{Math.round(profile.fluency_score)}%</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-2xl text-white">
                    <p className="text-[10px] uppercase text-blue-200 font-bold mb-1">Status</p>
                    <p className="text-xl font-black">Sync Ready</p>
                </div>
            </div>
        </div>
    );
}