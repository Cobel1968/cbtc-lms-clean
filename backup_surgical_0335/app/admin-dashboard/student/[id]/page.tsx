'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import jsPDF from 'jspdf';

export default function StudentProfile({ params }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await supabase.from('user_profiles').select('*, modules(*)').eq('id', params.id).single();
            setProfile(data);
        }
        fetchProfile();
    }, [params.id]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Cobel Business Training Center', 20, 20);
        doc.setFontSize(12);
        doc.text(`Official Vocational Report: ${profile.full_name}`, 20, 30);
        doc.line(20, 35, 190, 35);

        doc.text(`Bilingual Technical Fluency: ${Math.round(profile.fluency_score)}%`, 20, 50);
        doc.text(`Predicted Training Timeframe: ${profile.predicted_timeframe}`, 20, 60);
        doc.text(`Curriculum Density: ${profile.curriculum_density}`, 20, 70);

        doc.text('Extracted Technical Terms:', 20, 90);
        const terms = profile.handwritten_extraction?.join(', ') || 'None';
        doc.text(terms, 20, 100, { maxWidth: 170 });

        doc.save(`${profile.full_name}_Cobel_Report.pdf`);
    };

    if (!profile) return <div className="p-20 text-center">Finalizing Report Data...</div>;

    return (
        <div className="max-w-6xl mx-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">{profile.full_name}</h1>
                        <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Vocation Analytics</p>
                    </div>
                    <button 
                        onClick={generatePDF}
                        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Download PDF Report
                    </button>
                </div>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 bg-white border rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-400 uppercase font-bold">Fluency Score</p>
                        <p className="text-3xl font-black">{Math.round(profile.fluency_score)}%</p>
                    </div>
                    <div className="p-6 bg-white border rounded-2xl shadow-sm">
                        <p className="text-xs text-slate-400 uppercase font-bold">Timeframe Prediction</p>
                        <p className="text-3xl font-black">{profile.predicted_timeframe}</p>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-3xl">
                    <h3 className="font-bold text-blue-400 mb-4">Extracted Technical Terms</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.handwritten_extraction?.map((term, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-sm font-mono text-blue-200">
                                {term}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Analog Source Document</h3>
                {profile.document_url ? (
                    <div className="border-4 border-white shadow-2xl rounded-xl overflow-hidden bg-slate-200">
                        <img src={profile.document_url} alt="Physical Evidence" className="w-full h-auto" />
                    </div>
                ) : (
                    <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed">
                        <p className="text-slate-400 text-sm">No scan attached.</p>
                    </div>
                )}
            </div>
        </div>
    );
}