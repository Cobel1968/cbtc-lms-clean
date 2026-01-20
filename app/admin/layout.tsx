'use client';

import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { CartProvider } from "@/app/contexts/CartContext";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// icons are third-party components, so PascalCase is required here
import { 
  LayoutDashboard, 
  Users, 
  FileSearch, 
  LogOut, 
  ShieldCheck, 
  UserCheck,
  Activity,
  BookOpen
} from 'lucide-react';

// rectification: changed AdminLayout to admin_layout to match lowercase file system
export default function admin_layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // rectification: updated array to include 'course map' and ensure lowercase labels/hrefs
  const nav_items = [
    { label: 'overview', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'course map', href: '/admin/course', icon: <BookOpen size={18} /> },
    { label: 'trainer config', href: '/admin/trainer', icon: <UserCheck size={18} /> },
    { label: 'students', href: '/admin/students', icon: <Users size={18} /> },
    { label: 'handwriting bridge', href: '/admin/assessments', icon: <FileSearch size={18} /> },
    { label: 'system audit', href: '/admin/audit', icon: <Activity size={18} /> },
  ];

  return (
    <LanguageProvider>
      <CartProvider>
        {/* added 'lowercase' class to the parent to ensure visual consistency */}
        <div className="flex min-h-screen bg-[#f8fafc] lowercase">
          
          <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full border-r border-slate-800 z-50">
            <div className="p-8">
              {/* using 'uppercase' class for styling only, keeping the text source lowercase */}
              <h2 className="text-xl font-black tracking-tighter italic uppercase text-indigo-400">
                cobel admin
              </h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                pedagogical logic v2.7
              </p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {nav_items.map((item) => {
                const is_active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                      is_active 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tight">
                  vercel build safe
                </span>
              </div>
              <button className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 transition-colors w-full text-xs font-bold uppercase">
                <LogOut size={16} />
                <span>logout</span>
              </button>
            </div>
          </aside>

          <main className="flex-1 ml-64 p-6 bg-slate-50">
            <section className="bg-white min-h-[calc(100vh-3rem)] rounded-[32px] shadow-sm border border-slate-200/50 overflow-hidden">
              {children}
            </section>
          </main>

        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
