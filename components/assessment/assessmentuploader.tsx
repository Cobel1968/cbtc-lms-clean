&apos;use client&apos;;
import React, { useState } from &apos;react&apos;;

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
                    grade: &quot;18.5 / 20&quot;,
                    status: &quot;Validated&quot;,
                    terms: [&quot;Atelier&quot;, &quot;Équipement&quot;, &quot;Maintenance&quot;],
                    feedback: &quot;Bilingual technical fluency is high. Handwriting matches vocational standards.&quot;
                });
                setIsAnalyzing(false);
            }, 1200);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ 
            display: &apos;flex&apos;, 
            gap: &apos;20px&apos;, 
            background: &apos;#ffffff&apos;, 
            border: &apos;2px solid #e2e8f0&apos;, 
            borderRadius: &apos;16px&apos;, 
            padding: &apos;20px&apos;,
            minHeight: &apos;300px&apos;,
            boxShadow: &apos;0 10px 15px -3px rgba(0, 0, 0, 0.1)&apos;
        }}>
            {/* COLUMN 1: CONTROLS & STATUS (Left) */}
            <div style={{ flex: &apos;1&apos;, borderRight: &apos;1px solid #f1f5f9&apos;, paddingRight: &apos;20px&apos; }}>
                <h3 style={{ fontSize: &apos;16px&apos;, color: &apos;#2563eb&apos;, marginBottom: &apos;5px&apos; }}> Analog-to-Digital Bridge</h3>
                <p style={{ fontSize: &apos;11px&apos;, color: &apos;#64748b&apos;, marginBottom: &apos;20px&apos; }}>Upload physical assessment for digital profile update.</p>
                
                <div style={{ marginBottom: &apos;20px&apos; }}>
                    <label style={{ display: &apos;block&apos;, fontSize: &apos;12px&apos;, fontWeight: &apos;bold&apos;, marginBottom: &apos;8px&apos; }}>Scan Assessment:</label>
                    <input type=&quot;file&quot; onChange={handleFile} accept=&quot;image/*&quot; style={{ fontSize: &apos;12px&apos;, width: &apos;100%&apos; }} />
                </div>

                {isAnalyzing && <p style={{ color: &apos;#2563eb&apos;, fontSize: &apos;12px&apos;, fontWeight: &apos;bold&apos; }}> AI Engine Analyzing...</p>}

                {analysisResult && (
                    <div style={{ background: &apos;#f0fdf4&apos;, border: &apos;1px solid #16a34a&apos;, padding: &apos;15px&apos;, borderRadius: &apos;8px&apos; }}>
                        <div style={{ display: &apos;flex&apos;, justifyContent: &apos;space-between&apos;, alignItems: &apos;center&apos; }}>
                            <span style={{ fontSize: &apos;14px&apos;, fontWeight: &apos;bold&apos; }}>Note:</span>
                            <span style={{ fontSize: &apos;18px&apos;, fontWeight: &apos;900&apos;, color: &apos;#166534&apos; }}>{analysisResult.grade}</span>
                        </div>
                        <p style={{ fontSize: &apos;11px&apos;, color: &apos;#15803d&apos;, marginTop: &apos;8px&apos; }}>{analysisResult.feedback}</p>
                    </div>
                )}
            </div>

            {/* COLUMN 2: THE EVIDENCE VIEW (Right) */}
            <div style={{ flex: &apos;1.5&apos;, background: &apos;#f8fafc&apos;, borderRadius: &apos;12px&apos;, padding: &apos;15px&apos;, display: &apos;flex&apos;, flexDirection: &apos;column&apos;, justifyContent: &apos;center&apos;, alignItems: &apos;center&apos;, border: &apos;2px dashed #cbd5e1&apos; }}>
                {imgData ? (
                    <div style={{ width: &apos;100%&apos; }}>
                        <p style={{ fontSize: &apos;10px&apos;, fontWeight: &apos;bold&apos;, color: &apos;#2563eb&apos;, marginBottom: &apos;10px&apos;, textAlign: &apos;center&apos; }}>PROUVE DE L&apos;ÉVALUATION (EVIDENCE)</p>
                        <img 
                            src={imgData} 
                            alt=&quot;Scanned Evidence&quot; 
                            style={{ 
                                width: &apos;100%&apos;, 
                                maxHeight: &apos;250px&apos;, 
                                objectFit: &apos;contain&apos;, 
                                borderRadius: &apos;8px&apos;,
                                border: &apos;3px solid #fff&apos;,
                                boxShadow: &apos;0 4px 6px rgba(0,0,0,0.1)&apos;
                            }} 
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: &apos;center&apos;, color: &apos;#94a3b8&apos; }}>
                        <p style={{ fontSize: &apos;12px&apos; }}>Waiting for Scan Evidence...</p>
                        <p style={{ fontSize: &apos;10px&apos; }}>Physical work will appear here to justify the grade.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
