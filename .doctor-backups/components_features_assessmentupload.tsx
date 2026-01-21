import { useState as use_state } from 'react';
import { supabase } from '@/lib/supabase';
// Aliasing lucide icons to match the project's naming convention
import { 
  Upload as icon_upload, 
  Loader2 as icon_loader, 
  CheckCircle2 as icon_check,
  AlertCircle as icon_alert 
} from 'lucide-react';

interface upload_props {
  user_id: string;
}

export default function AssessmentUpload({ user_id }: upload_props) {
  const [is_uploading, set_is_uploading] = use_state(false);
  const [status, set_status] = use_state<'idle' | 'analyzing' | 'done' | 'error'>('idle');

  const handle_file_change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      set_is_uploading(true);
      set_status('analyzing');

      // 1. Storage Logic: Ingesting into the 'assessments' bucket
      const file_ext = file.name.split('.').pop();
      const file_name = `${user_id}/${Date.now()}.${file_ext}`;

      const { error: upload_error } = await supabase.storage
        .from('assessments')
        .upload(file_name, file);

      if (upload_error) throw upload_error;

      // 2. Get Public URL for the AI Engine
      const { data: { publicUrl } } = supabase.storage
        .from('assessments')
        .getPublicUrl(file_name);

      // 3. Trigger Feature 4: Analog-to-Digital Bridge via API
      const response = await fetch('/api/analyze-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: publicUrl, userId: user_id }),
      });

      if (!response.ok) throw new Error('AI Analysis failed');

      set_status('done');
    } catch (err) {
      console.error('Pedagogical Bridge Error:', err);
      set_status('error');
    } finally {
      set_is_uploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Physical Assessment Ingestion</h3>
        <p className="text-sm text-gray-500">Feature 4: Handwriting Analysis Module</p>
      </div>

      <div className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
        status === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'
      }`}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handle_file_change}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={is_uploading}
        />
        
        <div className="flex flex-col items-center justify-center gap-3">
          {status === 'idle' && (
            <>
              <div className="p-3 bg-blue-600 rounded-full text-white">
                <icon_upload size={24} />
              </div>
              <p className="text-sm font-medium text-blue-700">Upload handwritten work</p>
            </>
          )}

          {status === 'analyzing' && (
            <>
              <icon_loader className="animate-spin text-blue-600" size={32} />
              <p className="text-sm font-medium text-blue-700 text-center">
                AI Engine: Mapping Technical Terms...
              </p>
            </>
          )}

          {status === 'done' && (
            <>
              <icon_check className="text-green-600" size={32} />
              <p className="text-sm font-medium text-green-700">Milestones Updated</p>
            </>
          )}

          {status === 'error' && (
            <>
              <icon_alert className="text-red-600" size={32} />
              <p className="text-sm font-medium text-red-700">Ingestion failed. Retry?</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}