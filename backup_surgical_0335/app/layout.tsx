export const viewport = { width: 'device-width', initialScale: 1 };
import './globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import GlobalNav from '@/components/layout/GlobalNav';
import MobileTabs from '@/components/layout/MobileTabs';

export const metadata = {
  title: 'Cobel AI Engine',
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen text-slate-900 antialiased">
        <LanguageProvider>
          <GlobalNav />
          <main className="pb-20 md:pb-0">
            {children}
          </main>
          <MobileTabs />
        </LanguageProvider>
      </body>
    </html>
  );
}