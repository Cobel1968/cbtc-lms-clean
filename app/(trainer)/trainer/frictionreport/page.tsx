'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import dynamicImport from 'next/dynamic';
import { ArrowRightLeft, Loader2, CheckCircle2 } from 'lucide-react';

// --- Internal Report Component ---
function FrictionReportContent() {
  const [reports, setReports] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    const initEngine = async () => {
      const { calculate_friction_index } = await import('@/lib/frictionengine');
      
      const mock_vocational_data = [
        { term: 'circuit breaker / disjoncteur', category: 'electrical', english_score: 45, french_score: 95, attempts: 3 },
        { term: 'front desk / réception', category: 'hospitality', english_score: 88, french_score: 92, attempts: 1 },
        { term: 'torque wrench / clé dynamométrique', category: 'mechanical', english_score: 30, french_score: 85, attempts: 5 },
      ];

      const data = calculate_friction_index(mock_vocational_data);
      setReports(data);
      setIsMounted(true);
    };

    initEngine();
  }, []);

  // --- Logic: Assign Module & Adjust Curriculum Density ---
  const handleAssignModule = async (term: string, category: string) => {
    setAssigning(term);
    
    // Methodical Trace for Rollback
    console.log(`[Cobel AI Engine] ACTION: Assign Module | TERM: ${term} | CAT: ${category}`);
    
    try {
      // Logic simulation: This bridges the gap to the student's dynamic path
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      // In production, this call updates 'learning_path_density' in Supabase
      console.log(`[Cobel AI Engine] SUCCESS: Path adjusted to 'DENSE' for track: ${category}`);
      
      alert(`Pedagogical adjustment successful for: ${term}. Curriculum density increased for affected students.`);
    } catch (error) {
      console.error("[Cobel AI Engine] ROLLBACK: Assignment failed.", error);
    } finally {
      setAssigning(null);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="p-8 lg:p-12 space-y-8 lowercase">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
            bilingual friction report
          </h1>
          <p className="text-slate-500 font-bold">identifying vocational language gaps</p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 text-xs font-black uppercase">
          {reports.filter(r => Number(r.friction_index) > 50).length} critical gaps detected
        </div>
      </header>

      <div className="grid gap-4">
        {reports.map((item) => (
          <div key={item.term} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl ${Number(item.friction_index) > 50 ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'}`}>
                <ArrowRightLeft size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 uppercase text-lg leading-none mb-1">
                  {item.term}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.category} • {item.attempts} assessments
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">friction index</p>
                <p className={`text-2xl font-black ${Number(item.friction_index) > 50 ? 'text-red-600' : 'text-slate-900'}`}>
                  {item.friction_index}%
                </p>
              </div>
              <button 
                onClick={() => handleAssignModule(item.term, item.category)}
                disabled={assigning === item.term}
                className="min-w-[140px] bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all uppercase text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {assigning === item.term ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  'assign module'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- BUILD PROTECTION: Dynamic Export ---
export default dynamicImport(() => Promise.resolve(FrictionReportContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  ),
});
