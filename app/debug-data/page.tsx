'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseProvider';

export default function HydrationSafeAudit() {
    const [report, setReport] = useState({ modules: [], loading: true, error: null });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        async function checkData() {
            try {
                const { data: modules, error } = await supabase.from('modules').select('*');
                if (error) throw error;

                const checks = (modules || []).map(m => {
                    let questions = [];
                    try {
                        questions = typeof m.category === 'string' ? JSON.parse(m.category) : (m.category || []);
                    } catch (e) { questions = []; }
                    
                    return {
                        name: m.title_en || 'Unnamed Module',
                        count: Array.isArray(questions) ? questions.length : 0
                    };
                });
                setReport({ modules: checks, loading: false, error: null });
            } catch (err) {
                setReport({ modules: [], loading: false, error: err.message });
            }
        }
        checkData();
    }, []);

    // Prevent hydration mismatch by not rendering the table until client-side
    if (!isClient || report.loading) return <div style={{padding:'50px'}}>Connecting to Cobel AI Engine...</div>;

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ color: '#2563eb' }}>ðŸ“¡ Cobel AI Engine: Final Data Sync</h1>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2 style={{ margin: '0' }}>Total Questions Found: {report.modules.reduce((a, b) => a + b.count, 0)} / 191</h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#334155', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Module Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Count</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {report.modules.map((m, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f1f5f9' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{m.name}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{m.count}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', color: m.count > 0 ? '#059669' : '#dc2626' }}>
                                {m.count > 0 ? 'âœ… LIVE' : 'âŒ EMPTY'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}