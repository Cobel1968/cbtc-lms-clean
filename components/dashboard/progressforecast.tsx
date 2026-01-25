'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext'; // lowercase path
import bilingualtext from '@/components/bilingualtext'; // lowercase path

/**
 * FEATURE 3: Automated Milestone Forecasting
 * Component: ProgressForecast (PascalCase)
 * File: progressforecast.tsx (lowercase)
 */
export default function ProgressForecast() {
  const { fluency_score, isMounted } = useLanguage(); // useLanguage (hook)
  const [forecast, set_forecast] = useState<{ days: number; date: string; density: string } | null>(null);

  useEffect(() => {
    if (!isMounted) return;

    // Temporal Optimization Logic
    const base_days = 90;
    const density_multiplier = 1 + ((100 - fluency_score) / 100);
    const predicted_days = Math.ceil(base_days * density_multiplier);
    
    const completion_date = new Date();
    // Use built-in camelCase methods: getDate() and setDate()
    completion_date.setDate(completion_date.getDate() + predicted_days);

    set_forecast({
      days: predicted_days,
      density: density_multiplier.toFixed(2),
      // Use built-in camelCase method: toLocaleDateString()
      date: completion_date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
  }, [fluency_score, isMounted]);

  // Vercel Hydration Guard
  if (!isMounted || !forecast) {
    return <div className="animate-pulse bg-gray-100 h-32 rounded-xl w-full" />;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {/* Component call: bilingualtext (PascalCase) */}
            <bilingualtext text={{ fr: "Prévision de Diplôme", en: "Graduation Forecast" }} />
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{forecast.date}</p>
        </div>
        <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
          {forecast.density}x <bilingualtext text={{ fr: "Densité", en: "Density" }} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-600">
            <bilingualtext text={{ fr: "Fluence Technique", en: "Technical Fluency" }} />
          </span>
          <span className="text-blue-600 font-bold">{fluency_score}%</span>
        </div>
        
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-1000 ease-in-out"
            style={{ width: `${fluency_score}%` }}
          />
        </div>

        <p className="text-[10px] text-gray-400 italic mt-2">
          <bilingualtext 
            text={{ 
              fr: "*Ajusté via le Cobel AI Engine.", 
              en: "*Adjusted via Cobel AI Engine." 
            }} 
          />
        </p>
      </div>
    </div>
  );
}
