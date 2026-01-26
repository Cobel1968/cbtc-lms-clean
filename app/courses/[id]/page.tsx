'use client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Mapping the ID to the static folder found in your inventory
  const staticPath = \/courses/Vocational/\.html\;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <button 
          onClick={() => router.push('/student/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-black font-bold uppercase text-xs"
        >
          <ArrowLeft size={16} /> Main Menu
        </button>
        <h1 className="text-sm font-black text-slate-800 uppercase italic">Module: {id}</h1>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="flex-1 bg-white">
        <iframe 
          src={staticPath}
          className="w-full h-[calc(100vh-65px)] border-none"
          title="Cobel Vocational Content"
        />
      </div>
    </div>
  );
}
