'use client'
import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function FrictionExport() {
  const handleExport = async () => {
    const response = await fetch('/api/admin/export-friction');
    const data = await response.json();
    
    // Convert to CSV for quick vocational reporting
    const headers = "Student,Status,Curriculum Density,Friction Incidents\n";
    const csv = data.map(row => \,\,\,\).join("\n");
    
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \Cobel_Friction_Report_\.csv\;
    a.click();
  };

  return (
    <div className="mt-8 p-6 bg-slate-900 text-white rounded-xl flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold flex items-center">
          <FileText className="mr-2 text-indigo-400" /> Technical Gap Audit
        </h3>
        <p className="text-sm text-slate-400">Generate a detailed report of bilingual friction points and predicted delays.</p>
      </div>
      <button 
        onClick={handleExport}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold flex items-center transition"
      >
        <Download size={18} className="mr-2" /> EXPORT CSV
      </button>
    </div>
  );
}
