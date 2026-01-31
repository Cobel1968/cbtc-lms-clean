"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const supabase = createClient();
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const fetchRecords = async () => {
    const { data } = await supabase.from('student_evidence').select('*, students(name)').order('created_at', { ascending: false });
    if (data) setRecords(data);
  };

  useEffect(() => { fetchRecords(); }, []);

  const submitRequest = async () => {
    if (!reason) return alert("Admin requires a reason for deletion.");
    
    const record = records.find(r => r.id === requestingId);
    
    const { error } = await supabase.from('deletion_audit_log').insert({
      evidence_id: requestingId,
      student_name: record?.students?.name,
      assessment_title: record?.assessment_title,
      reason_for_deletion: reason
    });

    if (!error) {
      alert("Request sent to Admin Oversight.");
      setRequestingId(null);
      setReason("");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-slate-900">Evidence Folder</h1>
        <button onClick={() => router.push('/admin-dashboard')} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs">
          ← DASHBOARD
        </button>
      </div>

      <div className="space-y-4">
        {records.map((r) => (
          <div key={r.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-900">{r.assessment_title}</h3>
              <p className="text-slate-400 font-medium italic">Student: {r.students?.name}</p>
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setRequestingId(r.id)} 
                className="text-slate-400 font-bold text-xs hover:text-rose-500 uppercase tracking-widest border-b border-transparent hover:border-rose-500 transition-all"
              >
                Request Removal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deletion Request Modal */}
      {requestingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-[2rem] max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-black mb-2">Administrative Deletion</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">Please provide a reason for the record removal request.</p>
            <textarea 
              className="w-full p-4 bg-slate-50 border rounded-2xl mb-6 h-32 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="e.g., Scan was blurry, incorrect student assigned, or duplicate record..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex gap-4">
              <button onClick={() => setRequestingId(null)} className="flex-1 font-bold text-slate-400">Cancel</button>
              <button onClick={submitRequest} className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-black shadow-lg">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}