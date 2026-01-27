'use client';
import React from 'react';
import Link from 'next/link';
import { CobelLogo } from './CobelLogo';

export default function CobelHeader() {
  return (
    <header className="bg-slate-950 border-b border-slate-900 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CobelLogo className="h-8" />
        </Link>
      </div>
    </header>
  );
}