import { createClient } from '@supabase/supabase-js';
import { calculateOptimizedPath } from './pathMappingEngine';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getStudentPerformanceOverview = async () => {
  // Fetch latest fluency scores for all students
  const { data, error } = await supabase
    .from('student_assessments')
    .select('student_id, fluency_score, created_at')
    .order('created_at', { ascending: false });

  if (error) return [];

  // Logic: Group by student and calculate their current optimization
  const summary = data.reduce((acc: any, curr) => {
    if (!acc[curr.student_id]) {
      const projection = calculateOptimizedPath(12, curr.fluency_score); // Assuming 12-week base
      acc[curr.student_id] = {
        id: curr.student_id,
        currentFluency: curr.fluency_score,
        timeSaved: projection.timeSaved,
        optimizedWeeks: projection.optimizedWeeks
      };
    }
    return acc;
  }, {});

  return Object.values(summary).sort((a: any, b: any) => b.timeSaved - a.timeSaved);
};
