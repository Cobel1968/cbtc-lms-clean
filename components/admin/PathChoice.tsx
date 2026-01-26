# 1. Ensure the directory exists
$dir = "components/admin"
if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir }

# 2. Write the component file
$path = "components/admin/PathChoice.tsx"
$code = @"
import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PathChoiceProps {
  courseName: string;
  standardWeeks: number;
  reductionDays: number;
  onSelect: (path: 'standard' | 'optimized') => void;
}

export const PathChoice = ({ courseName, standardWeeks, reductionDays, onSelect }: PathChoiceProps) => {
  const optimizedWeeks = (standardWeeks - (reductionDays / 5)).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4">
      {/* Standard Path */}
      <div className="border-2 border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Standard Path</h3>
        <p className="text-slate-500 text-sm mb-4">Complete vocational curriculum with no prior credit.</p>
        <div className="text-4xl font-black text-slate-900 mb-6">{standardWeeks} <span className="text-lg font-normal text-slate-400">Weeks</span></div>
        <button 
          onClick={() => onSelect('standard')}
          className="w-full py-3 border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors"
        >
          Select Standard
        </button>
      </div>

      {/* Cobel Optimized Path */}
      <div className="border-2 border-blue-600 bg-blue-50/30 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-blue-100">
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-tighter rounded-bl-lg">
          Recommended
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          Cobel Optimized <Zap className="w-5 h-5 fill-blue-600 text-blue-600" />
        </h3>
        <p className="text-blue-700/70 text-sm mb-4">Accelerated based on your technical technical fluency.</p>
        <div className="text-4xl font-black text-blue-600 mb-1">{optimizedWeeks} <span className="text-lg font-normal text-blue-400">Weeks</span></div>
        <div className="text-sm font-bold text-green-600 mb-6 flex items-center gap-1">
          <Check className="w-4 h-4" /> You save {reductionDays} days of redundant training
        </div>
        <button 
          onClick={() => onSelect('optimized')}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          Begin Optimized Path
        </button>
      </div>
    </div>
  );
};
"@

[System.IO.File]::WriteAllText($path, $code, [System.Text.Encoding]::UTF8)
Write-Host "--- PathChoice Component Created at $path ---" -ForegroundColor Green