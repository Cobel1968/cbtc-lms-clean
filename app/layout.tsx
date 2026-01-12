import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Path is lowercase (Vercel-safe), but Component must be PascalCase (React-standard)
import { languageprovider } from '@/app/contexts/LanguageContext';
import { CartProvider } from '@/app/contexts/CartContext';
import Navbar from "@/components/layout/navbar"; 
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
    <html lang="fr">
      <body className={inter.className}>
        {/* 2. Using PascalCase tags ensures React initializes the Context Provider correctly */}
        <languageprovider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              {/* The Global State Debugger for real-time verification in development */}
              <StateDebugger />
            </div>
          </CartProvider>
        </languageprovider>
      </body>
    </html>
  );
}