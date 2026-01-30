&apos;use client&apos;;
import React, { useState, useEffect } from &apos;react&apos;;
import { supabase } from &apos;@/lib/supabaseDB&apos;;

export default function MaxOccupancyDossier() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }
            const { data: progress } = await supabase.from(&apos;user_progress&apos;).select(&apos;*&apos;).eq(&apos;user_id&apos;, user.id).order(&apos;updated_at&apos;, { ascending: false }).limit(1);
            if (progress?.[0]) {
                setData({ 
                    ...progress[0], 
                    savings: progress[0].last_score >= 15 ? 15 : 0,
                    verifyURL: `http://localhost:3001/verify/${progress[0].id}`,
                    fullTranscript: [
                        { m: &quot;Analyse de Maintenance PrÃ©ventive&quot;, s: &quot;98% (OCR Validated)&quot;, n: &quot;Excellent bilingual technical command.&quot; },
                        { m: &quot;SÃ©curitÃ© des SystÃ¨mes Industriels&quot;, s: &quot;OptimisÃ© (AI Path)&quot;, n: &quot;Mastery demonstrated in diagnostic phase.&quot; },
                        { m: &quot;Gestion d&apos;Atelier AutomatisÃ©&quot;, s: &quot;85% (Digital Eval)&quot;, n: &quot;Strong command of technical French.&quot; },
                        { m: &quot;Rapport de ConformitÃ© Technique&quot;, s: &quot;92% (Handwriting)&quot;, n: &quot;Processed via Analog-to-Digital Bridge.&quot; }
                    ]
                });
            }
            setLoading(false);
        }
        loadProfile();
    }, []);

    if (loading) return <div style={{padding:&apos;50px&apos;, textAlign:&apos;center&apos;}}>Optimisation du rendu final...</div>;

    return (
        <div style={{ minHeight: &apos;100vh&apos;, background: &apos;#f1f5f9&apos;, fontFamily: &apos;serif&apos; }}>
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

            <header className=&quot;no-print&quot; style={{ padding: &apos;20px&apos;, display: &apos;flex&apos;, justifyContent: &apos;space-between&apos;, background: &apos;#fff&apos;, borderBottom: &apos;1px solid #ddd&apos;, fontFamily: &apos;sans-serif&apos; }}>
                <span style={{ fontWeight: &apos;bold&apos;, color: &apos;#1e40af&apos; }}>COBEL BTC - FINAL BUILD</span>
                <button onClick={() => window.print()} style={{ padding: &apos;10px 20px&apos;, background: &apos;#1e40af&apos;, color: &apos;#fff&apos;, border: &apos;none&apos;, borderRadius: &apos;5px&apos;, cursor: &apos;pointer&apos;, fontWeight: &apos;bold&apos; }}>
                     Imprimer Dossier (Format Max)
                </button>
            </header>

            {/* PAGE 1: THE CERTIFICATE (LANDSCAPE MAX OCCUPANCY) */}
            <div className=&quot;cert-page&quot;>
                <div style={{ 
                    border: &apos;15px double #1e40af&apos;, 
                    padding: &apos;60px&apos;, 
                    textAlign: &apos;center&apos;, 
                    width: &apos;100%&apos;, 
                    height: &apos;100%&apos;, 
                    display: &apos;flex&apos;, 
                    flexDirection: &apos;column&apos;, 
                    justifyContent: &apos;center&apos;,
                    boxSizing: &apos;border-box&apos; 
                }}>
                    {/* PROPORTIONAL LOGO (Increased to 90px for full frame) */}
                    <img src=&quot;/new-logo.png&quot; alt=&quot;Logo&quot; style={{ height: &apos;90px&apos;, marginBottom: &apos;20px&apos;, objectFit: &apos;contain&apos; }} />
                    
                    <div style={{ color: &apos;#1e40af&apos;, fontSize: &apos;14px&apos;, letterSpacing: &apos;8px&apos;, fontWeight: &apos;bold&apos; }}>CERTIFICATION OFFICIELLE DE MAÃŽTRISE</div>
                    <h1 style={{ fontSize: &apos;56px&apos;, margin: &apos;20px 0&apos;, color: &apos;#0f172a&apos; }}>Attestation de RÃ©ussite</h1>
                    <h2 style={{ color: &apos;#1e40af&apos;, fontSize: &apos;36px&apos;, fontStyle: &apos;italic&apos; }}>{data?.course_id}</h2>
                    
                    <p style={{ marginTop: &apos;40px&apos;, fontSize: &apos;22px&apos; }}>Score Global : <strong>{data?.last_score}/20</strong></p>

                    <div style={{ marginTop: &apos;80px&apos;, display: &apos;flex&apos;, justifyContent: &apos;space-between&apos;, alignItems: &apos;center&apos;, padding: &apos;0 40px&apos; }}>
                        <div style={{ width: &apos;280px&apos;, borderTop: &apos;2px solid #000&apos;, paddingTop: &apos;15px&apos;, fontSize: &apos;14px&apos;, fontWeight: &apos;bold&apos; }}>Signature Mentor</div>
                        
                        {/* PROPORTIONAL QR (Increased to 90px to match logo) */}
                        <div style={{ textAlign: &apos;center&apos; }}>
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data?.verifyURL || &apos;&apos;)}`} 
                                style={{ height: &apos;90px&apos;, width: &apos;90px&apos;, border: &apos;1px solid #1e40af&apos;, padding: &apos;5px&apos; }} 
                            />
                            <p style={{ fontSize: &apos;8px&apos;, marginTop: &apos;5px&apos;, color: &apos;#64748b&apos; }}>VERIFICATION AI ENGINE</p>
                        </div>

                        <div style={{ width: &apos;280px&apos;, borderTop: &apos;2px solid #000&apos;, paddingTop: &apos;15px&apos;, fontSize: &apos;14px&apos;, fontWeight: &apos;bold&apos; }}>Direction Cobel BTC</div>
                    </div>
                </div>
            </div>

            {/* PAGE 2: THE TRANSCRIPT (PORTRAIT) */}
            <div className=&quot;transcript-page&quot; style={{ fontFamily: &apos;sans-serif&apos; }}>
                <div style={{ borderBottom: &apos;3px solid #1e40af&apos;, paddingBottom: &apos;10px&apos;, display: &apos;flex&apos;, justifyContent: &apos;space-between&apos;, alignItems: &apos;center&apos; }}>
                    <h2 style={{ margin: 0, color: &apos;#1e40af&apos; }}>Transcript de CompÃ©tences Bilingues</h2>
                    <span style={{ fontSize: &apos;12px&apos;, background: &apos;#f1f5f9&apos;, padding: &apos;5px 10px&apos;, borderRadius: &apos;4px&apos; }}>VERIFIED PROVENANCE</span>
                </div>
                
                <table style={{ width: &apos;100%&apos;, marginTop: &apos;50px&apos;, borderCollapse: &apos;collapse&apos; }}>
                    <thead>
                        <tr style={{ background: &apos;#1e40af&apos;, color: &apos;white&apos;, textAlign: &apos;left&apos; }}>
                            <th style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos; }}>Module Technique</th>
                            <th style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos; }}>Validation</th>
                            <th style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos; }}>Notes d&apos;Innovation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.fullTranscript.map((t, i) => (
                            <tr key={i}>
                                <td style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos; }}>{t.m}</td>
                                <td style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos;, fontWeight: &apos;bold&apos;, color: &apos;#16a34a&apos; }}>{t.s}</td>
                                <td style={{ padding: &apos;15px&apos;, border: &apos;1px solid #cbd5e1&apos;, fontSize: &apos;12px&apos; }}>{t.n}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
