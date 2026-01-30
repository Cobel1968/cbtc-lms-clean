'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
// Corrected: lowercase filename, no hyphen
import { supabase } from '@/lib/supabaseDB';

export const CourseGrid = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Corrected: React Hook must be CamelCase 'useEffect'
  useEffect(() => {
    const load_catalog = async () => {
      const data = await getBilingualCatalog();
      if (data) setCourses(data);
      setLoading(false);
    };
    load_catalog();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 font-mono">SYNCING COBEL ENGINE...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <div key={course.slug} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:border-blue-400 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-blue-50 text-blue-600 rounded">
              {course.level}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900">{course.name_fr}</h3>
          <p className="text-sm text-gray-500 mt-1 italic">{course.name_en}</p>

          <div className="mt-8 pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-black text-gray-900">
                {course.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">{course.currency}</span>
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                ENROLL
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
