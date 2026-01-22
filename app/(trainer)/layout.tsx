import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guard: If a student tries to access any URL inside (trainer), kick them out
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'trainer') {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Trainer Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:block">
        <div className="font-black uppercase italic tracking-tighter text-xl mb-10">
          cobel <span className="text-indigo-400">pro</span>
        </div>
        <nav className="space-y-4 font-bold text-xs uppercase tracking-widest">
          <a href="/trainer" className="block text-indigo-400">overview</a>
          <a href="/trainer/analytics" className="block opacity-50 hover:opacity-100">fluency labs</a>
          <a href="/trainer/milestones" className="block opacity-50 hover:opacity-100">forecasts</a>
        </nav>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}