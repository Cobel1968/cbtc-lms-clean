import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function DynamicCoursePage({ params }: { params: { slug: string } }) {
  // 1. Fetch the module data linked to this slug
  const { data: module } = await supabase
    .from('modules')
    .select('*, courses(*)')
    .eq('slug', params.slug)
    .single();

  if (!module) notFound();

  // 2. The Engine Logic: Temporal Optimization check
  // (In a real scenario, you'd check user progress here)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{module.title_en}</h1>
      {/* Feature 2: Adaptive HTML Injection */}
      <div 
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: module.content_en }} 
      />
      
      {/* Feature 4: Analog-to-Digital Bridge Trigger */}
      <div className="mt-12 p-6 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
        <h3 className="text-lg font-semibold">Upload Vocational Assessment</h3>
        <p className="text-sm text-gray-600 mb-4">Submit your handwritten notes for AI analysis.</p>
        {/* We would insert your AssessmentUploader component here */}
      </div>
    </div>
  );
}
