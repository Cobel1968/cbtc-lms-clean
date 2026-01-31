"use client";
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReadinessReport() {
  const supabase = createClient();
  const [readinessData, setReadinessData] = useState<any>(null);
  const reportRef = useRef(null);

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase.from('student_competency_matrix').select('*').limit(1).single();
      if (data) setReadinessData(data);
    }
    fetchStats();
  }, []);

  const downloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${readinessData?.name}_Certificate.pdf`);
  };

  if (!readinessData) return <div className="p-20 text-center font-black">GENERATING SECURE CREDENTIAL...</div>;

  const studentPortalUrl = `https://cbtc-lms.vercel.app/student/${readinessData.student_id}`;

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between">
        <button onClick={downloadPDF} className="px-6 py-2 bg-blue-600 text-white font-black rounded-full uppercase text-[10px]">Download Verified PDF</button>
      </div>

      <div ref={reportRef} className="bg-white p-16 shadow-2xl max-w-4xl mx-auto rounded-sm relative border-[12px] border-slate-50">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Certificate of Mastery</h1>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-2">Bilingual Vocational Verification</p>
          </div>
          {/* Digital Verification QR */}
          <div className="text-right flex flex-col items-end">
            <QRCodeSVG value={studentPortalUrl} size={80} level="H" />
            <p className="text-[8px] font-black uppercase mt-2 text-slate-400">Scan to Verify Result</p>
          </div>
        </div>

        <div className="mb-12">
          <label className="text-[10px] font-black text-slate-300 uppercase">Candidate Name</label>
          <p className="text-3xl font-bold border-b border-slate-100 pb-2">{readinessData.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="p-6 bg-slate-50 rounded-2xl">
            <h4 className="text-[10px] font-black uppercase mb-4 opacity-40">Bilingual Proficiency</h4>
            <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-[9px] font-bold mb-1"><span>English (Technical)</span><span>{readinessData.english_fluency}%</span></div>
                 <div className="h-1 bg-slate-200 w-full rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{width: `${readinessData.english_fluency}%`}} /></div>
               </div>
               <div>
                 <div className="flex justify-between text-[9px] font-bold mb-1"><span>French (Technical)</span><span>{readinessData.french_fluency}%</span></div>
                 <div className="h-1 bg-slate-200 w-full rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: `${readinessData.french_fluency}%`}} /></div>
               </div>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-xs italic text-slate-500">"This student has demonstrated mastery in the **{readinessData.domain}** domain via physical and digital assessments."</p>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end border-t pt-8">
           <div className="text-center">
             <div className="w-32 border-b border-slate-900 mx-auto mb-2"></div>
             <p className="text-[9px] font-black uppercase">Technical Director</p>
           </div>
           <p className="text-[9px] font-bold text-slate-300">VALID AT: {studentPortalUrl}</p>
        </div>
      </div>
    </div>
  );
}