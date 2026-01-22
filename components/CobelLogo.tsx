import Image from 'next/image';
import Link from 'next/link';

export default function CobelLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 hover:opacity-90 transition-opacity ${className}`}>
      {/* Container for your existing logo file */}
      <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
        <Image 
          src="/logo.png" // Ensure your file is in /public/logo.png
          alt="Cobel Business Training Center"
          width={40} 
          height={40}
          className="object-contain p-1"
          priority
        />
      </div>

      {/* Corporate Typography */}
      <div className="flex flex-col leading-none">
        <span className="font-black text-xl tracking-tighter uppercase italic text-slate-900">
          cobel<span className="text-indigo-600">btc</span>
        </span>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-0.5">
          vocational lms
        </span>
      </div>
    </Link>
  );
}