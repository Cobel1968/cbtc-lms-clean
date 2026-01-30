'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, User, Mail, Lock, ShieldCheck, Loader2 , AlertCircle} from 'lucide-react';
// âœ… Corrected: Importing the named export 'supabase' from the client library
import { supabase } from '@/lib/supabaseProvider';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Split full name into first and last name for technical profile mapping
      const nameParts = formData.name.trim().split(' ');
      const first_name = nameParts[0] || '';
      const last_name = nameParts.slice(1).join(' ') || '';

      // 1. Create the Auth User in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name,
            last_name,
            full_name: formData.name,
          },
        },
      });

      if (authError) throw authError;

      // 2. Redirect to the Dashboard 
      // This begins the Multi-Dimensional Diagnostic to establish Knowledge Gaps
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration / Une erreur est survenue');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden">
        <div className="p-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
              <Zap className="text-white" size={32} fill="white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Join Cobel AI</h1>
            <p className="text-slate-400 text-sm font-medium">Create your vocational profile / CrÃ©er votre profil</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold">
                {error}
              </div>
            )}
            
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-300" size={18} />
              <input
                name="name"
                type="text"
                placeholder="Full Name / Nom Complet"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium text-sm text-slate-900"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email Address / Adresse E-mail"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium text-sm text-slate-900"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
              <input
                name="password"
                type="password"
                placeholder="Create Access Key / Mot de passe"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium text-sm text-slate-900"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <ShieldCheck size={18} />
              )}
              {isLoading ? "Processing..." : "Register / S'inscrire"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account? / DÃ©jÃ  un compte?{' '}
              <Link href="/login" className="text-indigo-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Cobel Business Training Center (LMS)
          </p>
        </div>
      </div>
    </div>
  );
}
