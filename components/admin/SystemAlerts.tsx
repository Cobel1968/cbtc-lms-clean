'use client'
import { AlertCircle, ArrowRight } from 'lucide-react';

export default function SystemAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-rose-50 border-l-4 border-rose-600 p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <AlertCircle className="text-rose-600 mr-3" size={24} />
            <div>
              <p className="text-xs font-bold text-rose-800 uppercase tracking-tighter">System Critical</p>
              <p className="text-sm text-rose-900 font-medium">{alert.message}</p>
            </div>
          </div>
          <button className="flex items-center text-xs font-bold text-rose-700 hover:text-rose-900 transition">
            AUTO-TUNE MODULE <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      ))}
    </div>
  );
}
