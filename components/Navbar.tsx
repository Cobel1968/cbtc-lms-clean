import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image 
                src="/new-logo.png" 
                alt="CBTC Logo" 
                width={50} 
                height={50} 
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#00629B] tracking-tight">CBTC</span>
                <span className="text-[10px] uppercase tracking-widest text-[#E91E63] font-semibold">
                  Du Banc Au Travail
                </span>
              </div>
            </Link>
            
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link href="/admin-dashboard" className="border-transparent text-gray-500 hover:text-[#00629B] hover:border-[#00629B] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/upload-assessment" className="border-transparent text-gray-500 hover:text-[#00629B] hover:border-[#00629B] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Assessments
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-[#E91E63] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#c2185b] transition-all shadow-md hover:shadow-lg">
              Login
            </button>
            <div className="h-8 w-[2px] bg-gray-100 mx-2"></div>
            <span className="text-[12px] text-gray-400 font-medium italic">Bilingual Engine v1.2</span>
          </div>
        </div>
      </div>
    </nav>
  );
}