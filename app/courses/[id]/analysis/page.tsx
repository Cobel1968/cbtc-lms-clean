'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseProvider';

export default function EmbeddedAnalysisPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [preview, setPreview] = useState(null);
    const [results, setResults] = useState(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }, []);

    const handleAnalysis = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (f) => {
            setPreview(f.target.result);
            // Simulate the "Cobel AI Engine" extraction delay
            setTimeout(() => {
                setResults({
                    score: 18.5,
                    terms: ["Atelier", "Maintenance", "Sécurité"],
                    accuracy: 98.2
                });
            }, 1000);
        };
        reader.readAsDataURL(file);
    };

    const saveAndClose = async () => {
        if (!user) { alert("Session expirée. Veuillez vous reconnecter."); return; }
        
        const { error } = await supabase.from('user_progress').upsert({
            user_id: user.id,
            course_id: params.id || 'Generic_Course',
            last_score: results.score,
            technical_terms_mastered: results.terms,
            ocr_accuracy: results.accuracy
        });

        if (!error) {
            alert(" Données synchronisées au profil digital.");
            router.push('/diagnostic');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#1e40af' }}>Module d'Analyse de l'Évaluation : {params.id}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px', height: '70vh' }}>
                {/* EMBEDDED ANALYSIS WINDOW */}
                <div style={{ background: '#0f172a', borderRadius: '12px', overflow: 'hidden', border: '4px solid #334155', position: 'relative' }}>
                    {preview ? (
                        <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                            <p>Fenêtre d'Analyse Vide</p>
                            <input type="file" onChange={handleAnalysis} accept="image/*" />
                        </div>
                    )}
                </div>

                {/* EXTRACTION SIDEBAR */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3>Résultats IA</h3>
                    {results ? (
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>{results.score}/20</div>
                            <p style={{ fontSize: '12px', color: '#64748b' }}>Précision OCR: {results.accuracy}%</p>
                            
                            <h4 style={{ marginTop: '20px' }}>Termes Identifiés:</h4>
                            <ul style={{ paddingLeft: '20px' }}>
                                {results.terms.map(t => <li key={t}>{t}</li>)}
                            </ul>

                            <button onClick={saveAndClose} style={{ width: '100%', marginTop: '30px', padding: '15px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                                Valider & Quitter
                            </button>
                        </div>
                    ) : (
                        <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>En attente de document...</p>
                    )}
                </div>
            </div>
        </div>
    );
}