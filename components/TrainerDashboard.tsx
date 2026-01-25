'use client';
import { useEffect, useState } from 'react';
import { getStudentPerformanceOverview } from '@/lib/trainerAnalytics';
import { Users, TrendingDown, Award, Search } from 'lucide-react';

export default function TrainerDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentPerformanceOverview().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">Loading Cobel AI Analytics...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            Student Optimization Tracker
          </h2>
          <p className="text-xs text-gray-400 mt-1">Real-time Curriculum Density Analysis</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center bg-white/10 px-4 py-1 rounded-lg border border-white/10">
              <span className="block text-lg font-bold text-green-400">
                {stats.reduce((acc, s) => acc + s.timeSaved, 0)}
              </span>
              <span className="text-[10px] uppercase text-gray-400 italic">Total Weeks Saved</span>
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4">Bilingual Fluency</th>
              <th className="px-6 py-4">Current Path</th>
              <th className="px-6 py-4 text-right">Time Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stats.map((student) => (
              <tr key={student.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-6 py-4 font-mono text-sm text-gray-600">{student.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-1000" 
                        style={{ width: `${student.currentFluency * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{(student.currentFluency * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {student.optimizedWeeks} Weeks
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    <TrendingDown size={12} />
                    -{student.timeSaved} Weeks
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
