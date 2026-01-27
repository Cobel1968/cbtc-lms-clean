'use client';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="bg-blue-600 py-20 px-6 text-center">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
          À PROPOS DE NOUS
        </h1>
        <p className="text-xl font-medium opacity-90">
          Votre partenaire de confiance pour la formation professionnelle.
        </p>
      </div>
      <div className="max-w-4xl mx-auto py-16 px-6 leading-relaxed text-slate-300">
        <p>Le Cobel Business Training Center (CBTC) résout le problème technique des lacunes de connaissances et du gaspillage de temps dans la formation professionnelle traditionnelle.</p>
      </div>
    </main>
  );
}