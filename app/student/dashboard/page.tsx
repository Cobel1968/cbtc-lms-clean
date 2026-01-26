'use client';
import React from 'react';

export default function StudentDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a' }}>JEAN'S PORTAL</h1>
          <p style={{ color: '#64748b' }}>Cobel Business Training Center | LMS</p>
        </div>
        <button onClick={() => window.location.href='/login'} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          EXIT SYSTEM
        </button>
      </header>
      
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Vocational Modules</h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Start your bilingual technical training.</p>
          <a href="/courses" style={{ display: 'inline-block', background: '#0f172a', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            VIEW COURSES
          </a>
        </div>
      </main>
      
      <a href="/" style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#000', color: '#fff', padding: '10px', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold', boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}>HOME</a>
    </div>
  );
}