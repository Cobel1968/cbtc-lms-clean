'use client';

import React, { useState } from 'react';
import { Globe, BookOpen, Clock } from 'lucide-react';

interface CourseProps {
  course: {
    id: string;
    title_en: string;
    title_fr: string;
    category: string;
  };
}

export default function BilingualCourseCard({ course }: CourseProps) {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded">
            {course.category}
          </span>
          <button 
            onClick={() => setLanguage(l => l === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {language === 'en' ? 'EN' : 'FR'}
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {language === 'en' ? course.title_en : course.title_fr}
        </h2>

        <div className="flex items-center gap-4 mt-6 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>Modules: 12</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>24h Total</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-4 bg-gray-50 border-t">
        <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800">
          {language === 'en' ? 'Start Training' : 'Démarrer la formation'}
        </button>
      </div>
    </div>
  );
}
