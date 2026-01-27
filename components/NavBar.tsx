'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function NavBar() {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12">
            <Image
              src="/logo.png"
              alt="Cobel BTC Logo"
              fill
              sizes="48px"
              className="object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black leading-none tracking-tighter text-slate-900 uppercase italic">
              Cobel BTC
            </span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {language === 'fr' ? 'Centre de Formation' : 'Training Center'}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600">
          <Link href="/courses" className="hover:text-blue-600 transition-colors">
            {language === 'fr' ? 'Formations' : 'Courses'}
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            {language === 'fr' ? 'À Propos' : 'About'}
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          
          {/* CART ICON */}
          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={20} />
          </Link>

          <Link href="/dashboard" className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95">
            {language === 'fr' ? 'Mon Espace' : 'Dashboard'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
