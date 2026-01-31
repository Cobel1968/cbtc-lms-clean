import HandwritingUpload from '@/components/instructor/HandwritingUpload';
import { ChevronLeft, GraduationCap, User } from 'lucide-react';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch real student data
  const { data: student, error } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role')
    .eq('id', params.id)
    .single();

  if (error || !student) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-medium">Student not found in the CBTC Database.</p>
        <Link href="/instructor/students" className="text-blue-600 underline text-sm">Return to List</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link 
        href="/instructor/students" 
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Student List
      </Link>

      <div className="flex items-center justify-between mb-8 border-b pb-8">
        <div className="flex items-center gap-4">
          {student.avatar_url ? (
            <img src={student.avatar_url} className="w-16 h-16 rounded-2xl object-cover" alt="Profile" />
          ) : (
            <div className="p-4 bg-blue-100 rounded-2xl text-blue-600">
              <User className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{student.full_name}</h1>
            <p className="text-gray-500 uppercase text-xs tracking-widest font-semibold">{student.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 4: The Handwriting Analysis Bridge */}
        <HandwritingUpload 
          studentId={params.id} 
          courseId="active-vocational-course-uuid" 
        />

        <div className="p-6 bg-white border rounded-2xl shadow-sm">
          <h3 className="font-bold mb-2 text-gray-800">Adaptive Path Metrics</h3>
          <p className="text-sm text-gray-500 mb-4">
            Dynamic updates based on Bilingual Technical Fluency.
          </p>
          <div className="space-y-4">
             <div className="flex justify-between text-xs font-bold">
                <span>Knowledge Gap Closure</span>
                <span className="text-blue-600">Adaptive</span>
             </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[72%] transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
