'use client';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  category: string;
  href: string;
  description: string;
}

export default function CourseCard({ title, category, href, description }: CourseCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all group border-b-4 border-b-indigo-600">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <BookOpen size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
          {category}
        </span>
      </div>
      <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight uppercase tracking-tighter">
        {title}
      </h3>
      <p className="text-sm text-slate-500 mb-6 line-clamp-2 italic">
        {description}
      </p>
      <Link 
        href={href} 
        target="_blank"
        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95"
      >
        Start Course <ArrowRight size={16} />
      </Link>
    </div>
  );
}
