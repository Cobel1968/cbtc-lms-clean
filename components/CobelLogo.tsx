'use client';
import React from 'react';

export const CobelLogo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto fill-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The "C" Frame */}
        <path 
          d="M80 20C70 10 50 10 35 15C15 25 10 50 15 70C20 85 45 95 65 90C80 85 90 75 90 75" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        {/* The "Engine" Spark */}
        <path 
          d="M45 40L60 55L40 60L55 75" 
          stroke="#3b82f6" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <circle cx="50" cy="50" r="5" fill="#3b82f6" className="animate-pulse" />
      </svg>
      <span className="text-white font-black italic tracking-tighter text-xl uppercase">
        Cobel<span className="text-blue-500">BTC</span>
      </span>
    </div>
  );
};
