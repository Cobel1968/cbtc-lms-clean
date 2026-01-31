export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Analytics: Mr. Soro</h1>
          <p className="text-slate-500">Bilingual Vocational Mapping & Evidence Record [cite: 2026-01-01]</p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-bold">Verification: PASSED</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Record of Evidence */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold mb-4 text-slate-800">Analog Evidence (Scanned Document)</h3>
          <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden">
             <p className="text-slate-400 text-sm p-4 text-center italic">Document Archive: Ingested via Feature 4 Handwriting Module</p>
          </div>
        </div>

        {/* Right: Extracted Technical Logic */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold mb-4 text-slate-800">Bilingual Technical Fluency</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span>English Terminology</span><span>82%</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-blue-500 h-full w-[82%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span>French Terminology</span><span>45%</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-rose-400 h-full w-[45%]"></div></div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl">
            <h4 className="font-bold mb-2">Temporal Optimization Forecast</h4>
            <p className="text-2xl font-mono">FEB 15, 2026</p>
            <p className="text-[10px] opacity-70 mt-2">Curriculum Density adjusted based on Technical Fluency [cite: 2026-01-01]</p>
          </div>
        </div>
      </div>
    </div>
  );
}