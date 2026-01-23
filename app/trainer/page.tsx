import { createClient } from '@/utils/supabase/server';
import { 
  Users, 
  Clock, 
  Zap, 
  TrendingDown,
  ChevronRight,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

export default async function TrainerDashboard() {
  const supabase = createClient();

  // Feature 2: Engine Data Fetching
  // Monitor curriculum density mastery across the active student profile set
  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('total_minutes_spent', { ascending: false });

  // Feature 3: Temporal Optimization Aggregation
  // Calculate cohort-wide velocity and optimization gains
  const totalMinutes = students?.reduce((acc, s) => acc + (s.total_minutes_spent || 0), 0) || 0;
  const cohortVelocity = students?.length ? Math.round(totalMinutes / students.length / 60) : 0;
  const totalDaysSaved = Math.floor(totalMinutes / 480);

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      
      {/* 1. Header: Instructor Command Terminal */}
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            instructor <span className="text-indigo-600">command</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 italic">monitoring bilingual technical fluency + temporal optimization</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">engine live sync active</span>
        </div>
      </header>

      {/* 2. Key Performance Indicators: Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-500 transition-all duration-500">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">active enrollment</p>
            <h3 className="text-3xl font-black text-slate-900">{students?.length || 0} <span className="text-sm font-bold text-slate-300">students</span></h3>
          </div>
          <Users className="text-slate-200 group-hover:text-indigo-500 transition-colors" size={32} />
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-500 transition-all duration-500">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">cohort velocity</p>
            <h3 className="text-3xl font-black text-slate-900">{cohortVelocity}h <span className="text-sm font-bold text-slate-300">avg/student</span></h3>
          </div>
          <Clock className="text-slate-200 group-hover:text-indigo-500 transition-colors" size={32} />
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">total time optimized</p>
            <h3 className="text-3xl font-black italic text-emerald-400">-{totalDaysSaved} days</h3>
          </div>
          <BrainCircuit className="absolute -right-2 -bottom-2 text-indigo-500/20 group-hover:scale-110 transition-transform duration-700" size={100} />
        </div>
      </div>

      {/* 3. Student Mastery Table (Bilingual Vocational Mapping Results) */}
      <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter italic leading-none">curriculum density tracking</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">ranking by dynamic path mapping gains</p>
          </div>
          <Sparkles size={20} className="text-indigo-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">student identity</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">mastery time</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">timeframe reduction</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">path status</th>
                <th className="p-6 border-b border-slate-50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students?.map((student) => {
                // Logic: 480 mins = 1 day of vocational training curriculum saved
                const daysSaved = Math.floor((student.total_minutes_spent || 0) / 480);
                
                return (
                  <tr key={student.id} className="group hover:bg-indigo-50/30 transition-all cursor-default">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-indigo-400 text-sm shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {student.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-base">{student.email}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight italic">
                            {student.vocational_track || 'electrical engineering'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-mono">
                      <p className="font-black text-slate-900">{student.total_minutes_spent || 0} <span className="text-[10px] text-slate-400 uppercase">mins</span></p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-emerald-600 font-black italic">
                        <TrendingDown size={16} />
                        <span className="text-lg">-{daysSaved} days</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[10px] font-black bg-white border border-slate-100 text-indigo-600 px-4 py-2 rounded-xl uppercase tracking-tighter shadow-sm">
                        optimized path active
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                        <ChevronRight size={20} />
                      </button>
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