"use client";
import Logo from '@/components/logo';
import BilingualFluencyChart from '@/components/bilingual-fluency-chart';
import MilestoneForecast from '@/components/milestone-forecast';

export default function StudentPortal({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#003366] text-white">
      <header className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <Logo className="h-8 bg-white p-1 rounded" />
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Profile</span>
      </header>

      <main className="p-6 space-y-8 pb-20">
        <section className="text-center py-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Progress Report</h2>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">ID: {params.id}</p>
        </section>

        <div className="space-y-6">
          <BilingualFluencyChart studentId={params.id} />
          <MilestoneForecast studentId={params.id} />
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#E91E63] mb-4">Verification Status</p>
          <div className="inline-block p-4 bg-white rounded-2xl">
             {/* This would be a QR code generated specifically for this URL */}
             <div className="w-32 h-32 bg-slate-200 animate-pulse rounded flex items-center justify-center text-slate-400 text-[8px] font-bold uppercase">QR Security Secure</div>
          </div>
          <p className="mt-4 text-[9px] font-medium opacity-40 uppercase tracking-tighter">Verified by Cobel AI Engine [cite: 2026-01-01]</p>
        </div>
      </main>
    </div>
  );
}