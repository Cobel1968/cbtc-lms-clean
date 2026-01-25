import Link from 'next/link';
import { FileQuestion, ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-20 rounded-full" />
          <div className="relative bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileQuestion size={40} />
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
              404
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              The pedagogical resource or page you are looking for does not exist in the Cobel BTC Engine.
            </p>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
              >
                <ChevronLeft size={20} />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
          Cobel Business Training Center • Stable v5.4
        </p>
      </div>
    </div>
  );
}