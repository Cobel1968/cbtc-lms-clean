'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const MilestoneForecast = ({ user_id }: { user_id: string }) => {
  const [prediction, setPrediction] = useState<{weeks: number, date: string} | null>(null);

  useEffect(() => {
    const getForecast = async () => {
      const { data, error } = await supabase.rpc('predict_milestone', { user_uuid: user_id });
      if (data && data[0]) {
        setPrediction({ 
          weeks: Math.round(data[0].weeks_remaining * 10) / 10, 
          date: data[0].predicted_date 
        });
      }
    };
    getForecast();
  }, [user_id]);

  if (!prediction) return <div className="animate-pulse h-24 bg-gray-100 rounded-2xl" />;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg">
      <h3 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">
        Feature 3: Milestone Forecasting
      </h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-4xl font-black">{prediction.weeks} <span className="text-sm">Weeks</span></p>
          <p className="text-xs opacity-80 mt-1 font-medium">Estimated Completion Date</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{new Date(prediction.date).toLocaleDateString()}</p>
          <div className="h-1 w-full bg-white/20 rounded-full mt-2">
             <div className="h-1 bg-green-400 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
