'use client';

import { calculate_friction_index, friction_data } from '@/lib/frictionengine';
import { ArrowRightLeft } from 'lucide-react';

const mock_vocational_data: friction_data[] = [
  { term: 'circuit breaker / disjoncteur', category: 'electrical', english_score: 45, french_score: 95, attempts: 3 },
  { term: 'front desk / réception', category: 'hospitality', english_score: 88, french_score: 92, attempts: 1 },
  { term: 'torque wrench / clé dynamométrique', category: 'mechanical', english_score: 30, french_score: 85, attempts: 5 },
];

export default function BilingualFrictionReport() {
  const reports = calculate_friction_index(mock_vocational_data);

  return (
    <div className="p-8 lg:p-12 space-y-8 lowercase">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">bilingual friction report</h1>
          <p className="text-slate-500 font-bold">identifying vocational language gaps</p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 text-xs font-black uppercase">
          3 critical gaps detected
        </div>
      </header>

      <div className="grid gap-4">
        {reports.map((item) => (
          <div
            key={item.term}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div
                className={`p-4 rounded-2xl ${
                  Number(item.friction_index) > 50 ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                }`}
              >
                <ArrowRightLeft size={24} />
              </div>

              <div>
                <h3 className="font-black text-slate-800 uppercase text-lg leading-none mb-1">{item.term}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.category} • {item.attempts} assessments
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">friction index</p>
                <p className={`text-2xl font-black ${Number(item.friction_index) > 50 ? 'text-red-600' : 'text-slate-900'}`}>
                  {item.friction_index}%
                </p>
              </div>

              <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all uppercase text-xs">
                assign module
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
