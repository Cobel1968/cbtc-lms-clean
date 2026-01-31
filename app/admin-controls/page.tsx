"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminControls() {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    const { data } = await supabase.from('deletion_audit_log').select('*').eq('status', 'PENDING_ADMIN');
    if (data) setRequests(data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const approveDelete = async (requestId: string, evidenceId: string) => {
    // 1. Delete the actual evidence
    await supabase.from('student_evidence').delete().eq('id', evidenceId);
    // 2. Update the log status
    await supabase.from('deletion_audit_log').update({ status: 'APPROVED' }).eq('id', requestId);
    fetchRequests();
  };

  return (
    <div className="p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black mb-2">Admin Security Oversight</h1>
      <p className="text-slate-500 mb-10 font-bold uppercase text-xs tracking-widest">Authorized Personnel Only</p>
      
      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-rose-600 font-black text-[10px] tracking-tighter uppercase mb-1">Reason: {r.reason_for_deletion}</p>
              <h3 className="text-xl font-bold">Remove: {r.assessment_title}</h3>
              <p className="text-slate-400 text-sm italic">Candidate: {r.student_name}</p>
            </div>
            <button 
              onClick={() => approveDelete(r.id, r.evidence_id)}
              className="bg-rose-600 text-white px-8 py-3 rounded-xl font-black hover:bg-rose-700 shadow-lg transition-all"
            >
              AUTHORIZE DELETION
            </button>
          </div>
        ))}
        {requests.length === 0 && <p className="text-center py-20 text-slate-300 font-bold">No pending deletion requests.</p>}
      </div>
    </div>
  );
}