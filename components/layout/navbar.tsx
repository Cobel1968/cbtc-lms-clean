'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Languages } from 'lucide-react';

import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const languageContext = useLanguage();
  const cartContext = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-16 bg-white shadow-sm w-full sticky top-0 z-50" />;
  }

  const { language: currentLang, setLanguage } = languageContext;
  const { cart } = cartContext; 
  const cartItemCount = cart?.length || 0;

  const t = {
    nav: {
      home: currentLang === 'fr' ? 'Accueil' : 'Home',
      courses: currentLang === 'fr' ? 'Cours' : 'Courses',
      about: currentLang === 'fr' ? 'À Propos' : 'About',
      contact: currentLang === 'fr' ? 'Contact' : 'Contact',
      login: currentLang === 'fr' ? 'Connexion' : 'Login',
      register: currentLang === 'fr' ? "S'inscrire" : 'Sign Up',
      diagnostic: currentLang === 'fr' ? 'Diagnostic IA' : 'AI Diagnostic',
    },
  };

  const toggleLanguage = () => {
    setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/courses', label: t.nav.courses },
    { href: '/diagnostic', label: t.nav.diagnostic },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Updated to Cloud Storage to resolve Vercel build hang */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image 
                src="https://rvlcpygatguvxhuliand.supabase.co/storage/v1/object/public/assets/cobel-logo.png" 
                alt="COBELBTC Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority
                unoptimized
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              COBELBTC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 py-1 ${
                  isActive(link.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} strokeWidth={2.5} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Languages size={14} />
              {currentLang === 'fr' ? 'EN' : 'FR'}
            </button>

            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            <Link href="/login" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              {t.nav.login}
            </Link>

            <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95">
              {t.nav.register}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium ${
                isActive(link.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link?.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
