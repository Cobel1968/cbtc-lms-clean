export const dynamic = 'force-dynamic';
// app/admin/curriculum/page.tsx
import { createClient } from '@/utils/supabase/server';

export default async function CurriculumAudit() {
  const supabase = createClient();

  // Fetch all 191 questions with their course titles
  const { data: questions } = await supabase
    .from('assessment_pool')
    .select('*, courses(title)');

  // Grouping logic for the Cobel AI Engine
  const stats = questions?.reduce((acc: any, q: any) => {
    const title = q.courses?.title || 'Unassigned/Baseline';
    if (!acc[title]) acc[title] = { count: 0, avgDensity: 0 };
    acc[title].count++;
    acc[title].avgDensity += q.density_weight;
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cobel AI Engine: Curriculum Density Audit</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Subject Track</th>
            <th className="p-2 border">Question Count</th>
            <th className="p-2 border">Avg. Technical Density</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((track) => (
            <tr key={track}>
              <td className="p-2 border font-medium">{track}</td>
              <td className="p-2 border text-center">{stats[track].count}</td>
              <td className="p-2 border text-center">
                {(stats[track].avgDensity / stats[track].count).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}