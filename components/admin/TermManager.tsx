'use client'
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';

export default function TermManager({ initialTerms }) {
  const [terms, setTerms] = useState(initialTerms || []);
  const [newTerm, setNewTerm] = useState({ term_en: '', term_fr: '', category: 'General', complexity_weight: 1.0 });

  const handleAdd = async () => {
    const { data, error } = await supabase.from('technical_dictionary').insert([newTerm]).select();
    if (!error) {
      setTerms([...terms, data[0]]);
      setNewTerm({ term_en: '', term_fr: '', category: 'General', complexity_weight: 1.0 });
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('technical_dictionary').delete().eq('id', id);
    if (!error) setTerms(terms.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 font-mono">Vocational Dictionary Manager</h3>
      
      {/* Add New Term Form */}
      <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
        <input placeholder="English Term" className="p-2 text-sm border rounded" value={newTerm.term_en} onChange={e => setNewTerm({...newTerm, term_en: e.target.value})} />
        <input placeholder="French Term" className="p-2 text-sm border rounded" value={newTerm.term_fr} onChange={e => setNewTerm({...newTerm, term_fr: e.target.value})} />
        <select className="p-2 text-sm border rounded" value={newTerm.category} onChange={e => setNewTerm({...newTerm, category: e.target.value})}>
          <option>Drilling</option><option>Safety</option><option>Equipment</option><option>General</option>
        </select>
        <button onClick={handleAdd} className="bg-indigo-600 text-white rounded flex items-center justify-center hover:bg-indigo-700 transition">
          <Plus size={18} className="mr-1" /> ADD TERM
        </button>
      </div>

      {/* Terms Table */}
      <div className="overflow-auto max-h-[400px]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="pb-2">English</th><th className="pb-2">French</th><th className="pb-2">Category</th><th className="pb-2">Weight</th><th></th>
            </tr>
          </thead>
          <tbody>
            {terms.map(term => (
              <tr key={term.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{term.term_en}</td>
                <td className="py-3 italic text-slate-600">{term.term_fr}</td>
                <td className="py-3 text-xs uppercase text-slate-400">{term.category}</td>
                <td className="py-3">{term.complexity_weight}x</td>
                <td className="py-3 text-right">
                  <button onClick={() => handleDelete(term.id)} className="text-slate-300 hover:text-rose-600 transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
