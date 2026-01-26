'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';

export default function StudentDashboard() {
  return (
    <>
      <a href="/" style={{position:"fixed", top:10, right:10, zIndex:9999, background:"black", color:"white", padding:"8px 15px", fontSize:"10px", textDecoration:"none", fontWeight:"bold", borderRadius:"4px"}}>HOME</a>
      <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">JEAN'S PORTAL</h1>
              <p className="text-slate-500 font-medium">Cobel Business Training Center | Learning Management System</p>
            </div>
            <button 
              onClick={() => window.location.href='/login'} 
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              EXIT SYSTEM
            </button>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Simple Course Card Placeholder to verify routing */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-2">Vocational Modules</h3>
                <p className="text-sm text-slate-600 mb-4">Access your bilingual training content here.</p>
                <a href="/courses/Vocational_Module" className="inline-block bg-slate-900 text-white px-4 py-2 rounded font-bold text-sm">
                  OPEN MODULES
                </a>
             </div>
          </main>
        </div>
      </div>
    </>
  );
}
