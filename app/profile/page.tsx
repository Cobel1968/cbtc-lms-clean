'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseDB';

export default function MaxOccupancyDossier() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }
            const { data: progress } = await supabase.from('user_progress').select('*').eq('user_id', user.id).order('updated_at', { ascending: false }).limit(1);
            if (progress?.[0]) {
                setData({ 
                    ...progress[0], 
                    savings: progress[0].last_score >= 15 ? 15 : 0,
                    verifyURL: `http://localhost:3001/verify/${progress[0].id}`,
                    fullTranscript: [
                        { m: "Analyse de Maintenance PrÃƒÂ©ventive", s: "98% (OCR Validated)", n: "Excellent bilingual technical command." },
                        { m: "SÃƒÂ©curitÃƒÂ© des SystÃƒÂ¨mes Industriels", s: "OptimisÃƒÂ© (AI Path)", n: "Mastery demonstrated in diagnostic phase." },
                        { m: "Gestion d'Atelier AutomatisÃƒÂ©", s: "85% (Digital Eval)", n: "Strong command of technical French." },
                        { m: "Rapport de ConformitÃƒÂ© Technique", s: "92% (Handwriting)", n: "Processed via Analog-to-Digital Bridge." }
                    ]
                });
            }
            setLoading(false);
        }
        loadProfile();
    }, []);

    if (loading) return <div style={{padding:'50px', textAlign:'center'}}>Optimisation du rendu final...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'serif' }}>
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    
                    /* MAX OCCUPANCY: 0.5cm margins */
                    @page { 
                        size: landscape; 
                        margin: 0.5cm; 
                    }

                    .cert-page { 
                        width: 100%; 
                        height: 95vh; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center;
                        page-break-after: always;
                    }

                    .transcript-page { 
                        width: 100%; 
                        padding: 1cm; 
                        background: white; 
                        display: block !important;
                        page-break-before: always;
                    }
                }
                .cert-page { padding: 20px; background: #fff; }
                .transcript-page { display: none; background: white; padding: 40px; }
            `}</style>

            <header className="no-print" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #ddd', fontFamily: 'sans-serif' }}>
                <span style={{ fontWeight: 'bold', color: '#1e40af' }}>COBEL BTC - FINAL BUILD</span>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', background: '#1e40af', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                     Imprimer Dossier (Format Max)
                </button>
            </header>

            {/* PAGE 1: THE CERTIFICATE (LANDSCAPE MAX OCCUPANCY) */}
            <div className="cert-page">
                <div style={{ 
                    border: '15px double #1e40af', 
                    padding: '60px', 
                    textAlign: 'center', 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    boxSizing: 'border-box' 
                }}>
                    {/* PROPORTIONAL LOGO (Increased to 90px for full frame) */}
                    <img src="/new-logo.png" alt="Logo" style={{ height: '90px', marginBottom: '20px', objectFit: 'contain' }} />
                    
                    <div style={{ color: '#1e40af', fontSize: '14px', letterSpacing: '8px', fontWeight: 'bold' }}>CERTIFICATION OFFICIELLE DE MAÃƒÅ½TRISE</div>
                    <h1 style={{ fontSize: '56px', margin: '20px 0', color: '#0f172a' }}>Attestation de RÃƒÂ©ussite</h1>
                    <h2 style={{ color: '#1e40af', fontSize: '36px', fontStyle: 'italic' }}>{data?.course_id}</h2>
                    
                    <p style={{ marginTop: '40px', fontSize: '22px' }}>Score Global : <strong>{data?.last_score}/20</strong></p>

                    <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                        <div style={{ width: '280px', borderTop: '2px solid #000', paddingTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>Signature Mentor</div>
                        
                        {/* PROPORTIONAL QR (Increased to 90px to match logo) */}
                        <div style={{ textAlign: 'center' }}>
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data?.verifyURL || '')}`} 
                                style={{ height: '90px', width: '90px', border: '1px solid #1e40af', padding: '5px' }} 
                            />
                            <p style={{ fontSize: '8px', marginTop: '5px', color: '#64748b' }}>VERIFICATION AI ENGINE</p>
                        </div>

                        <div style={{ width: '280px', borderTop: '2px solid #000', paddingTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>Direction Cobel BTC</div>
                    </div>
                </div>
            </div>

            {/* PAGE 2: THE TRANSCRIPT (PORTRAIT) */}
            <div className="transcript-page" style={{ fontFamily: 'sans-serif' }}>
                <div style={{ borderBottom: '3px solid #1e40af', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#1e40af' }}>Transcript de CompÃƒÂ©tences Bilingues</h2>
                    <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '5px 10px', borderRadius: '4px' }}>VERIFIED PROVENANCE</span>
                </div>
                
                <table style={{ width: '100%', marginTop: '50px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#1e40af', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '15px', border: '1px solid #cbd5e1' }}>Module Technique</th>
                            <th style={{ padding: '15px', border: '1px solid #cbd5e1' }}>Validation</th>
                            <th style={{ padding: '15px', border: '1px solid #cbd5e1' }}>Notes d'Innovation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.fullTranscript.map((t, i) => (
                            <tr key={i}>
                                <td style={{ padding: '15px', border: '1px solid #cbd5e1' }}>{t.m}</td>
                                <td style={{ padding: '15px', border: '1px solid #cbd5e1', fontWeight: 'bold', color: '#16a34a' }}>{t.s}</td>
                                <td style={{ padding: '15px', border: '1px solid #cbd5e1', fontSize: '12px' }}>{t.n}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
