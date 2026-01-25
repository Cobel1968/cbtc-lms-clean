'use client';
export const dynamic = 'force-dynamic';
import { useState, useRef, useEffect, useCallback } from 'react'
import { 
  FolderSync, PenTool, ClipboardCheck, FileText, 
  Download, ChevronRight, User, LayoutDashboard, 
  LogOut, ShieldCheck, Activity, HardDrive, RefreshCw
, AlertCircle} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import SignaturePad from 'react-signature-canvas'

// strictly lowercase imports
import report_template from '@/components/ReportTemplate'

const mock_students = [
  { id: '1', name: 'Jean Marc', track: 'Hospitality ESP', speed: '1.4x', saved: '12.5h', status: 'In Workshop' },
  { id: '2', name: 'Soro Aminata', track: 'Maintenance Grammar', speed: '0.9x', saved: '0h', status: 'Reviewing' },
  { id: '3', name: 'Yao Kouadio', track: 'Hospitality ESP', speed: '2.1x', saved: '28h', status: 'Fast-Track' },
]

export default function TrainerDashboard() {
  const [active_tab, set_active_tab] = useState<'roster' | 'folders' | 'reports' | 'audit' | 'curriculum'>('roster')
  const [selected_student, set_selected_student] = useState<any>(null)
  const [audit_log, set_audit_log] = useState<string[]>([])
  const [registry, set_registry] = useState<any[]>([])
  const [is_loading, set_is_loading] = useState(false)
  
  const report_ref = useRef<HTMLDivElement>(null)
  const sig_pad = useRef<any>(null)

  const fetch_curriculum = useCallback(async () => {
    set_is_loading(true)
    try {
      const res = await fetch('/api/courses')
      const result = await res.json()
      set_registry(result.data || [])
    } catch (err) {
      console.error("failed_curriculum_sync", err)
    } finally {
      set_is_loading(false)
    }
  }, [])

  useEffect(() => { fetch_curriculum() }, [fetch_curriculum])

  const run_audit = async () => {
    set_active_tab('audit')
    set_audit_log(["ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡¸à¢à¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡ initializing proactive scan...", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡¸à¢à¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡¡ connecting to hybrid api..."])
    const logs = await run_full_system_audit()
    set_audit_log(logs)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex lowercase font-medium">
      {/* sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-black text-indigo-900 tracking-tighter italic uppercase">cobel ai engine</h2>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">proactive mode active</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <nav_item icon={<LayoutDashboard size={20}/>} label="overview" active={active_tab === 'roster'} onClick={() => set_active_tab('roster')} />
          <nav_item icon={<FolderSync size={20}/>} label="live curriculum" active={active_tab === 'curriculum'} onClick={() => set_active_tab('curriculum')} />
          <nav_item icon={<User size={20}/>} label="student folders" active={active_tab === 'folders'} onClick={() => set_active_tab('folders')} />
          <nav_item icon={<FileText size={20}/>} label="verification reports" active={active_tab === 'reports'} onClick={() => set_active_tab('reports')} />
          <nav_item icon={<Activity size={20}/>} label="system audit" active={active_tab === 'audit'} onClick={run_audit} />
        </nav>

        <div className="p-6 border-t">
          <button className="flex items-center gap-3 text-slate-400 font-bold text-sm hover:text-red-500 transition-colors w-full uppercase">
            <LogOut size={20}/> logout
          </button>
        </div>
      </aside>

      {/* main content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">training management</h1>
            <p className="text-slate-500 font-medium italic underline decoration-indigo-200">abel c. - pedagogical command center</p>
          </div>
          <div className="flex gap-3">
             <button onClick={fetch_curriculum} className="bg-white border border-slate-200 p-3 rounded-2xl hover:bg-slate-50 transition-all">
                <RefreshCw size={18} className={is_loading ? 'animate-spin' : ''} />
             </button>
             <button onClick={run_audit} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 uppercase">
               <ShieldCheck size={16}/> run system audit
             </button>
          </div>
        </header>

        {/* curriculum tab */}
        {active_tab === 'curriculum' && (
           <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold flex items-center gap-2"><HardDrive size={18} className="text-indigo-600"/> d: drive content injection</h3>
                 <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase">real-time sync active</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="p-4 px-8 border-b">asset name</th>
                    <th className="p-4 border-b">category</th>
                    <th className="p-4 border-b">source</th>
                    <th className="p-4 border-b text-right px-8">audit status</th>
                  </tr>
                </thead>
                <tbody>
                  {registry.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 px-8 border-b font-bold text-slate-700 text-sm lowercase">{course.name_en}</td>
                      <td className="p-4 border-b">
                        <span className="px-2 py-1 rounded-md text-[9px] font-bold uppercase bg-indigo-50 text-indigo-600">
                          {course.type}
                        </span>
                      </td>
                      <td className="p-4 border-b text-[10px] font-mono text-slate-400 uppercase">
                        {course.is_auto_detected ? 'local fs' : 'supabase db'}
                      </td>
                      <td className="p-4 border-b text-right px-8">
                        <div className="text-emerald-500 font-black text-[10px] flex items-center justify-end gap-1 uppercase">
                          <Activity size={12}/> injectable
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        )}
        {/* other tabs follow similar logic... */}
      </main>
    </div>
  )
}

function nav_item({ icon, label, active = false, onClick }: any) {
  return (
    <div onClick={onClick} className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}>
      <span className={active ? 'text-white' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm font-bold tracking-tight lowercase">{label}</span>
    </div>
  )
}
