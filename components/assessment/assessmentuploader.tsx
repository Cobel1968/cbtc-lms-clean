'use client';
import React, { useState } from 'react';

export default function AssessmentUploader({ userId }: { userId: string }) {
    const [imgData, setImgData] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImgData(event.target?.result as string);
            
            // Simulate Cobel AI Engine: Solving Knowledge Gaps
            setTimeout(() => {
                setAnalysisResult({
                    grade: "18.5 / 20",
                    status: "Validated",
                    terms: ["Atelier", "Équipement", "Maintenance"],
                    feedback: "Bilingual technical fluency is high. Handwriting matches vocational standards."
                });
                setIsAnalyzing(false);
            }, 1200);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ 
            display: 'flex', 
            gap: '20px', 
            background: '#ffffff', 
            border: '2px solid #e2e8f0', 
            borderRadius: '16px', 
            padding: '20px',
            minHeight: '300px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
            {/* COLUMN 1: CONTROLS & STATUS (Left) */}
            <div style={{ flex: '1', borderRight: '1px solid #f1f5f9', paddingRight: '20px' }}>
                <h3 style={{ fontSize: '16px', color: '#2563eb', marginBottom: '5px' }}> Analog-to-Digital Bridge</h3>
                <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '20px' }}>Upload physical assessment for digital profile update.</p>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Scan Assessment:</label>
                    <input type="file" onChange={handleFile} accept="image/*" style={{ fontSize: '12px', width: '100%' }} />
                </div>

                {isAnalyzing && <p style={{ color: '#2563eb', fontSize: '12px', fontWeight: 'bold' }}> AI Engine Analyzing...</p>}

                {analysisResult && (
                    <div style={{ background: '#f0fdf4', border: '1px solid #16a34a', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Note:</span>
                            <span style={{ fontSize: '18px', fontWeight: '900', color: '#166534' }}>{analysisResult.grade}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#15803d', marginTop: '8px' }}>{analysisResult.feedback}</p>
                    </div>
                )}
            </div>

            {/* COLUMN 2: THE EVIDENCE VIEW (Right) */}
            <div style={{ flex: '1.5', background: '#f8fafc', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #cbd5e1' }}>
                {imgData ? (
                    <div style={{ width: '100%' }}>
                        <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px', textAlign: 'center' }}>PROUVE DE L'ÉVALUATION (EVIDENCE)</p>
                        <img 
                            src={imgData} 
                            alt="Scanned Evidence" 
                            style={{ 
                                width: '100%', 
                                maxHeight: '250px', 
                                objectFit: 'contain', 
                                borderRadius: '8px',
                                border: '3px solid #fff',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }} 
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <p style={{ fontSize: '12px' }}>Waiting for Scan Evidence...</p>
                        <p style={{ fontSize: '10px' }}>Physical work will appear here to justify the grade.</p>
                    </div>
                )}
            </div>
        </div>
    );
}