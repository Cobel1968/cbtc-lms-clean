import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'; // Must match 'NavBar' exactly

import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { CartProvider } from "@/app/contexts/CartContext";
import CobelHeader from '@/components/CobelHeader'; // Using the Logo-fixed Header
import StateDebugger from "@/components/debug/statedebugger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CBTC Training Center | Cobel AI Engine",
  description: "Vocational Training with Adaptive Learning Pedagogical Logic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            {/* Removed 'lowercase' to preserve technical acronym integrity */}
            <div className="min-h-screen flex flex-col bg-gray-50">
              <CobelHeader /> 
              <main className="flex-grow">{children}</main>
              {/* The debugger remains active for our AI Engine testing */}
              <StateDebugger />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}