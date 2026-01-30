'use client'
import React from 'react';

export default function FrictionHeatmap({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Curriculum Friction Heatmap</h3>
      <div className="space-y-4">
        {data.map((module) => (
          <div key={module.module_name} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-700">{module.module_name}</span>
              <span className="text-xs font-bold text-rose-600">{module.total_friction_incidents} Alerts</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
              <div 
                className={h-full transition-all duration-700 \}
                style={{ width: \% }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Avg Density: \%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
