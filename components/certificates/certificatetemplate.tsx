import React from 'react';

interface CertificateProps {
  student_name: string;
  course_track: string;
  fluency_score: number | string;
  terms_count: number | string;
  current_date?: string;
}

/**
 * FEATURE 3 & 4: Automated Milestone Forecasting Visual Output
 * This component renders the bilingual vocational certificate 
 * based on data ingested from the Cobel AI Engine.
 */
export default function CertificateTemplate({
  student_name,
  course_track,
  fluency_score,
  terms_count,
  current_date
}: CertificateProps) {
  // Ensure we have a date string to prevent hydration errors during SSG/SSR
  const displayDate = current_date || new Date().toLocaleDateString();

  // Cloud-hosted logo URL for stability and build-failure prevention
  const logoUrl = "https://rvlcpygatguvxhuliand.supabase.co/storage/v1/object/public/assets/cobel-logo.png";

  return (
    <div className="certificate-border p-10 border-8 border-double border-yellow-600 bg-white text-center max-w-4xl mx-auto shadow-2xl my-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <img 
          src={logoUrl} 
          alt="Cobel Logo" 
          className="h-20 w-auto object-contain" 
          crossOrigin="anonymous"
          onError={(e) => { 
            (e.target as HTMLImageElement).src = logoUrl; 
          }}
        />
        <div className="text-right">
          <h1 className="text-2xl font-serif font-bold text-gray-800">COBEL BUSINESS TRAINING CENTER</h1>
          <p className="text-xs italic text-gray-600">Bridging Vocational Gaps Digitally</p>
        </div>
      </div>

      {/* Main Titles */}
      <h2 className="text-5xl font-serif mb-2 text-gray-900">CERTIFICATE OF COMPLETION</h2>
      <h3 className="text-xl mb-10 uppercase tracking-widest text-gray-600">CERTIFICAT DE RÉUSSITE</h3>

      {/* Student Identification */}
      <p className="text-lg text-gray-600 italic">This is to certify that / Ceci certifie que</p>
      <div className="my-6">
        <p className="text-5xl font-bold font-serif text-blue-900 border-b-2 border-gray-100 inline-block px-8 pb-2">
          {student_name || 'Valued Student'}
        </p>
      </div>

      {/* Course Detail */}
      <p className="text-lg text-gray-600 mb-2">
        has successfully completed the vocational track in / a réussi le parcours professionnel en
      </p>
      <p className="text-2xl font-semibold text-gray-800 mb-10">
        {course_track || 'General Vocational Studies'}
      </p>

      {/* Technical Metrics: Feature 4 Output */}
      <div className="grid grid-cols-2 gap-8 bg-slate-50 p-8 rounded-2xl mb-12 border border-slate-100">
        <div className="border-r border-slate-200">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-black mb-1">Technical Fluency Score</p>
          <p className="text-3xl font-mono font-bold text-blue-700">{fluency_score || 0}%</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase">AI-Validated Proficiency</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-black mb-1">Bilingual Terms Mapped</p>
          <p className="text-3xl font-mono font-bold text-blue-700">{terms_count || 0}</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase">Technical Terms Identified</p>
        </div>
      </div>

      {/* Signatures and Verification */}
      <div className="flex justify-between items-end mt-16 px-4">
        <div className="text-center w-1/3 border-t-2 border-gray-900 pt-4">
          <p className="text-lg font-bold text-gray-900">Abel C.</p>
          <p className="text-xs text-gray-500 uppercase font-black">Director / Directeur</p>
        </div>
        
        <div className="w-1/4">
          <div className="bg-gray-50 h-24 w-24 mx-auto mb-2 flex items-center justify-center text-[8px] text-gray-300 border border-dashed border-gray-200 rounded-lg">
            [SECURE QR VERIFICATION]
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-tighter font-bold">Verify Authenticity</p>
        </div>

        <div className="text-center w-1/3 border-t-2 border-gray-900 pt-4">
          <p className="text-sm font-bold text-gray-900 italic font-serif">Cobel AI Engine Validated</p>
          <p className="text-xs text-gray-500 uppercase font-black">Date: {displayDate}</p>
        </div>
      </div>
    </div>
  );
}
