import React from 'react';

export default function FrictionDashboard({ alerts }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Instructor Friction Alerts</h2>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          {alerts.length} Intervention(s) Needed
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border-l-4 border-red-500 bg-slate-50 rounded-r-lg">
            <div className="flex justify-between">
              <h3 className="font-semibold text-slate-700">{alert.student_name}</h3>
              <span className="text-xs text-slate-500">{alert.timestamp}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              <strong>Issue:</strong> {alert.type} in {alert.module_slug}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                View Handwritten SOP
              </button>
              <button className="text-xs bg-white border border-slate-300 px-3 py-1 rounded hover:bg-slate-100">
                Override AI Path
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
