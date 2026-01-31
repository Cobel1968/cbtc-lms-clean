"use client";
export default function MilestoneForecast({ englishScore, frenchScore, startDate }: any) {
  const avgScore = (englishScore + frenchScore) / 2;
  const standardDurationWeeks = 12;
  
  // Temporal Optimization: High scores reduce the remaining time
  const optimizedDuration = Math.max(4, standardDurationWeeks * (1 - (avgScore / 150)));
  
  const graduationDate = new Date(startDate);
  graduationDate.setDate(graduationDate.getDate() + (optimizedDuration * 7));

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-[2rem] shadow-2xl">
      <h3 className="text-xs font-black uppercase tracking-widest opacity-60 mb-4">AI Milestone Forecast</h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-3xl font-black">{optimizedDuration.toFixed(1)} Weeks</p>
          <p className="text-[10px] font-bold opacity-80 uppercase">Projected Completion Time</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-400">{graduationDate.toLocaleDateString()}</p>
          <p className="text-[10px] font-bold opacity-80 uppercase">Target Graduation</p>
        </div>
      </div>
      <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-400 transition-all" style={{ width: `${avgScore}%` }}></div>
      </div>
    </div>
  );
}