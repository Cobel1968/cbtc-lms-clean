'use client';

export const dynamic = 'force-dynamic';

import { 
  Zap, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  Search,
  ArrowUpRight
} from 'lucide-react';

interface Assessment {
  bilingual_fluency_score: number;
  detected_technical_terms_en: string[];
  detected_technical_terms_fr: string[];
}

interface Student {
  id: string;
  full_name: string;
  vocational_track: string;
  total_minutes_spent: number;
  vocational_assessments: Assessment[];
}

export default function TrainerDashboardUI({ students }: { students: Student[] }) {
  // Logic: Identify high friction (Fluency < 60%)
  const highFrictionStudents = students.filter(s => 
    s.vocational_assessments.some(a => a.bilingual_fluency_score < 60)
  ).length;

  // Logic: Calculate average technical fluency across all assessments
  const allScores = students.flatMap(s => s.vocational_assessments.map(a => a.bilingual_fluency_score));
  const avgFluency = allScores.length > 0 
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) 
    : 0;

  return (
    <div className="p-8 lg:p-12 space-y-10 bg-slate-50 min-h-screen lowercase">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
            instructor <span className="text-indigo-600">command</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2">monitoring bilingual technical fluency engine</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
          <Users size={18} className="text-indigo-600" />
          <span className="font-black text-sm uppercase">{students.length} students active</span>
        </div>
      </header>

      {/* Cobel Engine Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4 hover:border-amber-200 transition-colors">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">{highFrictionStudents}</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">high friction students</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl space-y-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-black">{avgFluency}%</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">avg. technical fluency</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={80} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-black">-12.4 days</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">temporal optimization avg.</p>
          </div>
        </div>
      </div>

      {/* Student Progress Terminal */}
      <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tight italic">pedagogical sync terminal</h2>
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
             <input type="text" placeholder="search student..." className="pl-12 pr-6 py-3 bg-slate-50 rounded-2xl text-xs font-bold border-none focus:ring-2 focus:ring-indigo-600 w-64" />
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                <th className="pb-4 px-4">student / track</th>
                <th className="pb-4 px-4">fluency score</th>
                <th className="pb-4 px-4">bilingual terms (mapped)</th>
                <th className="pb-4 px-4">status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => {
                const latestScore = student.vocational_assessments[0]?.bilingual_fluency_score || 0;
                const termsCount = (student.vocational_assessments[0]?.detected_technical_terms_en?.length || 0) + 
                                   (student.vocational_assessments[0]?.detected_technical_terms_fr?.length || 0);

                return (
                  <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 px-4">
                      <div className="font-black text-slate-900 text-sm uppercase">{student.full_name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{student.vocational_track}</div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${latestScore}%` }} />
                        </div>
                        <span className="font-black text-xs text-slate-700">{latestScore}%</span>
                      </div>
                    </td>
                    <td className="py-6 px-4 font-bold text-xs text-slate-500 italic">
                      {termsCount} terms extracted
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">synced</span>
                        <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}