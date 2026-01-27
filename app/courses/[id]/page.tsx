'use client';
import React from 'react';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  
  // 1. Get the ID
  // 2. Remove underscores
  // 3. Force to lowercase to match the physical files in /public
  const rawId = params?.id || '';
  const cleanId = String(rawId).replace(/_/g, '').toLowerCase();
  
  const staticPath = '/courses/Vocational/' + cleanId + '.html';

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'white' }}>
      <header style={{ padding: '10px 20px', background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={() => window.location.href = '/student/dashboard'}
            style={{ background: '#334155', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
             BACK TO MENU
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>COBEL VOCATIONAL SYSTEM</span>
        </div>
        <div style={{ fontSize: '11px', opacity: 0.7 }}>LOADING: {cleanId}.html</div>
      </header>
      
      <div style={{ flex: 1, position: 'relative' }}>
        <iframe 
          src={staticPath}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          title="Course Content"
          onError={() => console.error("Iframe failed to load path:", staticPath)}
        />
      </div>
    </div>
  );
}