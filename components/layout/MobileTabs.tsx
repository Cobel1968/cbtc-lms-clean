'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileTabs() {
    const pathname = usePathname();
    
    const tabs = [
        { name: 'Home', href: '/student-home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Scan', href: '/upload-assessment', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
        { name: 'Modules', href: '/modules', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 pb-safe">
            {tabs.map((tab) => (
                <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1">
                    <svg 
                        className={`w-6 h-6 ${pathname === tab.href ? 'text-blue-600' : 'text-slate-400'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                    </svg>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                        pathname === tab.href ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                        {tab.name}
                    </span>
                </Link>
            ))}
        </nav>
    );
}