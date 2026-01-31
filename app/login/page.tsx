"use client";
import Logo from '@/components/logo';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const particles = [
    { t: 'Moteur', l: '10%', d: '15s' }, { t: 'Hydraulic', l: '25%', d: '18s' },
    { t: 'Circuit', l: '40%', d: '12s' }, { t: 'Mastery', l: '60%', d: '20s' },
    { t: 'Technique', l: '80%', d: '14s' }, { t: 'Fluency', l: '90%', d: '16s' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push('/admin-dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* --- BILINGUAL PARTICLE LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {particles.map((p, i) => (
          <span key={i} 
            className="absolute text-white font-black uppercase tracking-widest text-[40px] md:text-[80px] whitespace-nowrap animate-float-slow"
            style={{ left: p.l, animationDuration: p.d, top: '100%' }}
          >
            {p.t}
          </span>
        ))}
      </div>

      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden border-b-[12px] border-[#10B981] z-10">
        <div className="p-12 text-center">
          <Logo className="h-16 w-auto mx-auto mb-8" />
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#003366] mb-1">Trainer Portal</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.4em] mb-10">AI Ingestion Pipeline Active</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="TRAINER EMAIL" 
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#003366] transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="SECURITY KEY" 
              className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#003366] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              disabled={loading}
              className="w-full py-6 bg-[#10B981] hover:bg-[#E91E63] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl active:scale-95 transition-all duration-300"
            >
              {loading ? 'Authenticating Engine...' : 'Initialize System'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          from { transform: translateY(0); }
          to { transform: translateY(-120vh); }
        }
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
      `}</style>
    </div>
  );
}