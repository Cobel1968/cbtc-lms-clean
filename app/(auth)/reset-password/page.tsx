'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { finalizePasswordReset } from '@/lib/supabaseDB';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await finalizePasswordReset(password);
    
    if (error) {
      setStatus('Failed: ' + error.message);
      setLoading(false);
    } else {
      setStatus('Success! Redirecting to your track...');
      setTimeout(() => router.push('/selection-vocational-track'), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password (min 10 characters)"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={10}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Save and Continue'}
          </button>
        </form>
        {status && <p className="mt-4 text-center text-sm font-medium text-green-600">{status}</p>}
      </div>
    </div>
  );
}