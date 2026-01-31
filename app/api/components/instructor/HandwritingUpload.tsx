'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  studentId: string;
  courseId: string;
}

export default function HandwritingUpload({ studentId, courseId }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [updateValue, setUpdateValue] = useState<number | null>(null);

  const handleIngestion = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: "upload_from_mobile_device", 
          course_id: courseId,
          student_id: studentId
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setUpdateValue(result.data[0].curriculum_density_update);
        setStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error("Friction in Analog-to-Digital bridge:", err);
      setStatus('error');
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Physical Assessment Ingestion</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Ingest handwritten technical tests to update bilingual fluency and path mapping.
          </p>
        </div>

        {status === 'idle' && (
          <button
            onClick={handleIngestion}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all active:scale-95"
          >
            <Upload className="w-4 h-4" />
            Analyze Handwriting
          </button>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-3 text-blue-600 font-medium py-2.5">
            <Loader2 className="w-5 h-5 animate-spin" />
            Mapping Technical Terms...
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <CheckCircle className="w-5 h-5" />
              Density Adjusted: {updateValue ? (updateValue * 100).toFixed(0) : 0}%
            </div>
            <button onClick={() => setStatus('idle')} className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
              Process new document
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <AlertCircle className="w-5 h-5" />
            Bridge Connection Failed
            <button onClick={() => setStatus('idle')} className="ml-2 underline text-xs">Retry</button>
          </div>
        )}
      </div>
    </div>
  );
}
