'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  UserPlus, 
  Fingerprint, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import TrainerDashboard from '@/components/TrainerDashboard';
import StudentInviteModal from '@/components/StudentInviteModal';
import HandwritingUpload from '@/components/HandwritingUpload';
import PathProjectionCard from '@/components/PathProjectionCard';

export default function UnifiedCobelDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'overview', label: 'Analytics Console', icon: <BarChart3 size={20} /> },
    { id: 'onboarding', label: 'Student Enrollment', icon: <UserPlus size={20} /> },
    { id: 'bridge', label: 'Analog-to-Digital', icon: <Fingerprint size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* CORPORATE LOGO SECTION */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-50">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image 
              src="/images/logo1.png" 
              alt="Cobel BTC Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-gray-900 leading-tight uppercase tracking-tighter">
              Cobel <span className="text-blue-600 text-xs block">Business Training</span>
            </span>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium text-sm">{item?.label}</span>}
            </button>
          ))}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 p-3 text-gray-400 hover:text-red-500 w-full transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Exit System</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">Abel C.</p>
              <p className="text-[10px] text-gray-400">Chief Pedagogical Architect</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-600">
              AC
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* DYNAMIC VIEW CONTENT */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TrainerDashboard />
                </div>
                <div>
                  <PathProjectionCard baseWeeks={12} currentFluency={0.85} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'onboarding' && (
            <div className="max-w-xl mx-auto py-10 animate-in slide-in-from-bottom-4 duration-500">
              <StudentInviteModal />
            </div>
          )}

          {activeTab === 'bridge' && (
            <div className="max-w-2xl mx-auto py-10 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="bg-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
                <h2 className="text-xl font-bold mb-2">Pedagogical Logic: Feature 4</h2>
                <p className="text-blue-100 text-sm">
                  Ingest physical assessments to update bilingual technical fluency and curriculum density in real-time.
                </p>
              </div>
              <HandwritingUpload />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
