'use client';
export const dynamic = 'force-dynamic';
import { HandwritingUpload } from '@/components/HandwritingUpload';
import { BilingualDictionaryView } from '@/components/admin/BilingualDictionaryView';
import { MilestoneForecast } from '@/components/admin/MilestoneForecast';

export default function AdminDashboard() {
  // Utilizing the verified UUID from our successful PowerShell tests
  const TEST_USER_ID = "ef4642ff-f1cc-4b05-bea1-a3ba60cc627f";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-blue-900 tracking-tighter">
              Cobel AI Control Center
            </h1>
            <p className="text-gray-500 font-medium">
              Managing Computer-Implemented Pedagogical Logic
            </p>
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            Engine Live: Bilingual Mapping Active
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Diagnostics & Forecasting (Feature 3) */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Temporal Optimization
              </h2>
              <MilestoneForecast user_id={TEST_USER_ID} />
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-800 mb-4">
                Manual Assessment Ingestion
              </h2>
              <HandwritingUpload user_id={TEST_USER_ID} />
              <p className="mt-4 text-[10px] text-gray-400 italic">
                Ingested files are processed via the Analog-to-Digital Pedagogical Bridge.
              </p>
            </section>
            
            {/* System Health Status */}
            <div className="bg-blue-900 text-white p-6 rounded-3xl shadow-xl">
               <h3 className="text-xs uppercase tracking-widest opacity-70">AI Engine ID</h3>
               <div className="mt-2 text-xl font-mono truncate">
                 CBTC-LMS-2026-BETA
               </div>
               <div className="mt-4 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                 <span className="text-[10px] font-bold opacity-80">READY FOR SCALED UPSKILLING</span>
               </div>
            </div>
          </div>

          {/* Right Column: Vocational Brain (Bilingual Dictionary) */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
              Technical Knowledge Base
            </h2>
            <BilingualDictionaryView />
          </div>

        </div>
      </div>
    </div>
  );
}
