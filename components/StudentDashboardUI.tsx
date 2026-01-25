'use client';
import React, { useState } from 'react';
import { LayoutDashboard, UserPlus, Fingerprint, BarChart3, LogOut, Menu, X, Zap } from 'lucide-react';
import TrainerDashboard from './TrainerDashboard';
import StudentInviteModal from './StudentInviteModal';
import HandwritingUpload from './HandwritingUpload';
import MilestoneForecast from './MilestoneForecast';
import TechnicalTermCloud from './TechnicalTermCloud';

export default function StudentDashboardUI({ initialProfile, user }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Feature 3 & 4 State: Temporal Optimization & Lexicon Ingestion
  const [minutesMastered, setMinutesMastered] = useState(
    (initialProfile?.fluency_score || 0.85) * 6000
  );
  const [extractedTerms, setExtractedTerms] = useState<any[]>([]);

  // Innovation: Logic Bridge to update the Engine when a scan is processed
  const handleEngineUpdate = (data: { fluencyScore: number; terms?: any[] }) => {
    // Update Milestone Logic
    const updatedMinutes = data.fluencyScore * 6000;
    setMinutesMastered(updatedMinutes);
    
    // Update Lexicon Logic
    if (data.terms) {
      setExtractedTerms(data.terms);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Analytics Console', icon: <BarChart3 size={18} /> },
    { id: 'onboarding', label: 'Enrollment', icon: <UserPlus size={18} /> },
    { id: 'bridge', label: 'Analog-to-Digital', icon: <Fingerprint size={18} /> },
  ];

  return (
    <div className="flex h-[calc(100vh-73px)] overflow-hidden">
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 sm:w-20'} bg-white border-r border-slate-100 transition-all duration-300 flex flex-col z-40`}>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-indigo-100 shadow-lg' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
           <button className="flex items-center gap-3 p-3 text-slate-400 hover:text-red-500 w-full transition-colors">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-tight">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-10 lowercase">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
               <div className="lg:col-span-2 space-y-8">
                  <MilestoneForecast 
                    total_minutes_spent={minutesMastered} 
                    expected_minutes={6000} 
                  />
                  <TrainerDashboard />
               </div>
               
               <div className="space-y-6">
                  {/* Status Panel */}
                  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                       <Zap size={16} fill="currentColor" />
                       <h4 className="text-[10px] font-black uppercase tracking-widest">engine status</h4>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{user.email}</p>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase mt-1 tracking-wider">
                      {initialProfile?.role || 'chief pedagogical architect'}
                    </p>
                  </div>

                  {/* Quick Bridge Access */}
                  <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100">
                    <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-4 text-center">active ingestion</h4>
                    <HandwritingUpload onUploadSuccess={(val: any) => handleEngineUpdate({ fluencyScore: val })} />
                    <TechnicalTermCloud terms={extractedTerms} />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'onboarding' && <div className="max-w-md mx-auto"><StudentInviteModal /></div>}
          
          {activeTab === 'bridge' && (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                <Fingerprint size={48} className="mx-auto text-indigo-400 mb-4" />
                <h2 className="font-black text-2xl tracking-tighter italic uppercase">Feature 4: Analog-to-Digital Bridge</h2>
                <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
                  upload physical assessments to extract bilingual technical terms and optimize curriculum density.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <HandwritingUpload onUploadSuccess={(val: any) => handleEngineUpdate({ fluencyScore: val })} />
                <TechnicalTermCloud terms={extractedTerms} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}