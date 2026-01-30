'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseProvider';

export const BilingualDictionaryView = () => {
  const [terms, setTerms] = useState<any[]>([]);
  const [newTerm, setNewTerm] = useState({ en: '', fr: '', domain: 'General' });

  // 1. Fetch current dictionary from the engine
  const fetchTerms = async () => {
    const { data } = await supabase.from('vocational_dictionary').select('*').order('id', { ascending: false });
    if (data) setTerms(data);
  };

  useEffect(() => { fetchTerms(); }, []);

  // 2. Add new technical mapping
  const handleAddTerm = async () => {
    if (!newTerm.en || !newTerm.fr) return;
    const { error } = await supabase.from('vocational_dictionary').insert([
      { term_en: newTerm.en, term_fr: newTerm.fr, technical_domain: newTerm.domain }
    ]);
    if (!error) {
      setNewTerm({ en: '', fr: '', domain: 'General' });
      fetchTerms();
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-black text-gray-800 mb-6">Bilingual Vocational Mapping</h2>
      
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-blue-50 p-4 rounded-2xl">
        <input 
          placeholder="English Term" 
          className="p-3 rounded-xl border-none ring-1 ring-blue-200"
          value={newTerm.en} onChange={(e) => setNewTerm({...newTerm, en: e.target.value})}
        />
        <input 
          placeholder="French Translation" 
          className="p-3 rounded-xl border-none ring-1 ring-blue-200"
          value={newTerm.fr} onChange={(e) => setNewTerm({...newTerm, fr: e.target.value})}
        />
        <button onClick={handleAddTerm} className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">
          ADD TO ENGINE
        </button>
      </div>

      {/* Dictionary List */}
      <div className="space-y-3">
        {terms.map((term) => (
          <div key={term.id} className="flex justify-between items-center p-4 border-b border-gray-50 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-bold text-gray-700">{term.term_en}</span>
            <div className="h-px flex-grow mx-4 bg-gray-100" />
            <span className="font-medium text-blue-600 italic">{term.term_fr}</span>
            <span className="ml-4 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{term.technical_domain}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
