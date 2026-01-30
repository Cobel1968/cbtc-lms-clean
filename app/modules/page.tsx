'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseDB';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function ModulesPage() {
    const [modules, setModules] = useState([]);
    const { language, toggleLanguage } = useLanguage();

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from('modules').select('*');
            setModules(data || []);
        }
        load();
    }, []);

    const renderNodes = (description) => {
        if (!description) return null;
        try {
            // Handle both raw strings and pre-parsed objects from Supabase
            const data = typeof description === 'string' ? JSON.parse(description) : description;
            
            if (Array.isArray(data)) {
                return (
                    <ul className="mt-4 space-y-2">
                        {data.slice(0, 3).map((node, i) => (
                            <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                <span className="text-blue-500 font-bold"></span>
                                <span>
                                    {language === 'en' 
                                        ? (node.text_en || node.TEXT_EN || node.technical_term) 
                                        : (node.text_fr || node.TEXT_FR || node.text_en)}
                                </span>
                            </li>
                        ))}
                    </ul>
                );
            }
        } catch (e) {
            console.error("Mapping error:", e);
        }
        
        // Final fallback if the data is just plain text
        return <p className="text-xs text-slate-400 mt-4 italic">{String(description).substring(0, 100)}...</p>;
    };

    return (
        <div className="max-w-6xl mx-auto p-10 font-sans bg-slate-50 min-h-screen">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                        {language === 'en' ? 'Vocational Pathways' : 'Parcours Professionnels'}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Cobel AI Engine: Multi-Dimensional Diagnostic</p>
                </div>
                <button 
                    onClick={toggleLanguage} 
                    className="px-6 py-2 bg-white border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                >
                    {language === 'en' ? 'EN | FR' : 'FR | EN'}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((m) => (
                    <div key={m.id} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                                {language === 'en' ? m.title_en : (m.title_fr || m.title_en)}
                            </h3>
                            <div className="h-px w-12 bg-blue-500 mb-4" />
                            {renderNodes(m.description)}
                        </div>

                        <Link 
                            href={`/upload-assessment?modId=${m.id}&title=${encodeURIComponent(m.title_en)}`} 
                            className="mt-8 block text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-md"
                        >
                            {language === 'en' ? 'Launch Diagnostic' : 'Lancer le Diagnostic'}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}