'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react'
import { BookOpen, Wrench, ShieldCheck, RefreshCw, Calendar, AlertCircle, PlayCircle } from 'lucide-react'

export default function course_switcher() {
  const [courses, set_courses] = useState<any[]>([])
  const [active_course, set_active_course] = useState<any>(null)
  const [loading, set_loading] = useState(true)
  const [error, set_error] = useState(false)

  // 1. Initial Load: Proactive scanning of the curriculum
  useEffect(() => {
    const load_courses = async () => {
      try {
        const res = await fetch('/api/courses')
        const result = await res.json()
        const data = result.data || []
        
        if (data.length > 0) {
          const normalized = data.map((c: any) => ({
            ...c,
            type: c.type?.toLowerCase() || 'vocational'
          }))
          set_courses(normalized)
          set_active_course(normalized[0])
        } else {
          set_error(true)
        }
      } catch (err) {
        console.error("cobel engine: proactive load error", err)
        set_error(true)
      } finally {
        set_loading(false)
      }
    }
    load_courses()
  }, [])

  // 2. FEATURE 3: Temporal Optimization - Session Tracking Logic
  useEffect(() => {
    if (!active_course) return;

    const start_time = Date.now();
    console.log(`cobel_engine: session_started for ${active_course.id}`);

    // Cleanup function: Triggered when course changes or user leaves page
    return () => {
      const end_time = Date.now();
      const duration_ms = end_time - start_time;
      const duration_minutes = Math.round(duration_ms / 60000);

      // Only record sessions longer than 0 minutes to avoid noise
      if (duration_minutes >= 0) {
        save_session_progress(active_course.id, duration_minutes);
      }
    };
  }, [active_course]);

  // 3. The Pulse Function: Sending data to the Enrollment Engine
  async function save_session_progress(course_id: string, minutes: number) {
    try {
      await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: course_id,
          time_spent: minutes,
          timestamp: new Date().toISOString()
        })
      });
      console.log(`cobel_engine: temporal_sync_success (${minutes}m recorded)`);
    } catch (err) {
      console.error("cobel_engine: temporal_sync_error", err);
    }
  }

  if (loading) return (
    <div className="p-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200 text-center lowercase">
      <RefreshCw className="mx-auto text-indigo-500 animate-spin mb-4" size={32} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
        cobel ai engine: scanning d: drive for vocational modules...
      </p>
    </div>
  )

  if (error) return (
    <div className="p-10 bg-red-50 rounded-[40px] border border-red-100 text-center text-red-600 lowercase">
      <AlertCircle className="mx-auto mb-2" size={32} />
      <p className="font-bold uppercase tracking-tighter">registry sync failed</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-8 lowercase">
      {/* Category Summary */}
      <div className="flex gap-4">
        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
          <Wrench size={12} className="text-emerald-500"/>
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
            vocational: {courses.filter(c => c.type === 'vocational').length}
          </span>
        </div>
        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
          <BookOpen size={12} className="text-indigo-500"/>
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
            grammar: {courses.filter(c => c.type === 'grammar').length}
          </span>
        </div>
      </div>

      {/* Adaptive Curriculum Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => set_active_course(course)}
            className={`p-5 rounded-[24px] text-left transition-all border-2 flex flex-col justify-between min-h-[130px] ${
              active_course?.id === course.id 
              ? 'border-slate-900 bg-white shadow-xl translate-y-[-4px]' 
              : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm opacity-60 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                 <div className={`p-2 rounded-lg ${course.type === 'grammar' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {course.type === 'grammar' ? <BookOpen size={14}/> : <Wrench size={14}/>}
                 </div>
                 <PlayCircle size={16} className={active_course?.id === course.id ? 'text-slate-900' : 'text-slate-200'} />
              </div>
              <h3 className="font-black text-xs leading-tight text-slate-800 uppercase italic tracking-tighter">
                {course.name_en}
              </h3>
            </div>
            
            <div className="mt-3 flex items-center gap-1.5 text-[8px] text-slate-400 font-bold uppercase tracking-widest">
              <span>{course.price} {course.currency}</span>
              <span>Ã¢â‚¬Â¢</span>
              <span>{course.type}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Adaptive Learning Environment */}
      {active_course && (
        <div className="rounded-[48px] overflow-hidden border-[12px] border-slate-900 shadow-2xl bg-white relative">
          <div className="bg-slate-900 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
               <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-slate-800"/>
                  <div className="w-3 h-3 rounded-full bg-slate-800"/>
                  <div className="w-3 h-3 rounded-full bg-slate-800"/>
               </div>
               <span className="text-[10px] font-mono text-slate-400 truncate max-w-[400px] uppercase tracking-widest">
                 injection_point://{active_course.file_path}
               </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase">
                <ShieldCheck size={14} className="text-emerald-400"/> 
                {active_course.is_auto_detected ? 'proactive scan' : 'db verified'}
              </div>
            </div>
          </div>
          
          <iframe 
            key={active_course.id} 
            src={active_course.file_path} 
            className="w-full h-[800px] border-none" 
            title="cobel learning environment"
          />
        </div>
      )}
    </div>
  )
}