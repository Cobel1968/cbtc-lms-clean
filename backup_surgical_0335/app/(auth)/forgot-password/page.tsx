'use client';
import { useState } from 'react';
import { requestPasswordReset } from '@/lib/supabase';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await requestPasswordReset(email);
    
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Recovery link sent! Check your inbox.' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Enter your email to reset your Cobel Training credentials.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
            {message.text}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}