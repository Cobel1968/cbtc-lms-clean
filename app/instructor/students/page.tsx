import { createClient } from '@/utils/supabase/server';

export default async function StudentsPage() {
  const supabase = await createClient();
  const { data: students } = await supabase.from('student_competency_matrix').select('*');

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Roster</h1>
          <p className="text-gray-500">Cobel Business Training Center - Instructor View</p>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {students?.map((student) => (
            <li key={student.student_id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-blue-600 truncate">
                  ID: {student.student_id || 'Pending'}
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.diploma_eligible ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {student.diploma_eligible ? 'Diploma Eligible' : 'In Progress'}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}