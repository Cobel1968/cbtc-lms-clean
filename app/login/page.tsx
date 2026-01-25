'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, ShieldCheck, Zap, Loader2, AlertCircle as AlertIcon, Terminal } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient' 
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()
  
  const { language } = useLanguage() || { language: 'en', t: (k: any) => k };

  // ✅ New: Verification trigger to bypass hanging login sessions
  const handleTestPipeline = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setErrorMsg(error.message);
    else setErrorMsg("Check email: Verification link sent to bypass gateway.");
    setLoading(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      // ✅ Use replace instead of push to prevent back-button loops in middleware
      router.replace('/dashboard')
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden">
        <div className="p-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
              <Zap className="text-white" size={32} fill="white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Cobel AI Engine</h1>
            <p className="text-slate-400 text-sm font-medium">
              {language === 'fr' ? "Portail d'Innovation Vocationnelle (2026)" : "Vocational Innovation Portal (2026)"}
            </p>
          </div>

          {errorMsg && (
            <div className={`mb-6 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              errorMsg.includes("sent") ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
            }`}>
              <AlertIcon size={14} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium text-sm text-slate-900"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Access Key / Mot de passe" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium text-sm text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                {loading ? "Authenticating..." : "Secure Access / Connexion"}
              </button>

              {/* ✅ TEST PIPELINE BUTTON: Used to clear "hanging" sessions via Magic Link */}
              <button 
                type="button"
                onClick={handleTestPipeline}
                className="w-full py-3 bg-white text-slate-500 border border-slate-200 rounded-2xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <Terminal size={14} />
                Repair Session / Debug Redirect
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-slate-50 p-6 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Bilingual Technical Mapping Validated
          </p>
        </div>
      </div>
    </div>
  );
}