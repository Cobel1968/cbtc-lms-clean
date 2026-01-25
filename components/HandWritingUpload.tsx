'use client';
import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, RefreshCcw, AlertCircle } from 'lucide-react';
import { uploadAndSaveAssessment } from '@/lib/saveAssessment';

export default function HandwritingUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to trigger the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    // Feature 4: Pedagogical Logic Extraction (Mocked values for the engine)
    const analysisData = {
      studentId: "AB-2026-001", // Example technical ID
      termsFound: ["Maintenance", "Budget", "Forecasting", "Hôtellerie"],
      fluencyScore: 0.88,
      detectedLanguage: 'fr'
    };

    try {
      // Logic: Pipes the physical file to Supabase and saves metadata to DB
      const response = await uploadAndSaveAssessment(file, analysisData);
      
      if (response.success) {
        setResult(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (err: any) {
      console.error("Bridge failure: Rolling back to safe state.");
      setError("Sync Failed: Check Supabase Storage/Connection");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-blue-100 max-w-md w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <FileText className="text-blue-600" size={20} />
        Analog-to-Digital Bridge
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Feature 4: Convert physical assessments into Bilingual technical fluency.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-xs">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {!result ? (
        <>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
            accept="image/*,.pdf" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full py-8 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center hover:bg-blue-50 transition-colors disabled:opacity-50 group"
          >
            {isProcessing ? (
              <RefreshCcw className="animate-spin text-blue-600" size={32} />
            ) : (
              <>
                <Upload className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-blue-600 font-medium text-sm">Upload Assessment Scan</span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">D:/ Drive Ingestion</span>
              </>
            )}
          </button>
        </>
      ) : (
        <div className="bg-green-50 p-5 rounded-xl border border-green-100 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
            <CheckCircle size={20} /> Processed Successfully
          </div>
          <div className="space-y-2 text-xs text-green-800">
            <div className="flex flex-wrap gap-1">
              <strong>Extracted Terms:</strong>
              {result.terms_extracted?.map((term: string) => (
                <span key={term} className="px-1.5 py-0.5 bg-green-200 rounded text-[10px]">{term}</span>
              ))}
            </div>
            <p><strong>Bilingual Score:</strong> {(result.fluency_score * 100)}%</p>
            <p className="italic text-green-600">Temporal Optimization Path Updated.</p>
          </div>
          <button 
            onClick={() => setResult(null)}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors"
          >
            New Ingestion
          </button>
        </div>
      )}
    </div>
  );
}