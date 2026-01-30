'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseDB';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const { data } = await supabase.from('user_profiles').select('*, modules(title_en)');
            if (data) setStats(data);
            setLoading(false);
        }
        fetchStats();
    }, []);

    if (loading) return <div className="p-20 text-center font-mono">Querying Cobel AI Engine...</div>;

    return (
        <div className="max-w-6xl mx-auto p-10">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trainer Oversight</h1>
                    <p className="text-slate-500">Live Temporal Optimization Metrics [cite: 2026-01-01]</p>
                </div>
                <div className="flex gap-4">
                     <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">
                        191 Active Nodes
                    </div>
                </div>
            </header>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-700">Student Name</th>
                            <th className="p-4 font-semibold text-slate-700">Module</th>
                            <th className="p-4 font-semibold text-slate-700 text-center">Fluency</th>
                            <th className="p-4 font-semibold text-slate-700 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((s) => (
                            <tr key={s.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors group">
                                <td className="p-4">
                                    <Link href={`/admin-dashboard/student/${s.id}`} className="text-blue-600 font-bold hover:underline">
                                        {s.full_name || 'Anonymous Student'}
                                    </Link>
                                </td>
                                <td className="p-4 text-slate-600 font-medium">{s.modules?.title_en || 'Core Training'}</td>
                                <td className="p-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-full max-w-[100px] bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full" style={{ width: `${s.fluency_score}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500">{Math.round(s.fluency_score)}%</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                        s.last_sync_type === 'Analog-to-Digital' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                        {s.last_sync_type || 'Digital'}
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