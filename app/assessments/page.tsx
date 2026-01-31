import Link from 'next/link';

export default function AssessmentsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Analog-to-Digital Bridge</h1>
      <p className="text-slate-500 mb-8">Feature 4: Handwriting Analysis Module [cite: 2026-01-01]</p>
      
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
        <div className="text-5xl mb-4"></div>
        <h3 className="text-lg font-bold text-slate-800">Upload Physical Assessment</h3>
        <p className="text-slate-500 text-sm mb-6">Drop scanned PDF or Image here for OCR Pre-processing</p>
        <button className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-rose-600">
          Select Files
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-2">Bilingual Extraction</h4>
          <p className="text-xs text-slate-500">Identifies English/French technical terms to update Vocational Mapping [cite: 2026-01-01].</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-2">Milestone Integration</h4>
          <p className="text-xs text-slate-500">Updates Timeframe Prediction and Curriculum Density automatically [cite: 2026-01-01].</p>
        </div>
      </div>
    </div>
  );
}