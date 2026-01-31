export default function Logo({ className = "h-8", light = false }: { className?: string, light?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The "Bridge" Symbol */}
        <path d="M20 70L40 30H60L80 70" stroke={light ? "white" : "black"} strokeWidth="12" strokeLinecap="round"/>
        <circle cx="50" cy="30" r="8" fill="#2563eb"/> {/* The AI Node */}
        <path d="M30 50H70" stroke="#10b981" strokeWidth="4" strokeDasharray="4 4"/> {/* The Analog-Digital Connection */}
      </svg>
      <span className={`font-black tracking-tighter uppercase text-xl ${light ? "text-white" : "text-black"}`}>
        CBTC<span className="text-blue-600">AI</span>
      </span>
    </div>
  );
}