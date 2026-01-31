"use client";
import Logo from '@/components/logo';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import MilestoneForecast from '@/components/milestone-forecast';
import BatchScanModal from '@/components/batch-scan-modal';

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserAndLoad() {
      // 1. Check if session exists
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/');
        return;
      }

      // 2. Check Role (Admin/Trainer only)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin' && profile?.role !== 'trainer') {
        router.push('/');
        return;
      }

      // 3. Load Student Data
      const { data } = await supabase.from('student_competency_matrix').select('*');
      if (data) setStudents(data);
      setLoading(false);
    }
    
    checkUserAndLoad();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse">
          Authenticating Cobel System...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <Logo className="h-8" light />
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSignOut}
            className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {students.map((student) => (
          <div key={student.student_id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold uppercase tracking-tighter">{student.name}</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {student.domain || 'General'}
                </span>
                <BatchScanModal studentId={student.student_id} />
              </div>
            </div>
            <MilestoneForecast studentId={student.student_id} />
          </div>
        ))}
      </div>
    </div>
  );
}