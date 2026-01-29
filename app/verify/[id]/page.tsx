'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function VerifyProvenance({ params }) {
    const [record, setRecord] = useState(null);
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        async function checkAuthenticity() {
            const { data, error } = await supabase
                .from('user_progress')
                .select('*')
                .eq('id', params.id)
                .single();

            if (data) {
                setRecord(data);
                setStatus('AUTHENTICATED');
            } else {
                setStatus('INVALID RECORD');
            }
        }
        checkAuthenticity();
    }, [params.id]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', fontFamily: 'sans-serif' }}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>{status === 'AUTHENTICATED' ? '' : ''}</div>
                <h1 style={{ color: status === 'AUTHENTICATED' ? '#16a34a' : '#ef4444' }}>{status}</h1>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
                
                {record && (
                    <div style={{ textAlign: 'left' }}>
                        <p><strong>Apprenant ID:</strong> {record.user_id.substring(0,8)}...</p>
                        <p><strong>Cours:</strong> {record.course_id}</p>
                        <p><strong>Score Validé:</strong> {record.last_score}/20</p>
                        <p><strong>Origine des données:</strong> Cobel AI Analog-to-Digital Bridge</p>
                    </div>
                )}
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '30px' }}>Système de Formation Cobel Business Training Center (LMS)</p>
            </div>
        </div>
    );
}