'use client'
import React from 'react';
export default function FrictionExport() {
  const handleExport = () => { console.log('Exporting...'); };
  return (
    <button onClick={handleExport} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
      Export Friction Data
    </button>
  );
}
