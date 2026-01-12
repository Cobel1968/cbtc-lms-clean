'use client';

import { ReactNode } from 'react';
import { BookOpen, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function trainer_layout({ children }: { children: ReactNode }) {
  const nav_items = [
    { label: 'overview', href: '/trainer', icon: BarChart3 },
    { label: 'my classes', href: '/trainer/classes', icon: Users },
    { label: 'curriculum', href: '/trainer/modules', icon: BookOpen },
    { label: 'settings', href: '/trainer/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-white lowercase">
      {/* sidebar */}
      <aside className="w-64 border-r border-slate-100 flex flex-col p-6 space-y-8">
        <div className="px-4">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">cobel trainer</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2.7 engine link</p>
        </div>

        <nav className="flex-1 space-y-2">
          {nav_items.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
            >
              <item.icon size={18} />
              <span className="font-bold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={18} />
          <span>sign out</span>
        </button>
      </aside>

      {/* main content */}
      <main className="flex-1 bg-slate-50/50">
        {children}
      </main>
    </div>
  );
}