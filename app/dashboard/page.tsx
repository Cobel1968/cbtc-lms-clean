'use client';

// app/dashboard/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// FIXED: Matched the single quote at the end with a double quote at the start
import DiagnosticWelcomeModal from "@/components/dashboard/DiagnosticWelcomeModal";
import { User } from '@/lib/types'; 

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      // FIXED: Using 'authUser' internally to avoid shadowing the 'user' state variable
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        setUser(authUser as unknown as User); 
        
        // Multi-Dimensional Diagnostic Check
        const { data: results, error } = await supabase
          .from('diagnostic_results')
          .select('*')
          .eq('user_id', authUser.id)
          .eq('test_type', 'pre-test');

        if (error || !results || results.length === 0) {
          setShowWelcomeModal(true);
        } else {
          setShowWelcomeModal(false);
        }
      } else {
        router.push('/login');
      }
    }
    getUser();
  }, [supabase, router]);

  const handleStartDiagnostic = () => {
    router.push('/diagnostic-test'); 
    setShowWelcomeModal(false); 
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
        Welcome to your Dashboard, {user.first_name || user.email}!
      </h1>
      
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <p className="text-slate-600 leading-relaxed">
          This is your personalized learning space. Your <strong>Cobel AI Engine</strong> is ready to guide you.
        </p>
      </div>

      <DiagnosticWelcomeModal
        userName={user.first_name || user.email || "Learner"}
        isOpen={showWelcomeModal}
        onClose={handleCloseModal}
        onStartDiagnostic={handleStartDiagnostic}
      />
    </div>
  );
}
