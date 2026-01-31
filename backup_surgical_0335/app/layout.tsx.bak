'use client'; // Required to use usePathname
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation'; // Added to detect current route

import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { CartProvider } from "@/app/contexts/CartContext";
import CobelHeader from '@/components/CobelHeader'; 
import StateDebugger from "@/components/debug/StateDebugger";

const inter = Inter({ subsets: ["latin"] });

// Note: Metadata must be in a separate Server Component if you use 'use client' here.
// For now, we focus on the Layout logic.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define routes where the Main Header should be hidden to reduce friction
  const isAuthPage = pathname === '/' || 
                     pathname === '/login' || 
                     pathname === '/forgot-password' || 
                     pathname === '/reset-password';

  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              {/* Only show Header if NOT on an Auth Page */}
              {!isAuthPage && <CobelHeader />} 
              
              <main className="flex-grow flex flex-col">
                {children}
              </main>
              
              {/* Debugger visibility can be toggled similarly if needed */}
              <StateDebugger />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}