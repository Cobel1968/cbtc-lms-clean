'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, FileText, Zap } from 'lucide-react';

export default function TrainerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [assessments, setAssessments] = useState<any[]>([]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'COBEL2026') {
      setIsAuthenticated(true);
    } else {
      alert('Unauthorized Access');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      async function getData() {
        const { data } = await supabase.from('assessment_results').select('*').order('created_at', { ascending: false });
        if (data) setAssessments(data);
      }
      getData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <form onSubmit={handleAuth} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 w-full max-w-md text-center">
          <Lock className="mx-auto text-blue-500 mb-4" size={48} />
          <h1 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">Trainer Oversight Login</h1>
          <input 
            type="password" 
            placeholder="Enter Training Center Key" 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-xl transition-all uppercase tracking-widest text-xs">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-8 border-b border-slate-800 pb-4">Trainer Command Center</h1>
        <div className="grid gap-4">
          {assessments.map((a: any) => (
            <div key={a.id} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500"><FileText /></div>
                <div>
                  <p className="text-sm font-black text-white">{a.course_id}</p>
                  <p className="text-[10px] text-slate-500 font-mono">ID: {a.student_id.slice(0,8)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Fluency Score</span>
                <span className="text-2xl font-black text-blue-500">{a.fluency_score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
