'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseDB';

export default function IntegrityAudit() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAuditData() {
            const { data, error } = await supabase
                .from('user_progress')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (!error) setRecords(data);
            setLoading(false);
        }
        fetchAuditData();
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '900' }}>Integrity Audit Dashboard</h1>
                <p style={{ color: '#64748b' }}>Feature 4: Analog-to-Digital Pedagogical Bridge Monitoring</p>
            </header>

            <div style={{ display: 'grid', gap: '20px' }}>
                {records.map((r) => (
                    <div key={r.id} style={{ background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Module {r.module_id}</span>
                                <span style={{ padding: '4px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                                    SCORE: {r.fluency_score}%
                                </span>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>User ID: {r.user_id}</p>
                            
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {r.extracted_terms?.map((term, i) => (
                                    <span key={i} style={{ padding: '6px 14px', background: '#f1f5f9', borderRadius: '8px', fontSize: '13px', border: '1px solid #cbd5e1' }}>
                                        <strong>{term.lang}:</strong> {term.term}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <a href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assessments/${r.document_url}`} 
                               target="_blank" 
                               style={{ display: 'inline-block', padding: '12px 24px', background: '#000', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                                VIEW PHYSICAL EVIDENCE
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {records.length === 0 && !loading && <p>No technical nodes mapped yet.</p>}
        </div>
    );
}