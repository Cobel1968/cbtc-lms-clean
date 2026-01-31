'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TrainerOversight() {
    const [stats, setStats] = useState([]);
    
    useEffect(() => {
        async function fetchMetrics() {
            try {
                const { data, error } = await supabase
                    .from('user_progress')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // SIMULATED FORECASTING ALGORITHM [cite: 2026-01-01]
                const optimizedData = data.map(item => {
                    const velocity = item.fluency_score / 100;
                    const daysRemaining = Math.floor(30 / (velocity || 1));
                    const forecast = new Date();
                    forecast.setDate(forecast.getDate() + daysRemaining);
                    
                    return { ...item, forecast: forecast.toLocaleDateString() };
                });

                setStats(optimizedData);
            } catch (err) {
                console.error("Forecasting Failure:", err);
                // [2026-01-15] Rollback: Prevent UI crashes
                setStats([]);
            }
        }
        fetchMetrics();
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '900' }}>Trainer Oversight</h1>
                <div style={{ background: '#000', color: '#fff', padding: '10px 25px', borderRadius: '30px', fontWeight: 'bold' }}>
                    191 ACTIVE NODES
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '20px', background: '#f1f5f9', fontWeight: 'bold' }}>
                    <div>Student Identity</div>
                    <div>Fluency</div>
                    <div>Projected Completion</div>
                    <div style={{ textAlign: 'right' }}>Status</div>
                </div>

                {stats.map((s) => (
                    <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '25px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Guest {s.user_id.slice(0,8)}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Module: {s.module_id}</div>
                        </div>
                        <div style={{ color: '#16a34a', fontWeight: '900' }}>{s.fluency_score}%</div>
                        <div style={{ fontWeight: '500', color: '#2563eb' }}>{s.forecast}</div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ padding: '5px 15px', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                {s.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}