import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { CartProvider } from "@/app/contexts/CartContext";
import Navbar from "@/components/layout/navbar";
import StateDebugger from "@/components/debug/statedebugger";

const inter = Inter({ subsets: ["latin"] });

// Metadata MUST be in a Server Component
export const metadata: Metadata = {
  title: "CBTC Training Center | Cobel AI Engine",
  description: "Vocational Training with Adaptive Learning Pedagogical Logic",
};

// We remove 'use client' and dynamic export to allow metadata to work
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">{children}</main>
              {/* Debugger will only render on client if it has 'use client' inside it */}
              <StateDebugger />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}