"use client";
import Logo from '@/components/logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function GlobalLandingPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <header className="p-10 md:p-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div className="border-l-4 border-black pl-6">
            <Logo className="h-20" />
            <p className="mt-4 text-sm font-bold tracking-[0.3em] text-blue-600 uppercase">
              Vocational Training & Bilingual Technical Mastery
            </p>
          </div>
          
          {user && (
            <button 
              onClick={handleSignOut}
              className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-red-600 transition-colors"
            >
              Secure Sign Out
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Link href="/admin-dashboard" className="group">
            <div className="h-full border-2 border-black p-8 rounded-[2rem] hover:bg-black hover:text-white transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">Portal 01</span>
              <h2 className="text-3xl font-black mt-4 uppercase">Center Admin</h2>
              <p className="mt-4 text-sm font-medium opacity-60">Access Batch Scanning and Analytics.</p>
              <div className="mt-8 font-black text-xs uppercase group-hover:translate-x-2 transition-transform">
                {user ? "Enter Dashboard →" : "Login to Console →"}
              </div>
            </div>
          </Link>

          <div className="h-full bg-slate-50 border-2 border-transparent p-8 rounded-[2rem] opacity-50">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Portal 02</span>
             <h2 className="text-3xl font-black mt-4 uppercase">Student</h2>
             <p className="mt-4 text-sm font-medium">Coming soon via QR Scan.</p>
          </div>

          <div className="h-full border-2 border-slate-100 p-8 rounded-[2rem] opacity-50">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Portal 03</span>
             <h2 className="text-3xl font-black mt-4 uppercase">Verification</h2>
             <p className="mt-4 text-sm font-medium">Credential Audit Active.</p>
          </div>
        </div>
      </header>
    </div>
  );
}