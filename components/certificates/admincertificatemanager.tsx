import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const AdminCertificateManager = ({ studentData, userRole }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // RESTRICTION: Only Admin can trigger the download
  if (userRole !== 'admin') {
    return <p className="text-red-500">Access Denied: Only Admins can issue certificates.</p>;
  }

  const downloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Cobel_Cert_${studentData.last_name}.pdf`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* 1. THE VISUAL CERTIFICATE (Hidden from normal view, or displayed as preview) */}
      <div ref={certificateRef} className="p-10 border-8 border-double border-yellow-600 bg-white w-[297mm] h-[210mm] text-center relative">
        <h1 className="text-3xl font-bold">COBEL BUSINESS TRAINING CENTER</h1>
        <h2 className="text-5xl mt-10">CERTIFICATE OF COMPLETION</h2>
        
        <p className="mt-10 text-xl">This certifies that</p>
        <p className="text-4xl font-serif font-bold text-blue-900 underline">{studentData.full_name}</p>
        
        <div className="mt-10 bg-gray-50 p-4 border border-gray-200 inline-block">
            <p className="text-sm font-bold uppercase">Bilingual Technical Fluency</p>
            <p className="text-2xl text-blue-700">{studentData.fluency_score}%</p>
        </div>

        {/* 2. THE DYNAMIC QR CODE */}
        <div className="absolute bottom-10 right-10 text-center">
          <QRCodeSVG 
            value={`https://cobel.ci/verify/${studentData.assessment_id}`} 
            size={80} 
            level="H"
          />
          <p className="text-[10px] mt-1">Scan to Verify</p>
        </div>
      </div>

      {/* 3. THE ADMIN CONTROL BUTTON */}
      <button 
        onClick={downloadPDF}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700 transition"
      >
        Download Official PDF (Admin Only)
      </button>
    </div>
  );
};