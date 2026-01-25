'use client';

export const dynamic = 'force-dynamic';
import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Star, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { coursesData, getCoursesByCategory, getCoursesByLevel, sortCourses } from '@/lib/coursesData';
import type { CourseCategory, CourseLevel, SortOption } from '@/lib/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import BilingualText from '@/components/BilingualText';
import Link from 'next/link';

/**
 * COBEL BTC - MAIN ENTRY POINT
 * Adaptive Learning Algorithm: Course Filtering & Discovery
 */
export default function Home() {
  const context = useLanguage();
  const language = context?.language || 'en';
  const t = translations[language] || translations['en'];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Logic: Filter and Sort with rollback/fallback safety
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = Array.isArray(coursesData) ? [...coursesData] : [];

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course?.name?.[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course?.description?.[language]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      const catFiltered = getCoursesByCategory(selectedCategory);
      filtered = Array.isArray(catFiltered) ? catFiltered : [];
    }

    if (selectedLevel !== 'all') {
      const levelFiltered = getCoursesByLevel(selectedLevel);
      filtered = Array.isArray(levelFiltered) ? levelFiltered : [];
    }

    return sortCourses(filtered, sortBy) || [];
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - The Pedagogical Logic Entrance */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-4 py-1 rounded-full border border-white/20">
              <Sparkles size={16} className="text-blue-200" />
              <span className="text-xs font-bold uppercase tracking-widest italic">Adaptive Engine v3.1</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              <BilingualText text={t?.hero?.title} />
            </h1>
            <p className="text-xl mb-8 text-blue-100 italic">
              <BilingualText text={t?.hero?.subtitle} />
            </p>
            <div className="flex gap-4">
              <Link 
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
              >
                <BilingualText text={t?.hero?.cta} />
              </Link>
              <Link 
                href="#courses"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <BilingualText text={t?.exploreCourses} />
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle background branding */}
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <BookOpen size={400} />
        </div>
      </section>

      {/* Filter Bar - Technical Mapping Interface */}
      <section className="bg-white shadow-sm border-b sticky top-0 z-50" id="courses">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher un cours...' : 'Search courses...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 lowercase"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 lowercase"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CourseCategory | 'all')}
            >
              <option value="all">{language === 'fr' ? 'toutes catégories' : 'all categories'}</option>
              <option value="tech">{language === 'fr' ? 'technologie' : 'technology'}</option>
              <option value="language">{language === 'fr' ? 'langues' : 'languages'}</option>
              <option value="business">{language === 'fr' ? 'business' : 'business'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 lowercase"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | 'all')}
            >
              <option value="all">{language === 'fr' ? 'tous niveaux' : 'all levels'}</option>
              <option value="beginner">{language === 'fr' ? 'débutant' : 'beginner'}</option>
              <option value="intermediate">{language === 'fr' ? 'intermédiaire' : 'intermediate'}</option>
              <option value="advanced">{language === 'fr' ? 'avancé' : 'advanced'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 lowercase"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popularity">{language === 'fr' ? 'plus populaires' : 'most popular'}</option>
              <option value="price-asc">{language === 'fr' ? 'prix croissant' : 'price: low to high'}</option>
              <option value="price-desc">{language === 'fr' ? 'prix décroissant' : 'price: high to low'}</option>
              <option value="duration">{language === 'fr' ? 'durée' : 'duration'}</option>
              <option value="rating">{language === 'fr' ? 'mieux notés' : 'highest rated'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Course Grid - Dynamic Result Ingestion */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
            {language === 'fr' ? 'Nos Formations' : 'Our Courses'}
          </h2>
          <p className="text-gray-600 font-medium italic lowercase">
            {filteredAndSortedCourses?.length || 0} {language === 'fr' ? 'formations disponibles' : 'courses available'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedCourses?.map((course) => (
            <Link 
              key={course?.id}
              href={`/courses/${course?.id}`}
              className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-slate-100"
            >
              <div className="relative h-48 bg-slate-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="text-indigo-500 group-hover:scale-110 transition-transform duration-700" size={64} opacity={0.2} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <BilingualText text={course?.category?.label || 'General'} />
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  <span className="px-2 py-1 bg-slate-50 rounded-lg">
                    <BilingualText text={course?.level?.label || 'Basic'} />
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course?.duration_weeks || 0} {language === 'fr' ? 'semaines' : 'weeks'}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                  <BilingualText text={course?.name} />
                </h3>

                <p className="text-slate-500 text-sm mb-6 line-clamp-2 lowercase italic">
                  <BilingualText text={course?.description} />
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-current" />
                      {course?.rating || 4.5}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course?.enrollmentCount || 0}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-indigo-600 italic">
                      {(course?.price_xof || 0).toLocaleString()} XOF
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center bg-slate-50 py-3 rounded-2xl text-slate-900 font-black uppercase text-[10px] tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {language === 'fr' ? 'Détails de la formation' : 'View curriculum details'}
                  <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}