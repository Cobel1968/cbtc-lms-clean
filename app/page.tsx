import Logo from '@/components/logo';
"use client";
import Link from 'next/link';

export default function GlobalLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* Hero Section */}
      <header className="p-10 md:p-20 max-w-7xl mx-auto">
        <div className="border-l-4 border-black pl-6 mb-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            <Logo className='h-20' />
          </h1>
          <p className="mt-4 text-sm font-bold tracking-[0.3em] text-blue-600 uppercase">
            Vocational Training & Bilingual Technical Mastery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          
          {/* ACTOR 1: ADMIN/TRAINER */}
          <Link href="/admin-dashboard" className="group">
            <div className="h-full border-2 border-black p-8 rounded-[2rem] hover:bg-black hover:text-white transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">Portal 01</span>
              <h2 className="text-3xl font-black mt-4 uppercase">Center Admin</h2>
              <p className="mt-4 text-sm font-medium opacity-60">
                Access Batch Scanning, Temporal Optimization controls, and Center Analytics.
              </p>
              <div className="mt-8 font-black text-xs uppercase group-hover:translate-x-2 transition-transform">Enter Console </div>
            </div>
          </Link>

          {/* ACTOR 2: STUDENT */}
          <div className="group cursor-default">
            <div className="h-full bg-slate-50 border-2 border-transparent p-8 rounded-[2rem] hover:border-blue-600 transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Portal 02</span>
              <h2 className="text-3xl font-black mt-4 uppercase">Student</h2>
              <p className="mt-4 text-sm font-medium opacity-60">
                Track your Bilingual Mastery and view your Target Graduation Date via QR login.
              </p>
              <p className="mt-8 text-[10px] font-black text-blue-600 uppercase tracking-tighter italic">
                *Access via QR code on your ID Badge
              </p>
            </div>
          </div>

          {/* ACTOR 3: EMPLOYER/VERIFICATION */}
          <div className="group cursor-default">
            <div className="h-full border-2 border-slate-100 p-8 rounded-[2rem] hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Portal 03</span>
              <h2 className="text-3xl font-black mt-4 uppercase">Verification</h2>
              <p className="mt-4 text-sm font-medium opacity-60">
                Verify student credentials and technical transcripts instantly using the QR security seal.
              </p>
              <div className="mt-8 font-black text-xs uppercase text-emerald-600">Secure Audit Active</div>
            </div>
          </div>

        </div>
      </header>

      {/* Innovation Footnote */}
      <footer className="bg-black text-white p-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Proprietary Technology</p>
            <p className="text-sm font-bold">Analog-to-Digital Pedagogical Bridge (v4.0)</p>
          </div>
          <div className="text-xs font-medium opacity-40 text-center md:text-right max-w-sm italic">
            "Solving knowledge gaps and bilingual friction in traditional vocational training."
          </div>
        </div>
      </footer>
    </div>
  );
}
