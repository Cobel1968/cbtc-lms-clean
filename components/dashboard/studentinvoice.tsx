'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Ensure this path is also lowercase

export const StudentInvoice = ({ enrollmentId }: { enrollmentId: string }) => {
  const [data, setData] = useState<any>(null);

  // We use useEffect (CamelCase) because it is a React Hook
  useEffect(() => {
    const fetchInvoiceData = async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          status,
          payment_method,
          courses (
            name_fr,
            price,
            currency
          )
        `)
        .eq('id', enrollmentId)
        .single();

      if (!error) setData(data);
    };

    fetchInvoiceData();
  }, [enrollmentId]);

  if (!data) return <p>Loading invoice...</p>;

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-bold">{data.courses.name_fr}</h2>
      <p className="text-xl text-blue-600">{data.courses.price} {data.courses.currency}</p>
      <div className="mt-2 text-sm text-gray-500 uppercase">
        Method: {data.payment_method || 'CASH PENDING'}
      </div>
    </div>
  );
}