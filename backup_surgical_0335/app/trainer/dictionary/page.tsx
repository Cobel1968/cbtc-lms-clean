'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Book, Plus, Trash2, Languages, Loader2 } from 'lucide-react';

export default function TechnicalDictionary() {
  const [terms, setTerms] = useState([]);
  const [newEn, setNewEn] = useState('');
  const [newFr, setNewFr] = useState('');
  const [category, setCategory] = useState('Grammar');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, []);

  async function fetchTerms() {
    const { data } = await supabase.from('vocational_mapping').select('*').order('created_at', { ascending: false });
    if (data) setTerms(data);
    setLoading(false);
  }

  async function addTerm() {
    if (!newEn || !newFr) return;
    const { error } = await supabase.from('vocational_mapping').insert([{ term_en: newEn, term_fr: newFr, trade_category: category }]);
    if (!error) {
      setNewEn(''); setNewFr('');
      fetchTerms();
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Technical Dictionary</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Calibration Tool for OCR Engine</p>
          </div>
          <Book className="text-blue-500" size={32} />
        </header>

        <section className="bg-slate-900 border border-slate-800 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">English Term</label>
            <input value={newEn} onChange={e => setNewEn(e.target.value)} className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm" placeholder="e.g. Inverter" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">French Equivalent</label>
            <input value={newFr} onChange={e => setNewFr(e.target.value)} className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm" placeholder="e.g. Onduleur" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm">
              <option>Grammar</option>
              <option>IELTS</option>
              <option>Solar</option>
            </select>
          </div>
          <button onClick={addTerm} className="bg-blue-600 hover:bg-blue-500 h-[44px] rounded-xl flex items-center justify-center gap-2 font-bold uppercase text-xs">
            <Plus size={16} /> Add Term
          </button>
        </section>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          {loading ? <Loader2 className="animate-spin mx-auto my-12" /> : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-black">
                <tr>
                  <th className="p-4">English</th>
                  <th className="p-4">French</th>
                  <th className="p-4">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {terms.map(term => (
                  <tr key={term.id} className="hover:bg-slate-800/50">
                    <td className="p-4 font-bold">{term.term_en}</td>
                    <td className="p-4 text-slate-400 italic">{term.term_fr}</td>
                    <td className="p-4"><span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-md text-[10px] font-bold uppercase">{term.trade_category}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}