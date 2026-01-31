"use client";
import Logo from '@/components/logo';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
      <Logo className="h-8" light />
      <button 
        onClick={handleSignOut}
        className="text-[10px] font-black uppercase tracking-widest px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300"
      >
        Sign Out
      </button>
    </nav>
  );
}