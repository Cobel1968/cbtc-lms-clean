'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import AssessmentUploader from '@/components/assessment/assessmentuploader'; 

export default function CourseDetailPage() {
  const params = useParams();
  const [courseData, setCourseData] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState(1);
  
  const rawId = params?.id || '';
  const noHyphenId = String(rawId).replace(/-/g, '').toLowerCase();

  useEffect(() => {
    async function fetchCourse() {
      const { data } = await supabase
        .from('courses')
        .select('*, curriculum')
        .eq('id', rawId)
        .single();
      if (data) setCourseData(data);
    }
    if (rawId) fetchCourse();
  }, [rawId]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
      <header style={{ padding: '15px 25px', background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <button onClick={() => window.history.back()} style={{ marginRight: '15px', padding: '5px 10px', cursor: 'pointer' }}>← Retour</button>
           <strong>LMS DYNAMIQUE: {courseData?.name_fr || 'Chargement...'}</strong>
        </div>
        <span>Module Actuel: {currentModule} / 8</span>
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT: CONTENT VIEWPORT */}
        <div style={{ width: '65%', background: '#fff', position: 'relative' }}>
          <iframe 
            src={`/courses/Vocational/${noHyphenId}.html#module${currentModule}`} 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Course Content"
          />
        </div>

        {/* RIGHT: SOW & ASSESSMENT SIDEBAR */}
        <div style={{ width: '35%', padding: '20px', borderLeft: '1px solid #ddd', overflowY: 'auto', background: '#fff' }}>
          <h3 style={{ fontWeight: '800', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>SOW (Scheme of Work)</h3>
          
          <div style={{ marginTop: '20px' }}>
            {courseData?.curriculum?.map((m: any, index: number) => (
              <button 
                key={index}
                onClick={() => setCurrentModule(index + 1)}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '12px', marginBottom: '8px',
                  borderRadius: '6px', border: '1px solid',
                  cursor: 'pointer',
                  background: currentModule === (index + 1) ? '#eff6ff' : 'white',
                  borderColor: currentModule === (index + 1) ? '#3b82f6' : '#e2e8f0',
                  color: currentModule === (index + 1) ? '#1d4ed8' : '#1e293b'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Mod {index + 1}: {m.title_fr}</div>
                <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#64748b' }}>{m.title_en}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <h4 style={{ color: '#1e293b', marginTop: 0 }}>📝 Assessment Bridge</h4>
            <p style={{ fontSize: '12px', color: '#475569' }}>Submit your handwritten work for <strong>Module {currentModule}</strong>.</p>
            <button onClick={() => window.location.href += "/analysis"} style={{width:"100%", padding:"15px", background:"#2563eb", color:"white", borderRadius:"8px", cursor:"pointer", fontWeight:"bold"}}>Ouvrir le Pont d'Analyse (Full Screen) </button>
          </div>
        </div>
      </div>
    </div>
  );
}
