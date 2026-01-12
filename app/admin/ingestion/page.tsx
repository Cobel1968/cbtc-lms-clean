'use client';

import { useState } from 'react';
import { useOCRBridge } from '@/lib/ocr/ocrfluencybridge';
import { languageprovider } from '@/app/contexts/languagecontext';
import bilingualtext from '@/components/bilingualtext';

export default function IngestionPage() {
  const { analyze_handwritten_content } = useOCRBridge();
  const [is_loading, set_is_loading] = useState(false);
  const [result, set_result] = useState<{score: number, terms: string[]} | null>(null);

  const handle_image_processing = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    set_is_loading(true);

    // SIMULATION: In a real scenario, you'd send 'file' to a Tesseract/Google Vision API
    // We are simulating the text extracted from a handwritten vocational quiz
    setTimeout(() => {
      const simulated_raw_text = "L'Ã©lÃ¨ve a compris le moteur et le software de maintenance network.";
      const analysis = analyze_handwritten_content(simulated_raw_text);
      
      set_result({
        score: analysis.score,
        terms: analysis.terms_detected
      });
      set_is_loading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          <bilingualtext text={{ fr: "Ingestion d'Ã‰valuation", en: "Assessment Ingestion" }} />
        </h1>
        <p className="text-gray-600">Feature 4: Analog-to-Digital Pedagogical Bridge</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Upload Assessment Scan</h2>
          <input 
            type="file" 
            accept="image/*"
            onChange={handle_image_processing}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {is_loading && <p className="mt-4 text-blue-600 animate-pulse">Processing OCR & Analyzing Technical Lexicon...</p>}
        </div>

        {/* Real-time Analysis Result */}
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg font-mono text-sm">
          <h2 className="text-green-400 font-bold mb-4 uppercase tracking-widest">Engine Analysis</h2>
          {result ? (
            <div className="space-y-3">
              <p>Technical Fluency: <span className="text-yellow-400 text-xl font-bold">{result.score}%</span></p>
              <div>
                <p className="text-gray-400 mb-1">Detected Terms:</p>
                <div className="flex flex-wrap gap-2">
                  {result.terms.map(term => (
                    <span key={term} className="bg-green-900/50 border border-green-500 px-2 py-0.5 rounded text-green-400">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Result integrated into student digital profile.</p>
            </div>
          ) : (
            <p className="text-gray-500">Waiting for input scan...</p>
          )}
        </div>
      </div>
    </div>
  );
}