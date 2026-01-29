'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalNav() {
    const pathname = usePathname();
    
    const links = [
        { name: 'Training Modules', href: '/modules' },
        { name: 'Handwriting Bridge', href: '/upload-assessment' },
        { name: 'Trainer Oversight', href: '/admin-dashboard' },
        { name: 'Integrity Audit', href: '/debug-data' },
    ];

    return (
        <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                    <span className="font-bold text-slate-900 tracking-tight">COBEL AI ENGINE</span>
                </div>
                
                <div className="flex gap-6">
                    {links.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                pathname === link.href ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}