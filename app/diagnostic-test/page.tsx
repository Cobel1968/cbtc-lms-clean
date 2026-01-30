'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import dynamicImport from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// 1. Move the heavy logic into a sub-component
function DiagnosticEngine() {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  
  // We'll import these inside the mounted component to be safe
  const [supabase, setSupabase] = useState<any>(null);
  
  useEffect(() => {
    // Only import the client-side library once mounted
    const initSupabase = async () => {
      const { default: client } = await import('@/lib/supabaseDB');
      setSupabase(client);
    };
    initSupabase();
  }, []);

  const handleFinish = async () => {
    if (supabase) {
       // Logic to save results...
       setIsComplete(true);
    }
  };

  if (isComplete) return <div className="p-20 text-center font-bold">Diagnostic Mapped!</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-[40px] p-10 shadow-xl">
        <h1 className="text-2xl font-black italic uppercase mb-6">Cobel AI Diagnostic</h1>
        <p className="text-slate-600 mb-8">System is initializing pedagogical logic...</p>
        <button 
          onClick={handleFinish}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold"
        >
          Complete Assessment
        </button>
      </div>
    </div>
  );
}

// 2. Export the page with a Loading Gate that stops the static exporter
export default dynamicImport(() => Promise.resolve(DiagnosticEngine), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  ),
});
