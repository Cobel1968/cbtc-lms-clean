'use client';

// app/dashboard/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// FIXED: Matched double quotes for the import path
import DiagnosticWelcomeModal from "@/components/dashboard/DiagnosticWelcomeModal";
import { User } from '@/lib/types'; 

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      // FIXED: Rename internal user to 'authUser' to avoid conflict with the 'user' state variable
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authUser) {
        // Cast to your User type as required by your business logic
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
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Welcome to your Dashboard, {user.first_name || user.email}!
      </h1>
      
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        <p className="text-slate-600">
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