'use client'
import React from 'react';
export default function AdaptiveProgressBar({ value, density }) {
  const color = density > 1.2 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="w-full bg-slate-100 rounded-full h-2.5">
      <div className={h-2.5 rounded-full } style={{ width: ${value}% }}></div>
    </div>
  );
}
