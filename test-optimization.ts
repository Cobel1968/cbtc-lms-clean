import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runTest() {
  console.log(" Simulating Handwriting Ingestion for Student: 00000000-0000-0000-0000-000000000000");

  // Insert a mock result: -0.5 density shift (Significant improvement)
  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      student_id: '00000000-0000-0000-0000-000000000000',
      course_id: 'vocational-training-001',
      fluency_score: 0.95,
      curriculum_density_update: -0.5, 
      technical_terms_detected: { terms: ["système hydraulique", "maintenance"] }
    })
    .select();

  if (error) {
    console.error(" Test Failed:", error.message);
  } else {
    console.log(" Success! Check your 'enrollments' table to see the date shift.");
    console.table(data);
  }
}

runTest();
