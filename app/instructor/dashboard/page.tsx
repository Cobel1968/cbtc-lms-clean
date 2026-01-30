import FrictionDashboard from '@/components/instructor/FrictionDashboard';
import { supabase } from '@/lib/supabase';

export default async function InstructorPage() {
  const { data: alerts } = await supabase.from('instructor_friction_alerts').select('*');

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <FrictionDashboard alerts={alerts || []} />
    </main>
  );
}
