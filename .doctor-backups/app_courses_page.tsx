'use client';
export const dynamic = 'force-dynamic';
import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Star, ChevronRight, Zap, GraduationCap , AlertCircle} from 'lucide-react';
import { coursesData, getCoursesByCategory, getCoursesByLevel, sortCourses } from '@/lib/coursesData';
import type { CourseCategory, CourseLevel, SortOption } from '@/lib/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import BilingualText from '@/components/BilingualText';
import Link from 'next/link';

export default function CoursesPage() {
  const {        language        } = useLanguage() || { language: 'en', t: (k) => k };
  const t = translations[language];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Hardcoded references to the files you just uploaded to FastComet
  const quickAccessModules = [
    {
      id: 'voc-hospitality',
      name: { en: 'Hospitality Communication', fr: 'Communication Hôtellerie' },
      path: '/courses/Vocational/Hospitality_Communication_Course.html',
      type: 'ESP',
      level: 'IELTS 4.5+'
    },
    {
      id: 'voc-survival',
      name: { en: 'Survival English (Trade)', fr: 'Anglais de Survie (Commerce)' },
      path: '/courses/Vocational/Survival_English_Trade_Travel.html',
      type: 'Survival',
      level: 'A1/A2'
    },
    {
      id: 'gram-a1',
      name: { en: 'Maintenance Budget (1A)', fr: 'Budget Maintenance (1A)' },
      path: '/course/grammar/InteractivecourseA1.html',
      type: 'Interactive',
      level: 'A1'
    }
  ];

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = getCoursesByCategory(selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = getCoursesByLevel(selectedLevel);
    }

    return sortCourses(filtered, sortBy);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'fr' ? 'Cobel BTC : Formations' : 'Cobel BTC: Training'}
          </h1>
          <p className="text-xl text-blue-100">
            {language === 'fr' 
              ? 'Logiciel de pédagogie pour la formation professionnelle bilingue'
              : 'Pedagogical logic for bilingual vocational training'}
          </p>
        </div>
      </section>

      {/* Quick Access Section for your newly uploaded HTML files */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickAccessModules.map((mod) => (
            <a 
              key={mod.id} 
              href={mod.path} 
              target="_blank" 
              className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:scale-105 transition-transform flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">{mod.type}</span>
                <h4 className="font-bold text-gray-800">{mod.name[language]}</h4>
                <p className="text-xs text-gray-500">{mod.level}</p>
              </div>
              <Zap className="text-yellow-500" size={24} />
            </a>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm border-b mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher un cours...' : 'Search courses...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CourseCategory | 'all')}
            >
              <option value="all">{language === 'fr' ? 'Toutes catégories' : 'All categories'}</option>
              <option value="tech">{language === 'fr' ? 'Technologie' : 'Technology'}</option>
              <option value="language">{language === 'fr' ? 'Langues' : 'Languages'}</option>
              <option value="business">{language === 'fr' ? 'Business' : 'Business'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | 'all')}
            >
              <option value="all">{language === 'fr' ? 'Tous niveaux' : 'All levels'}</option>
              <option value="beginner">{language === 'fr' ? 'Débutant' : 'Beginner'}</option>
              <option value="intermediate">{language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
              <option value="advanced">{language === 'fr' ? 'Avancé' : 'Advanced'}</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popularity">{language === 'fr' ? 'Plus populaires' : 'Most popular'}</option>
              <option value="rating">{language === 'fr' ? 'Mieux notés' : 'Highest rated'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="text-blue-600" />
            {language === 'fr' ? 'Curriculum Complet' : 'Full Curriculum'}
          </h2>
          <p className="text-gray-600 italic">
            {filteredAndSortedCourses.length} {language === 'fr' ? 'modules trouvés' : 'modules found'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <Link 
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group border border-gray-100"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="text-white" size={64} opacity={0.3} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <bilingualtext text={course.category.label} />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium uppercase">
                    <bilingualtext text={course.level.label} />
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration_weeks} {language === 'fr' ? 'semaines' : 'weeks'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  <bilingualtext text={course.name} />
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  <bilingualtext text={course.description} />
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 font-semibold text-gray-800">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      {course.rating || 4.5}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {course.enrollmentCount || 0}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      {course.price_xof.toLocaleString()} XOF
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}