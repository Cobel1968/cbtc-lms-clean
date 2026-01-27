'use client';
import React from 'react';
import Link from 'next/link';
import { CobelLogo } from './CobelLogo';
import { Menu, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <CobelLogo className="h-8" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all">Courses</Link>
          <Link href="/trainer" className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all">Trainer</Link>
          <Link href="/profile" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
            <User size={14} /> Profile
          </Link>
        </div>
        <button className="md:hidden text-white"><Menu /></button>
      </div>
    </nav>
  );
}