"use client";
import Logo from '@/components/logo';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase]);

  const handleAuthAction = async () => {
    if (user) {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/');
      router.refresh();
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-[#003366] border-b-4 border-[#10B981] shadow-2xl">
      <div className="flex items-center gap-6">
        <div className="bg-white p-2 rounded-xl shadow-lg">
          <Logo className="h-10 w-auto" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-white font-black text-sm uppercase tracking-[0.3em] leading-none">CBTC AI Engine</h1>
          <p className="text-[#10B981] text-[9px] font-bold uppercase tracking-widest mt-1">Bilingual Mastery v1.2</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={handleAuthAction}
          className={`${user ? 'bg-[#E91E63]' : 'bg-[#10B981]'} hover:scale-105 text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95`}
        >
          {user ? 'Exit System' : 'Access Portal'}
        </button>
      </div>
    </nav>
  );
}