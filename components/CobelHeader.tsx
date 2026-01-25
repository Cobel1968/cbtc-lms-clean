'use client';
import Link from 'next/link';

export default function CobelHeader() {
  return (
    <header className="bg-white border-b shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/images/logo1.png" 
            alt="Cobel BTC" 
            className="h-10 w-auto object-contain"
            onError={(e) => {
              // Rollback to text if the file move failed or image is deleted
              e.currentTarget.style.display = 'none';
              const textFallback = document.createElement('span');
              textFallback.className = 'text-xl font-bold text-blue-600 tracking-tight';
              textFallback.innerText = 'COBEL BTC';
              e.currentTarget.parentNode.appendChild(textFallback);
            }}
          />
        </Link>
        <nav className="flex gap-6">
          <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Training Modules
          </Link>
          <Link href="/diagnostic" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            AI Diagnostic
          </Link>
        </nav>
      </div>
    </header>
  );
}
