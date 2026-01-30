&apos;use client&apos;;
import { useState } from &apos;react&apos;;
import { Smartphone, CheckCircle, Upload, ArrowLeft } from &apos;lucide-react&apos;;
import Link from &apos;next/link&apos;;

export default function CheckoutPage() {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className=&quot;min-h-screen bg-slate-50 p-4 md:p-8&quot;>
      <div className=&quot;max-w-2xl mx-auto&quot;>
        <Link href=&quot;/cart&quot; className=&quot;flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-bold transition-colors&quot;>
          <ArrowLeft size={20} /> Back to Cart
        </Link>

        <div className=&quot;bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden&quot;>
          <div className=&quot;bg-[#1cb4ff] p-8 text-white&quot;>
            <h1 className=&quot;text-3xl font-black uppercase italic tracking-tighter&quot;>Wave Payment</h1>
            <p className=&quot;opacity-90 font-bold uppercase text-xs tracking-widest&quot;>Cobel AI Training Center (LMS)</p>
          </div>

          <div className=&quot;p-8 space-y-8&quot;>
            {/* WAVE SPECIFIC INSTRUCTIONS */}
            <div className=&quot;p-6 border-2 border-[#1cb4ff] rounded-2xl bg-blue-50/50&quot;>
              <div className=&quot;flex items-center gap-4 mb-4&quot;>
                <div className=&quot;bg-[#1cb4ff] p-2 rounded-lg text-white&quot;>
                  <Smartphone size={24} />
                </div>
                <h2 className=&quot;text-xl font-black text-slate-900 uppercase&quot;>Instructions</h2>
              </div>
              
              <div className=&quot;space-y-4&quot;>
                <p className=&quot;text-sm text-slate-700 leading-relaxed&quot;>
                  Envoyez le montant total via l&apos;application <strong>WAVE</strong> au :
                </p>
                <div className=&quot;bg-white p-4 rounded-xl border border-blue-200 text-center&quot;>
                  <span className=&quot;text-2xl font-black text-slate-900 tracking-wider&quot;>+225 05 55 00 78 84</span>
                  <p className=&quot;text-[10px] text-blue-500 font-bold uppercase mt-1&quot;>Titulaire: ABEL C.</p>
                </div>
              </div>
            </div>

            {/* UPLOAD RECEIPT */}
            <div className=&quot;space-y-4&quot;>
              <label className=&quot;block text-sm font-black uppercase tracking-widest text-slate-400&quot;>
                Upload Transaction Screenshot / Capture d&apos;écran
              </label>
              <div 
                onClick={() => setIsUploaded(true)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isUploaded ? &apos;border-green-500 bg-green-50&apos; : &apos;border-slate-200 bg-slate-50 hover:border-blue-400&apos;}`}
              >
                {isUploaded ? (
                  <div className=&quot;flex flex-col items-center text-green-600&quot;>
                    <CheckCircle size={40} className=&quot;mb-2&quot; />
                    <p className=&quot;font-bold&quot;>Receipt Uploaded Successfully!</p>
                  </div>
                ) : (
                  <>
                    <Upload className=&quot;mx-auto text-slate-300 mb-2&quot; size={32} />
                    <p className=&quot;text-xs text-slate-500 font-medium italic&quot;>Cliquez pour joindre le reçu de paiement</p>
                  </>
                )}
              </div>
            </div>

            <button 
              disabled={!isUploaded}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg ${isUploaded ? &apos;bg-slate-900 text-white hover:bg-blue-600&apos; : &apos;bg-slate-200 text-slate-400 cursor-not-allowed&apos;}`}
            >
              Verify Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
