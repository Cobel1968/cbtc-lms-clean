import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CobelLogo from '@/components/CobelLogo';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guard 1: Existence check
  if (!user) redirect('/login');

  // Guard 2: Role-Based Access Control (RBAC)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'trainer') {
    console.warn(`[Cobel Security] Unauthorized access attempt by ${user.email}`);
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 lowercase">
      {/* Trainer Sidebar: Corporate Dark Mode */}
      <aside className="w-72 bg-slate-900 text-white p-8 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="mb-12">
          <CobelLogo className="brightness-0 invert scale-110 origin-left" />
          <div className="flex items-center gap-2 mt-4 px-1">
            <ShieldCheck size={12} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">
              instructor terminal
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="/trainer" className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-sm uppercase tracking-tight transition-all group border border-white/5">
            <LayoutDashboard size={18} className="group-hover:text-indigo-400 transition-colors" /> 
            overview
          </a>
          <a href="#" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold text-sm uppercase tracking-tight group">
            <Users size={18} className="group-hover:text-indigo-400 transition-colors" /> 
            student list
          </a>
          <a href="#" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold text-sm uppercase tracking-tight group">
            <BarChart3 size={18} className="group-hover:text-indigo-400 transition-colors" /> 
            fluency labs
          </a>
        </nav>

        {/* System Status & Auth */}
        <div className="mt-auto space-y-6">
           <div className="p-5 bg-indigo-600/10 rounded-[24px] border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-indigo-400 animate-pulse" />
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">engine status</p>
              </div>
              <p className="text-xs font-bold text-slate-300">bilingual mapping active</p>
           </div>
           
           <button className="flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 transition-all font-bold text-sm uppercase tracking-tight w-full text-left group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            terminate session
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* The current trainer dashboard UI renders here */}
        {children}
      </main>
    </div>
  );
}