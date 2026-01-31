import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();
  // Fetch from the View we just created in SQL
  const { data: students } = await supabase.from('student_competency_matrix').select('*');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Trainer Oversight</h1>
      <p className="text-gray-500 mb-6">Live Temporal Optimization Metrics [cite: 2026-01-01]</p>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">Student Name</th>
              <th className="px-6 py-4 text-sm font-semibold">Module</th>
              <th className="px-6 py-4 text-sm font-semibold">Fluency</th>
              <th className="px-6 py-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students?.map((student) => (
              <tr key={student.student_id}>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">General Vocational</td>
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-medium">Bilingual</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${student.diploma_eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {student.diploma_eligible ? 'Eligible' : 'Action Required'}
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