import React from 'react';

interface CertificateProps {
  student_name: string;
  course_track: string;
  fluency_score: number | string;
  terms_count: number | string;
  current_date: string;
}

export default function CertificateTemplate({
  student_name,
  course_track,
  fluency_score,
  terms_count,
  current_date
}: CertificateProps) {
  // Ensure we have a date string to prevent hydration errors
  const displayDate = current_date || new Date().toLocaleDateString();

  return (
    <div className="certificate-border p-10 border-8 border-double border-yellow-600 bg-white text-center max-w-4xl mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <img 
          src="https://rvlcpygatguvxhuliand.supabase.co/storage/v1/object/public/assets/cobel-logo.png" 
          alt="Cobel Logo" 
          className="h-24" 
        />
        <div className="text-right">
          <h1 className="text-3xl font-serif font-bold text-gray-800">COBEL BUSINESS TRAINING CENTER</h1>
          <p className="text-sm italic text-gray-600">Bridging Vocational Gaps Digitally</p>
        </div>
      </div>

      <h2 className="text-5xl font-serif mb-6 text-gray-900">CERTIFICATE OF COMPLETION</h2>
      <h3 className="text-xl mb-8 uppercase tracking-widest text-gray-700">CERTIFICAT DE R&Eacute;USSITE</h3>

      <p className="text-lg text-gray-600">This is to certify that / Ceci certifie que</p>
      <p className="text-4xl font-bold font-serif my-4 text-blue-900">{student_name || 'Valued Student'}</p>

      <p className="text-lg text-gray-600 mb-2">
        has successfully completed the vocational track in / a r&eacute;ussi le parcours professionnel en
      </p>
      <p className="text-2xl font-semibold text-gray-800 mb-8">{course_track || 'General Vocational Studies'}</p>

      <hr className="border-t border-gray-300 w-1/2 mx-auto my-6" />

      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg mb-10 border border-gray-200">
        <div>
          <p className="text-xs uppercase text-gray-500 font-bold">Technical Fluency Score</p>
          <p className="text-2xl font-mono text-blue-700">{fluency_score || 0}% Proficiency</p>
        </div>
        <div>
          <p className="text-xs uppercase text-gray-500 font-bold">Bilingual Terms Mapped</p>
          <p className="text-2xl font-mono text-blue-700">{terms_count || 0} Terms Identified</p>
        </div>
      </div>

      <div className="flex justify-between items-end mt-12">
        <div className="text-center w-1/3 border-t border-gray-400 pt-2">
          <p className="text-sm font-bold text-gray-800">Abel C.</p>
          <p className="text-xs text-gray-500 font-bold">Director / Directeur</p>
        </div>
        
        <div className="w-1/4">
          {/* Visual representation of the verification QR code */}
          <div className="bg-gray-200 h-24 w-24 mx-auto mb-2 flex items-center justify-center text-[8px] text-gray-400 border border-dashed border-gray-300">
            [QR CODE FOR VERIFICATION]
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">Scan to Verify Authenticity</p>
        </div>

        <div className="text-center w-1/3 border-t border-gray-400 pt-2">
          <p className="text-sm font-bold text-gray-800 italic font-serif">Cobel AI Engine Validated</p>
          <p className="text-xs text-gray-500 font-bold">Registry Date: {displayDate}</p>
        </div>
      </div>
    </div>
  );
}