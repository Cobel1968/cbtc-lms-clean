"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { LogOut, LayoutDashboard } from "lucide-react";

// Standardizing imports: Path is lowercase, Component is PascalCase
import GraduationPredictor from "@/components/dashboard/graduationpredictor";
import FinalAssessment from "@/components/dashboard/finalassessment";
import DiagnosticWelcomeModal from "@/components/dashboard/diagnosticwelcomemodal";
// Note: Ensure the path below is correct relative to app/dashboard/page.tsx
import AnimatedLogo from "@/components/animatedlogo"; 

export default function DashboardPage() {
  const router = useRouter();
  const [is_loading, set_is_loading] = useState(true);
  const [user_data, set_user_data] = useState<any>(null);
  const [show_welcome, set_show_welcome] = useState(false);
  const [enrollment, set_enrollment] = useState<any>(null);
  const [profile, set_profile] = useState<any>(null);

  const fetch_engine_data = useCallback(async () => {
    const { data: { user }, error: auth_error } = await supabase.auth.getUser();
    
    if (auth_error || !user) {
      router.push("/login");
      return;
    }

    try {
      // Feature 1 & 4: Profile & Technical Fluency Data
      const { data: profile_data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      set_profile(profile_data);

      // Feature 1: Multi-Dimensional Diagnostic Results
      const { data: diagnostic } = await supabase
        .from("diagnostic_results")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false });

      // Feature 3: Temporal Optimization Enrollment
      const { data: enrollment_data } = await supabase
        .from("enrollments")
        .select(`*, course:courses(*)`)
        .eq("user_id", user.id)
        .single();

      set_user_data(diagnostic?.[0] || null);
      set_enrollment(enrollment_data);

      if (!diagnostic || diagnostic.length === 0) {
        set_show_welcome(true);
      }
    } catch (err) {
      console.error("cobel_engine_init_error:", err);
    } finally {
      set_is_loading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch_engine_data();
  }, [fetch_engine_data]);

  const handle_logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (is_loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 lowercase">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-bold tracking-widest italic">
          cobel ai engine initializing...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      {/* Feature 1: Welcome Modal for Knowledge Gap Analysis */}
      {show_welcome && <DiagnosticWelcomeModal isOpen={show_welcome} onClose={() => set_show_welcome(false)} />}

      <div className="max-w-6xl mx-auto">
        {/* NAV: TOP NAVIGATION BAR */}
        <nav className="flex items-center justify-between mb-10 bg-white p-4 rounded-[24px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">c</div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">COBEL LMS</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Vocational Innovation 2026</p>
            </div>
          </div>
          <button onClick={handle_logout} className="p-3 text-slate-400 hover:text-red-500 transition-all">
            <LogOut size={20} />
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN COLUMN: PEDAGOGICAL VALIDATION */}
          <section className="lg:col-span-2 space-y-8">
            <header>
              <h2 className="text-3xl font-black text-slate-900 italic tracking-tight">innovation dashboard</h2>
              <p className="text-slate-500 lowercase">managing knowledge gaps & technical fluency</p>
            </header>

            {/* Feature 2: Dynamic Path Mapping & Milestone Forecast */}
            <GraduationPredictor 
              diagnostic_score={user_data?.score || 0} 
              fluency_score={profile?.technical_fluency_score || 0}
              start_date={enrollment?.created_at || new Date().toISOString()}
            />

            {/* Feature 3: Temporal Optimization Gate */}
            {enrollment ? (
              <FinalAssessment 
                course={enrollment.course}
                pre_test={user_data}
                enrollment_id={enrollment.id}
                on_take_test={() => router.push(`/assessment/${enrollment.id}`)}
              />
            ) : (
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-[32px] text-center">
                <p className="text-slate-400 font-medium lowercase">no active vocational enrollment detected.</p>
              </div>
            )}
          </section>

          {/* SIDEBAR: ANALOG-TO-DIGITAL MONITOR */}
          <aside className="space-y-6">
            <div className="p-8 bg-slate-900 text-white rounded-[40px] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-500 rounded-xl">
                    <LayoutDashboard size={20} />
                  </div>
                  <h3 className="font-bold text-lg lowercase">technical status</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">
                      <span>bilingual mastery</span>
                      <span>{profile?.technical_fluency_score || 0}%</span>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-400 transition-all duration-1000" 
                        style={{ width: `${profile?.technical_fluency_score || 0}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 italic lowercase">
                    "integrates physical handwriting assessments via the analog-to-digital bridge."
                  </p>
                </div>
              </div>
            </div>
            <AnimatedLogo />
          </aside>
        </div>
      </div>
    </div>
  );
}