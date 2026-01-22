import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import StudentDashboardUI from './StudentDashboardUI';
import CobelLogo from '@/components/CobelLogo';

export default async function Page() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Pre-fetch profile for the Cobel Engine
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Global Corporate Header */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <CobelLogo />
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">terminal active</p>
              <p className="text-xs font-bold text-slate-900 lowercase">{user.email}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
               {user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* Interactive UI Layer */}
      <StudentDashboardUI initialProfile={profile} user={user} />
    </div>
  );
}