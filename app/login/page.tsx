"use client";
import Logo from '@/components/logo';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

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
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-b-8 border-[#10B981]">
        <div className="p-12 text-center">
          <Logo className="h-16 w-auto mx-auto mb-8" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#003366] mb-2">Technical Portal</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.3em] mb-10">Bilingual Engine Access</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="TRAINER EMAIL" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#10B981] transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="SECURITY KEY" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#10B981] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              disabled={loading}
              className="w-full py-5 bg-[#10B981] hover:bg-[#0d9469] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-lg transform active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-200"
            >
              {loading ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}