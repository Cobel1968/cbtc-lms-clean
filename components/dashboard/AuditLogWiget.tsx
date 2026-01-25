'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';

export default function AuditLogWidget() {
  const [logs, setLogs] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const { data } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('status', 'pending_manual_review');
    setLogs(data || []);
  }

  async function approveUser(logId, userId) {
    // 1. Upgrade the user's role manually
    await supabase.from('profiles').update({ 
      role: 'lead_trainer', 
      subscription_tier: 'pro' 
    }).eq('id', userId);

    // 2. Mark log as resolved
    await supabase.from('audit_logs').update({ status: 'resolved' }).eq('id', logId);
    
    fetchLogs(); // Refresh list
  }

  if (logs.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-4 text-amber-700">
        <AlertCircle size={20} />
        <h3 className="font-bold uppercase text-xs tracking-widest">Pending Sync Approvals</h3>
      </div>
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
            <div>
              <p className="text-sm font-bold text-slate-900">User ID: {log.user_id.slice(0,8)}...</p>
              <p className="text-xs text-slate-500">Event: {log.event}</p>
            </div>
            <button 
              onClick={() => approveUser(log.id, log.user_id)}
              className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 transition-all"
            >
              <UserCheck size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}