'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else router.push('/diagnostic'); // Direct entry to the pedagogical engine
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <form onSubmit={handleLogin} style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ color: '#1e40af', marginBottom: '10px', textAlign: 'center' }}>Cobel LMS</h1>
                <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '30px' }}>Centre de Formation Business</p>
                
                {error && <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mot de passe</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} required />
                </div>
                
                <button type="submit" style={{ width: '100%', padding: '12px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Se Connecter
                </button>
            </form>
        </div>
    );
}