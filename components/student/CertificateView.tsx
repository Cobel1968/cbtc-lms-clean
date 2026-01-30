'use client'
import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

export default function CertificateView({ studentName, masteryScore, completionDate, verificationHash }) {
  return (
    <div className="max-w-4xl mx-auto p-12 bg-white border-[16px] border-double border-slate-200 shadow-2xl relative overflow-hidden">
      <Award className="absolute -bottom-10 -right-10 text-slate-50 opacity-10" size={400} />
      
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">CERTIFICATE OF TECHNICAL FLUENCY</h1>
        <h2 className="text-xl font-serif italic text-slate-600 mb-8 underline">Certificat de Maîtrise Technique</h2>
        
        <p className="text-lg text-slate-500 mb-2">This is to certify that / Ceci certifie que</p>
        <p className="text-3xl font-bold text-indigo-900 mb-8 uppercase tracking-widest">{studentName}</p>
        
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Has successfully mastered the bilingual technical requirements for Vocational Training, 
          demonstrating a technical mastery score of <strong>{masteryScore}%</strong> 
          across physical and digital assessments as verified by the <strong>Cobel AI Engine</strong>.
        </p>

        <div className="flex justify-between items-end mt-16 px-10">
          <div className="text-center">
            <div className="border-b border-slate-400 w-48 mb-2"></div>
            <p className="text-xs font-bold text-slate-400 uppercase">Lead Trainer Signature</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-indigo-600 mb-2" size={48} />
            <p className="text-[10px] font-mono text-slate-400">HASH: {verificationHash ? verificationHash.substring(0, 16) : 'PENDING'}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-800">{completionDate}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date of Issue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
