import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      {/* Rest of your page content */}
    </main>
  );
}
