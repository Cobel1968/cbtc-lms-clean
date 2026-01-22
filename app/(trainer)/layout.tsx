import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CobelLogo from '@/components/CobelLogo';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  LogOut,
  ShieldCheck,
  Activity,
  UserCircle
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
    .select('role, email')
    .eq('id', user.id)
    .single();

  // Strict check for 'trainer' or 'admin' roles
  if (profile?.role !== 'admin' && profile?.role !== 'trainer') {
    console.warn(`[Cobel Security] Unauthorized access attempt by ${user.email}`);
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 lowercase">
      {/* Trainer Sidebar: Corporate Dark Mode */}
      <aside className="w-72 bg-slate-900 text-white p-8 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl border-r border-white/5">
        
        {/* Brand Section */}
        <div className="mb-12">
          <CobelLogo className="brightness-0 invert scale-110 origin-left" />
          <div className="flex items-center gap-2 mt-4 px-1">
            <ShieldCheck size={12} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">
              instructor terminal
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-2">
          <a href="/trainer" className="flex items-center gap-3 p-4 bg-white/5 hover:bg-indigo-600/20 text-white rounded-2xl font-bold text-sm uppercase tracking-tight transition-all group border border-white/5">
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

        {/* System Status & Session Management */}
        <div className="mt-auto space-y-6">
           {/* Engine Status Block */}
           <div className="p-5 bg-indigo-600/10 rounded-[24px] border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-indigo-400 animate-pulse" />
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">engine status</p>
              </div>
              <p className="text-xs font-bold text-slate-300">bilingual mapping: active</p>
              <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-3/4 rounded-full" />
              </div>
           </div>

           {/* User Profile Summary */}
           <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                <UserCircle size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight truncate">
                  {profile?.email}
                </p>
                <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                  {profile?.role}
                </p>
              </div>
           </div>
           
           <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 transition-all font-bold text-sm uppercase tracking-tight w-full text-left group">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              terminate session
            </button>
           </form>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}