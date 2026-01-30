import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FrictionBannerProps {
  issue: string;
  missingTerms: string[]; audioUrl?: string;
  onOverride: () => void; onViewScan: () => void;
}

export default function FrictionBanner({ issue, missingTerms, onOverride }: FrictionBannerProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <AlertTriangle className="text-amber-600 mr-3 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide">
            Bilingual Friction Detected
          </h3>
          <p className="text-sm text-amber-700 mt-1">{issue}</p>
          
          {missingTerms.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-semibold text-amber-800">Unverified Technical Terms:</span>
              <div className="flex gap-2 mt-1">
                {missingTerms.map(term => (
                  <span key={term} className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-mono">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <button 
          onClick={onOverride}
          className="ml-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-4 rounded transition"
        >
          Resolve & Approve
        </button>
      </div>
    </div>
  );
}


