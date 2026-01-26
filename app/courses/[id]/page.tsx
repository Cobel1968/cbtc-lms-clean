'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const staticPath = '/courses/Vocational/' + id + '.html';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '15px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
        <button 
          onClick={() => router.push('/student/dashboard')}
          style={{ cursor: 'pointer', fontWeight: 'bold', background: '#1e293b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px' }}
        >
           MAIN MENU
        </button>
        <span style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>
          Cobel Module: {id}
        </span>
      </div>
      <iframe 
        src={staticPath}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Vocational Content"
      />
    </div>
  );
}
