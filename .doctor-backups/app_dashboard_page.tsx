'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Ensure this matches the EXACT filename: DiagnosticWelcomeModal.tsx
import DiagnosticWelcomeModal from "@/components/dashboard/DiagnosticWelcomeModal";
import type { User } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchUserAndCheckDiagnostic = useCallback(async () => {
    // SECURITY GATE: Prevent the build server from executing Supabase logic
    if (typeof window === 'undefined') return;

    const supabase = createClientComponentClient();
    setLoading(true);

    try {
      const { data: { user: authUser }, error: authErr } = await supabase.auth.getUser();

      if (authErr || !authUser) {
        router.push("/login");
        return;
      }

      // Mapping user metadata to your User type
      const mappedUser: User = {
        id: authUser.id,
        email: authUser.email ?? null,
        first_name: authUser.user_metadata?.first_name ?? "Learner",
      } as any;

      setUser(mappedUser);

      const { data: results } = await supabase
        .from("diagnostic_results")
        .select("id")
        .eq("user_id", authUser.id)
        .eq("test_type", "pre-test")
        .limit(1);

      setShowWelcomeModal(!results || results.length === 0);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (isMounted) {
      fetchUserAndCheckDiagnostic();
    }
  }, [isMounted, fetchUserAndCheckDiagnostic]);

  if (!isMounted) {
    return <div className="min-h-screen bg-slate-50" />; // Empty shell for build export
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const displayName = user?.first_name || "Learner";

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Welcome to your Dashboard, {displayName}!
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          Your Cobel AI Engine is active and monitoring your technical fluency.
        </p>
      </div>

      <DiagnosticWelcomeModal
        userName={displayName}
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onStartDiagnostic={() => router.push("/diagnostic-test")}
      />
    </div>
  );
}