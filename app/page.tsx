'use client';
export const dynamic = 'force-dynamic';
import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Star, ChevronRight, AlertCircle } from 'lucide-react';
import { coursesData, getCoursesByCategory, getCoursesByLevel, sortCourses } from '@/lib/coursesData';
import type { CourseCategory, CourseLevel, SortOption } from '@/lib/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import BilingualText from './components/bilingualtext';
import Link from 'next/link';

export default function Home() {
  // Safeguard: Ensure language context doesn't crash if undefined
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              <BilingualText text={t?.hero?.title} />
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              <BilingualText text={t?.hero?.subtitle} />
            </p>
            <div className="flex gap-4">
              <Link 
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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
      </section>

      {/* Filter Bar */}
      <section className="bg-white shadow-sm border-b" id="courses">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher un cours...' : 'Search courses...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CourseCategory | 'all')}
            >
              <option value="all">{language === 'fr' ? 'Toutes catégories' : 'All categories'}</option>
              <option value="tech">{language === 'fr' ? 'Technologie' : 'Technology'}</option>
              <option value="language">{language === 'fr' ? 'Langues' : 'Languages'}</option>
              <option value="business">{language === 'fr' ? 'Business' : 'Business'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | 'all')}
            >
              <option value="all">{language === 'fr' ? 'Tous niveaux' : 'All levels'}</option>
              <option value="beginner">{language === 'fr' ? 'Débutant' : 'Beginner'}</option>
              <option value="intermediate">{language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
              <option value="advanced">{language === 'fr' ? 'Avancé' : 'Advanced'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popularity">{language === 'fr' ? 'Plus populaires' : 'Most popular'}</option>
              <option value="price-asc">{language === 'fr' ? 'Prix croissant' : 'Price: Low to High'}</option>
              <option value="price-desc">{language === 'fr' ? 'Prix décroissant' : 'Price: High to Low'}</option>
              <option value="duration">{language === 'fr' ? 'Durée' : 'Duration'}</option>
              <option value="rating">{language === 'fr' ? 'Mieux notés' : 'Highest rated'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'fr' ? 'Nos Formations' : 'Our Courses'}
          </h2>
          <p className="text-gray-600">
            {filteredAndSortedCourses?.length || 0} {language === 'fr' ? 'formations disponibles' : 'courses available'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCourses?.map((course) => (
            <Link 
              key={course?.id}
              href={`/courses/${course?.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="text-white" size={64} opacity={0.3} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    <BilingualText text={course?.category?.label || 'General'} />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    <BilingualText text={course?.level?.label || 'Basic'} />
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {course?.duration_weeks || 0} {language === 'fr' ? 'semaines' : 'weeks'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <BilingualText text={course?.name} />
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  <BilingualText text={course?.description} />
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      {course?.rating || 4.5}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {course?.enrollmentCount || 0}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {(course?.price_xof || 0).toLocaleString()} XOF
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  {language === 'fr' ? 'Voir détails' : 'View details'}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}