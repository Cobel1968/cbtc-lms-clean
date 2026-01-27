'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCertificate } from '@/lib/certificate-engine';
import { Lock, FileText, Award, Edit3, Save, User, ChevronRight } from 'lucide-react';

export default function TrainerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [assessments, setAssessments] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newScore, setNewScore] = useState<number>(0);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'COBEL2026') setIsAuthenticated(true);
    else alert('Unauthorized Access');
  };

  const fetchAssessments = async () => {
    const { data } = await supabase.from('assessment_results').select('*').order('created_at', { ascending: false });
    if (data) setAssessments(data);
  };

  useEffect(() => {
    if (isAuthenticated) fetchAssessments();
  }, [isAuthenticated]);

  const updateScore = async (id: string) => {
    await supabase.from('assessment_results').update({ fluency_score: newScore }).eq('id', id);
    setEditingId(null);
    fetchAssessments();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleAuth} className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 w-full max-w-sm text-center shadow-2xl">
          <div className="bg-blue-600/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Cobel Admin</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Secure Access Only</p>
          <input 
            type="password" 
            placeholder="Keycode"
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white mb-4 text-center focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="max-w-xl mx-auto p-4">
        <header className="py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Command</h1>
            <p className="text-blue-500 font-bold uppercase text-[10px] tracking-[0.2em]">Live Oversight</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
             <User size={20} className="text-slate-400" />
          </div>
        </header>

        <div className="space-y-4">
          {assessments.map((a: any) => (
            <div key={a.id} className="bg-slate-900 rounded-[2rem] border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500"><FileText size={18} /></div>
                  <span className="text-xs font-black uppercase text-slate-400 tracking-tight">{a.course_id}</span>
                </div>
                <ChevronRight size={16} className="text-slate-700" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[9px] text-slate-500 uppercase font-black mb-1">Current Fluency</span>
                  {editingId === a.id ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        className="w-16 bg-slate-800 border border-slate-700 p-2 rounded-xl text-white font-bold"
                        value={newScore}
                        onChange={(e) => setNewScore(parseInt(e.target.value))}
                      />
                      <button onClick={() => updateScore(a.id)} className="p-2 bg-green-600 rounded-xl"><Save size={16}/></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2" onClick={() => { setEditingId(a.id); setNewScore(a.fluency_score); }}>
                      <span className="text-3xl font-black text-white italic">{a.fluency_score}%</span>
                      <Edit3 size={14} className="text-slate-600" />
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => generateCertificate('Student-' + a.student_id.slice(0,4), a.course_id, a.fluency_score)}
                  className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Award size={16} /> Issue Cert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
