"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { QRCodeSVG } from 'qrcode.react';

export default function BatchPrintPage() {
  const [students, setStudents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStudents() {
      const { data } = await supabase.from('profiles').select('*');
      if (data) setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="flex justify-between items-center mb-10 no-print">
        <div>
          <h1 className="text-2xl font-black uppercase text-[#003366]">Batch QR Generation</h1>
          <p className="text-xs font-bold text-slate-400">Classroom Physical-to-Digital Bridge</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-[#10B981] text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
        >
          Print All Badges
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="border-2 border-black p-6 rounded-3xl flex flex-col items-center text-center page-break-inside-avoid">
            <div className="w-10 h-10 bg-[#003366] rounded-lg mb-4 flex items-center justify-center">
               <span className="text-white font-black text-[10px]">CBTC</span>
            </div>
            <h3 className="font-black uppercase text-sm tracking-tighter mb-1">{student.full_name}</h3>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-4">{student.technical_domain}</p>
            
            <QRCodeSVG 
              value={`https://cbtc-lms.vercel.app/student/${student.id}`}
              size={100}
              level={"H"}
            />
            <p className="mt-4 text-[7px] font-mono text-slate-300">SCAN TO VIEW PROGRESS</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .page-break-inside-avoid { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}