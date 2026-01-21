'use client';
import React, { useState } from 'react';
// Calling the server action we just pushed to GitHub
import { syncHandwritingToEngine } from '@/app/actions/assessment';

export default function AssessmentUploader({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);

    // Convert file to Base64 for the AI engine
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      
      // Using the server action that connects to Supabase & Handwriting Logic
      const result = await syncHandwritingToEngine(userId, base64);
      
      if (result.success) {
        alert(`Sync Complete! New Forecast: ${result.new_forecast}`);
      } else {
        alert(`Error: ${result.error}`);
      }
      setLoading(false);
    };
  };

  return (
    <div className="p-6 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 text-center">
      <h3 className="text-lg font-bold text-blue-900 mb-2">Analog-to-Digital Bridge</h3>
      <p className="text-sm text-blue-700 mb-4">Scan your exam or take a photo with your phone</p>
      
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        onChange={handleUpload}
        className="hidden"
        id="assessment-upload"
      />
      
      <label 
        htmlFor="assessment-upload"
        className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
      >
        {loading ? 'Analyzing Handwriting...' : 'Start Ingestion'}
      </label>
    </div>
  );
}