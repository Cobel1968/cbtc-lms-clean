'use client';
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 

export const HandwritingUpload = ({ user_id }: { user_id: string }) => {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<'mobile' | 'scanner'>('mobile');

  const handle_upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResult(null); // Reset for new ingestion
    
    try {
      // 1. Prepare file path (Folder-based RLS)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user_id}/${fileName}`; 

      // 2. Ingest into Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('vocational_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Trigger Multi-Device Pedagogy Logic
      // Updated to use the 'process_multi_device_ingestion' function
      const { data, error: rpcError } = await supabase.rpc('process_multi_device_ingestion', { 
          p_user_id: user_id, 
          p_file_path: uploadData.path,
          p_device_type: deviceType,
          p_extracted_text: "" // Simulation slot for future OCR text
      });

      if (rpcError) throw rpcError;

      // 4. Update UI with the new Temporal Optimization data
      if (data && data.updated_fluency) {
        setResult(data.updated_fluency);
      }

    } catch (error: any) {
      console.error("COBEL AI ENGINE ERROR:", error.message || error);
      alert("Ingestion failed. Ensure you are using a valid student UUID.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-white text-center shadow-sm">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
        Feature 4: Analog-to-Digital Bridge
      </h3>
      
      {/* Device Selection Toggle */}
      <div className="flex justify-center p-1 bg-slate-100 rounded-xl mb-6 max-w-[240px] mx-auto">
        <button 
          onClick={() => setDeviceType('mobile')}
          className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${deviceType === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
        >
          📱 MOBILE
        </button>
        <button 
          onClick={() => setDeviceType('scanner')}
          className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${deviceType === 'scanner' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
        >
          🖨️ SCANNER
        </button>
      </div>

      <p className="text-slate-500 text-xs mb-6 px-4">
        {deviceType === 'mobile' 
          ? "Capture assessment using your smartphone camera." 
          : "Optimized for high-resolution flatbed vocational scans."}
      </p>
      
      <label className="cursor-pointer bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black hover:shadow-xl transition-all inline-block w-full">
        {uploading ? 'INGESTING...' : 'CAPTURE ASSESSMENT'}
        <input 
          type="file" 
          className="hidden" 
          onChange={handle_upload} 
          disabled={uploading} 
          accept="image/*,.pdf"
          /* Triggers camera directly on mobile if source is set to mobile */
          capture={deviceType === 'mobile' ? 'environment' : undefined}
        />
      </label>

      {result !== null && (
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in zoom-in duration-500">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Update Successful</div>
          <div className="text-blue-700 text-2xl font-black">
            {result}% <span className="text-sm">Bilingual Fluency</span>
          </div>
        </div>
      )}
    </div>
  );
}