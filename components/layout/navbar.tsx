'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // We still initialize the hooks, but we won't use their return values 
  // until the 'mounted' check passes below.
  const languageContext = useLanguage();
  const cartContext = useCart();

  // Sync mount state with the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  // HYDRATION SHIELD: If not mounted, render a non-interactive 
  // placeholder to satisfy the Next.js static export.
  if (!mounted) {
    return <div className="h-16 bg-white shadow-md w-full sticky top-0 z-50" />;
  }

  const { language: currentLang, setLanguage } = languageContext;
  const { cart } = cartContext; // Using 'cart' array to get count safely
  const cartItemCount = cart?.length || 0;

  const t = {
    nav: {
      home: currentLang === 'fr' ? 'accueil' : 'home',
      courses: currentLang === 'fr' ? 'cours' : 'courses',
      about: currentLang === 'fr' ? 'à propos' : 'about',
      contact: currentLang === 'fr' ? 'contact' : 'contact',
      login: currentLang === 'fr' ? 'connexion' : 'login',
      register: currentLang === 'fr' ? "s'inscrire" : 'sign up',
    },
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  };

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/courses', label: t.nav.courses },
    { href: '/diagnostic', label: currentLang === 'fr' ? 'Diagnostic IA' : 'AI Diagnostic' },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">COBELBTC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {currentLang === 'fr' ? 'EN' : 'FR'}
            </button>

            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.login}
            </Link>

            <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
              {t.nav.register}
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg ${isActive(link.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-gray-700">
            <ShoppingCart size={20} /> {currentLang === 'fr' ? 'Panier' : 'Cart'}
          </Link>
          <button onClick={toggleLanguage} className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg">
            {currentLang === 'fr' ? 'Switch to English' : 'Passer en Français'}
          </button>
        </div>
      )}
    </nav>
  );
}