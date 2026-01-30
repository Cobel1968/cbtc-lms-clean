'use client'
import React from 'react';

interface ScanPreviewProps {
  imageUrl: string;
  extractedText: string;
  onClose: () => void;
}

export default function ScanPreview({ imageUrl, extractedText, onClose }: ScanPreviewProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8">
      <div className="bg-white w-full max-w-6xl h-full rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="font-bold text-slate-800">Pedagogical Bridge: Analog Scan vs. Digital Extraction</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-black text-xl"></button>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left: The Original Scan */}
          <div className="w-1/2 p-4 border-r overflow-auto bg-slate-200">
            <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Physical Assessment Scan</p>
            <img src={imageUrl} alt="Student Scan" className="w-full shadow-lg" />
          </div>
          
          {/* Right: The AI Extraction */}
          <div className="w-1/2 p-6 overflow-auto">
            <p className="text-xs font-bold text-slate-500 mb-2 uppercase">AI Technical Extraction (Bilingual Mapping)</p>
            <div className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                {extractedText}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
