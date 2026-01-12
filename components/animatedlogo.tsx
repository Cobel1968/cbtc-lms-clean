// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DiagnosticWelcomeModal from @/components/dashboard/diagnosticwelcomemodal';
import { User } from '@/lib/types'; // Import your User type

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user as User); // Cast to your User type
        // Check if the user has completed their pre-test.
        // This logic needs to be implemented with your actual diagnostic_results table.
        // For now, let's assume all new users need to see it.
        const { data: results, error } = await supabase
          .from('diagnostic_results')
          .select('*')
          .eq('user_id', user.id)
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
    // Logic to navigate to the diagnostic test page
    router.push('/diagnostic-test'); // Create this page later
    setShowWelcomeModal(false); // Close modal once diagnostic starts
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
    // You might want to set a flag in local storage or user profile
    // to prevent it from showing again if they just closed it without taking the test.
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
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Welcome to your Dashboard, {user.first_name || user.email}!</h1>
      {/* Other dashboard content will go here */}
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <p>This is your personalized learning space. Your Cobel AI Engine is ready to guide you.</p>
        {/* Placeholder for other dashboard components */}
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
