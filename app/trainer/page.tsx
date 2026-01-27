'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCertificate } from '@/lib/certificate-engine';
import { Lock, FileText, Award, Edit3, Save } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <form onSubmit={handleAuth} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 w-full max-w-md text-center">
          <Lock className="mx-auto text-blue-500 mb-4" size={48} />
          <h1 className="text-xl font-black text-white uppercase italic mb-6">Trainer Oversight</h1>
          <input 
            type="password" 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white font-bold p-4 rounded-xl uppercase tracking-widest text-xs">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black uppercase italic mb-8 border-b border-slate-800 pb-4">Trainer Command Center</h1>
        <div className="grid gap-4">
          {assessments.map((a: any) => (
            <div key={a.id} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-left">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500"><FileText /></div>
                <div>
                  <p className="text-sm font-black text-white">{a.course_id}</p>
                  <p className="text-[10px] text-slate-500">Student: {a.student_id.slice(0,8)}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {editingId === a.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      className="w-16 bg-slate-800 border border-slate-700 p-2 rounded-lg text-white"
                      value={newScore}
                      onChange={(e) => setNewScore(parseInt(e.target.value))}
                    />
                    <button onClick={() => updateScore(a.id)} className="p-2 bg-green-600 rounded-lg"><Save size={16}/></button>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">Fluency Score</span>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black text-blue-500">{a.fluency_score}%</span>
                       <button onClick={() => { setEditingId(a.id); setNewScore(a.fluency_score); }} className="text-slate-600 hover:text-white"><Edit3 size={14}/></button>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => generateCertificate('Student-' + a.student_id.slice(0,4), a.course_id, a.fluency_score)}
                  className="bg-blue-600/20 text-blue-500 p-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
                >
                  <Award size={18} /> ISSU CERT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
