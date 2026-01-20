import React, { useState } from 'react'; // CamelCase for React hooks
import { supabase } from '@/lib/supabaseClient'; // lowercase, no-hyphen import
import { process_handwriting_data } from '@/lib/ocr/handwritinglogic';

export const HandwritingUpload = ({ user_id }: { user_id: string }) => {
  const [uploading, setUploading] = useState(false); // Correct CamelCase
  const [result, setResult] = useState<number | null>(null);

  const handle_upload = async (event: any) => {
    setUploading(true);
    
    // Simulate OCR Extraction (In Phase 2, this links to Tesseract/Vision)
    const mock_extracted_text = "L'étudiant comprend les contrats intelligents et la blockchain.";
    
    const response = await process_handwriting_data(user_id, mock_extracted_text);
    
    setResult(response.new_score);
    setUploading(false);
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 text-center">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
        Analog-to-Digital Bridge
      </h3>
      <button 
        onClick={handle_upload}
        disabled={uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {uploading ? 'PROCESSING PAPER...' : 'SCAN ASSESSMENT'}
      </button>

      {result !== null && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
          Technical Fluency Updated: {result}%
        </div>
      )}
    </div>
  );
};