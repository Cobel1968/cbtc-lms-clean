'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const TrainerView = () => {
  const [pendingEnrollments, setPendingEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Corrected: CamelCase 'useEffect' for React
  useEffect(() => {
    fetch_pending_students();
  }, []);

  const fetch_pending_students = async () => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        user_id,
        course_id,
        status,
        profiles ( email ),
        courses ( name_fr, price )
      `)
      .eq('status', 'pending');

    if (!error) setPendingEnrollments(data || []);
    setLoading(false);
  };

  const handle_verify = async (user_id: string, course_id: string) => {
    // Calling the SQL function we created in the Supabase Editor
    const { error } = await supabase.rpc('verify_cash_payment', {
      target_user_id: user_id,
      target_course_id: course_id
    });

    if (!error) {
      alert("Payment Verified! Student access granted.");
      fetch_pending_students(); // Refresh the list
    } else {
      console.error("Verification Error:", error.message);
    }
  };

  if (loading) return <div className="p-10 text-center">ACCESSING TRAINER RECORDS...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pending Cash Payments</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200 text-xs font-bold uppercase text-gray-600">
            <tr>
              <th className="p-4">Student Email</th>
              <th className="p-4">Course</th>
              <th className="p-4">Amount Due</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {pendingEnrollments.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-700">{item.profiles.email}</td>
                <td className="p-4 text-gray-600">{item.courses.name_fr}</td>
                <td className="p-4 font-bold text-blue-600">{item.courses.price.toLocaleString()} XOF</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handle_verify(item.user_id, item.course_id)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-md font-bold hover:bg-green-700"
                  >
                    VERIFY CASH
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingEnrollments.length === 0 && (
          <p className="p-8 text-center text-gray-400">All payments are currently up to date.</p>
        )}
      </div>
    </div>
  );
}