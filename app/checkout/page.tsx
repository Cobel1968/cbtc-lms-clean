'use client';
import { useState } from 'react';
import { Smartphone, CheckCircle, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/cart" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Cart
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-[#1cb4ff] p-8 text-white">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Wave Payment</h1>
            <p className="opacity-90 font-bold uppercase text-xs tracking-widest">Cobel AI Training Center (LMS)</p>
          </div>

          <div className="p-8 space-y-8">
            {/* WAVE SPECIFIC INSTRUCTIONS */}
            <div className="p-6 border-2 border-[#1cb4ff] rounded-2xl bg-blue-50/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#1cb4ff] p-2 rounded-lg text-white">
                  <Smartphone size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase">Instructions</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Envoyez le montant total via l'application <strong>WAVE</strong> au :
                </p>
                <div className="bg-white p-4 rounded-xl border border-blue-200 text-center">
                  <span className="text-2xl font-black text-slate-900 tracking-wider">+225 05 55 00 78 84</span>
                  <p className="text-[10px] text-blue-500 font-bold uppercase mt-1">Titulaire: ABEL C.</p>
                </div>
              </div>
            </div>

            {/* UPLOAD RECEIPT */}
            <div className="space-y-4">
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400">
                Upload Transaction Screenshot / Capture d'Ã©cran
              </label>
              <div 
                onClick={() => setIsUploaded(true)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isUploaded ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-400'}`}
              >
                {isUploaded ? (
                  <div className="flex flex-col items-center text-green-600">
                    <CheckCircle size={40} className="mb-2" />
                    <p className="font-bold">Receipt Uploaded Successfully!</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                    <p className="text-xs text-slate-500 font-medium italic">Cliquez pour joindre le reÃ§u de paiement</p>
                  </>
                )}
              </div>
            </div>

            <button 
              disabled={!isUploaded}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg ${isUploaded ? 'bg-slate-900 text-white hover:bg-blue-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              Verify Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
