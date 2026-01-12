'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, ShieldAlert, Home } from 'lucide-react';
import Link from 'next/link';

// rectification: changed AdminError to admin_error to match project standard
export default function admin_error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // logging the fault for the internal audit system
    console.error("cobel_engine_fault:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center lowercase">
      <div className="bg-red-50 p-6 rounded-[32px] mb-8 border border-red-100">
        <ShieldAlert size={48} className="text-red-500" />
      </div>

      {/* uppercase handled via css class only */}
      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">
        pedagogical logic breach
      </h2>
      
      <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
        the engine encountered a synchronization error while processing this module. 
        the session has been isolated to protect the core database.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => reset()}
          className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
        >
          <RefreshCcw size={16} /> reboot module
        </button>

        <Link
          href="/admin/dashboard"
          className="flex-1 bg-white border border-slate-200 text-slate-400 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
        >
          <Home size={16} /> exit to safety
        </Link>
      </div>

      <div className="mt-12">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          fault_digest: {error.digest || 'unknown_origin'}
        </p>
      </div>
    </div>
  );
}