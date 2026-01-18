"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import DiagnosticWelcomeModal from "@/components/dashboard/diagnosticwelcomemodal";
import type { User } from "@/lib/types";

type SupabaseUser = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, any> | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const supabase = useMemo(() => createClientComponentClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserAndCheckDiagnostic = useCallback(async () => {
    setLoading(true);

    const {
      data: { user: authUser },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !authUser) {
      setUser(null);
      setShowWelcomeModal(false);
      setLoading(false);
      router.push("/login");
      return;
    }

    const u = authUser as unknown as SupabaseUser;

    // Build a minimal User object compatible with your UI.
    // If your User type differs, adapt fields here (safe place to map).
    const mappedUser: User = {
      ...(u as any),
      id: u.id,
      email: u.email ?? null,
      first_name: (u.user_metadata?.first_name ?? null) as any,
    };

    setUser(mappedUser);

    // Check if the user has completed their pre-test.
    // Assumes table: diagnostic_results(user_id, test_type, ...)
    const { data: results, error: resultsErr } = await supabase
      .from("diagnostic_results")
      .select("id")
      .eq("user_id", u.id)
      .eq("test_type", "pre-test")
      .limit(1);

    // If any error or no results -> show modal
    const needsPreTest = !!resultsErr || !results || results.length === 0;
    setShowWelcomeModal(needsPreTest);

    setLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    void fetchUserAndCheckDiagnostic();
  }, [fetchUserAndCheckDiagnostic]);

  const handleStartDiagnostic = () => {
    setShowWelcomeModal(false);
    router.push("/diagnostic-test"); // TODO: create this route or change to your real diagnostic path
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading user data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Redirecting to login...
      </div>
    );
  }

  const displayName = user.first_name || user.email || "Learner";

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Welcome to your Dashboard, {displayName}!
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          This is your personalized learning space. Your Cobel AI Engine is ready to guide you.
        </p>
      </div>

      <DiagnosticWelcomeModal
        userName={displayName}
        isOpen={showWelcomeModal}
        onClose={handleCloseModal}
        onStartDiagnostic={handleStartDiagnostic}
      />
    </div>
  );
}
