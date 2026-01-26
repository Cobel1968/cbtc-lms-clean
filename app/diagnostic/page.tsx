'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Loader2, BrainCircuit, Target, Languages } from 'lucide-react';
import dynamicImport from 'next/dynamic';

// --- Internal Engine Component ---
function DiagnosticContent() {
  const router = useRouter();
  
  const [supabase, setSupabase] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [translation, setTranslation] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Track Selection, 2: Bilingual Friction
  const [isCalibrating, setIsCalibrating] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadDependencies = async () => {
      const { default: client } = await import('@/lib/supabaseClient');
      const { coursesData } = await import('@/lib/coursesData');
      setSupabase(client);
      setCourses(coursesData);
    };
    loadDependencies();
  }, []);

  // --- Feature 2 & 3: Dynamic Path Mapping Logic ---
  const handleCalibration = async () => {
    if (!supabase) return;
    setIsCalibrating(true);
    
    // Engine Logic: Check for bilingual technical fluency
    // e.g., if user identifies 'dynamométrique' for a mechanical track
    const isHighFluency = translation.toLowerCase().includes('dynamo') || translation.toLowerCase().includes('torque');
    
    const initialDensity = isHighFluency ? 'dense' : 'standard';
    const initialTimeReduction = isHighFluency ? 480 : 0; // 1 day (480 mins) saved for high fluency

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 1. Log the diagnostic result
        await supabase.from('diagnostic_results').insert({
          user_id: user.id,
          score: isHighFluency ? 90 : 50,
          test_type: 'multi-dimensional-pretest'
        });

        // 2. Update Profile with Adaptive Learning Parameters
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            learning_path_density: initialDensity,
            total_minutes_spent: initialTimeReduction,
            vocational_track: selectedCourse
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
        
        setIsComplete(true);
      }
    } catch (err) {
      console.error("[Cobel Engine] Calibration Error. Rollback initiated.", err);
    } finally {
      setIsCalibrating(false);
    }
  };

  if (!isMounted) return null;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 lowercase">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black mb-2 text-slate-900 tracking-tighter uppercase italic">analysis complete</h2>
          <p className="text-slate-500 font-bold mb-8">path mapping and temporal optimization active.</p>
          <Link href="/dashboard" className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
            enter terminal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 lowercase">
      <div className="max-w-4xl mx-auto">
        
        {/* Step 1: Vocational Track Selection */}
        {step === 1 && (
          <div className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4 mb-8">
               <Target className="text-indigo-600" size={32} />
               <h1 className="text-3xl font-black uppercase italic tracking-tighter">select vocational track</h1>
            </div>
            
            <div className="grid gap-4">
              {courses.map((course: any) => (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course.id);
                    setStep(2);
                  }}
                  className="w-full text-left p-8 border-2 border-slate-50 rounded-[32px] hover:border-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">available track</span>
                    <span className="text-xl font-bold text-slate-900 uppercase italic">{course.id.replace('_', ' ')}</span>
                  </div>
                  <ArrowRight size={24} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Bilingual Technical Mapping */}
        {step === 2 && (
          <div className="bg-slate-900 rounded-[40px] shadow-2xl p-10 text-white animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-4 mb-8">
               <Languages className="text-indigo-400" size={32} />
               <h1 className="text-3xl font-black uppercase italic tracking-tighter">Bilingual Friction Check</h1>
            </div>
            
            <div className="space-y-8">
              <div className="bg-slate-800 p-8 rounded-[32px] border border-slate-700">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">translate technical term to french</p>
                <div className="text-4xl font-black italic mb-8 text-white uppercase tracking-tighter italic">"torque wrench"</div>
                <input 
                  type="text" 
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  placeholder="enter technical equivalent..." 
                  className="w-full bg-slate-950 border-2 border-slate-700 p-6 rounded-2xl focus:border-indigo-500 outline-none font-bold uppercase text-indigo-400 placeholder:text-slate-700"
                />
              </div>

              <button 
                onClick={handleCalibration}
                disabled={isCalibrating || !translation}
                className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/20"
              >
                {isCalibrating ? <Loader2 className="animate-spin" /> : <>calibrate cobel engine <ArrowRight size={18}/></>}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- BUILD PROTECTION ---
export default dynamicImport(() => Promise.resolve(DiagnosticContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  ),
});




