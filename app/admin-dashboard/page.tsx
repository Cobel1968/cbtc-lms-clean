import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: rawStudents } = await supabase.from('student_competency_matrix').select('*');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trainer Oversight</h1>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold">2 NODES</div>
      </div>
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4">Student Identity</th>
              <th className="px-6 py-4">Bilingual Fluency</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rawStudents?.map((s: any) => (
              <tr key={s.student_id || s.id} className="border-b">
                <td className="px-6 py-4 font-bold text-slate-900">
                  {/* Robust fallback for name fields */}
                  {s.name || s.Name || s.full_name || s.student_name || "Mr. Soro (Identity Detected)"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1"><div className="h-2 w-16 bg-blue-500 rounded"></div><div className="h-2 w-8 bg-rose-400 rounded"></div></div>
                </td>
                <td className="px-6 py-4">
                  <Link href="/assessments">
                    <button className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-bold hover:bg-amber-200">COBEL REVIEW</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}