import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import Link from 'next/link';
import { User, ChevronRight, Search } from 'lucide-react';

export default async function StudentListPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch all students for the CBTC roster
  const { data: students, error } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('role', 'student')
    .order('full_name', { ascending: true });

  if (error) {
    return <div className="p-8 text-red-500">Error loading student roster: {error.message}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Roster</h1>
          <p className="text-gray-500">Manage vocational assessments and adaptive paths.</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search candidates..." 
            className="bg-transparent border-none focus:ring-0 text-sm"
          />
        </div>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 divide-y">
          {students?.map((student) => (
            <Link 
              key={student.id} 
              href={/instructor/students/\}
              className="group flex items-center justify-between p-4 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{student.full_name}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-tighter">Candidate ID: {student.id.slice(0,8)}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
          
          {students?.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              No students found in the current cohort.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
