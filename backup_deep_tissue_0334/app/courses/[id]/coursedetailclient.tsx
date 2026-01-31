'use client';
export const dynamic = 'force-dynamic';
// aliasing react hooks to strict snake_case
import { useState as use_state } from 'react';
import { 
  BookOpen as icon_book, 
  Clock as icon_clock, 
  Users as icon_users, 
  Star as icon_star, 
  CheckCircle as icon_check, 
  ArrowLeft as icon_arrow,
  Zap as icon_zap
, AlertCircle} from 'lucide-react';

// FIXED: Lowercase path for Vercel/Linux compliance
import { useLanguage as use_language } from '@/app/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import bilingualtext from '../../components/bilingualtext'; 
import Link from 'next/link';

// normalized interface for the cobel engine
interface course_detail_props {
  course: any; 
}

export default function coursedetailclient({ course }: course_detail_props) {
  const { language } = use_language();
  const t = translations[language];
  const [is_enrolling, set_is_enrolling] = use_state(false);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* normalized navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/courses" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <icon_arrow size={20} />
            <span>{language === 'fr' ? 'Retour aux cours' : 'Back to courses'}</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left column: pedagogical logic & content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <bilingualtext text={course.category.label} />
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {/* Logic: Handling bilingual level labels */}
                  {course.level.label[language]}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                <bilingualtext text={course.name} />
              </h1>

              <div className="text-xl text-gray-600 leading-relaxed">
                <bilingualtext text={course.description} />
              </div>
            </div>

            {/* phase 2: curriculum structure */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <icon_book className="text-blue-600" />
                {language === 'fr' ? 'Programme de formation' : 'Course curriculum'}
              </h2>
              <div className="space-y-4">
                {course.curriculum?.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900"><bilingualtext text={item.title} /></h4>
                      <p className="text-gray-600 text-sm"><bilingualtext text={item.description} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right column: enrollment & financial logic (150,000 XOF) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-8">
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {course.price_xof?.toLocaleString()} XOF
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <icon_clock size={18} />
                    <span>{language === 'fr' ? 'Durée' : 'Duration'}</span>
                  </div>
                  <span className="font-bold">{course.duration_weeks} {language === 'fr' ? 'semaines' : 'weeks'}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <icon_users size={18} />
                    <span>{language === 'fr' ? 'Inscrits' : 'Enrolled'}</span>
                  </div>
                  <span className="font-bold">{course.enrollmentCount || 0}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-2">
                    <icon_star size={18} className="text-yellow-400" />
                    <span>Rating</span>
                  </div>
                  <span className="font-bold">{course.rating || 4.5}</span>
                </div>
              </div>

              <button 
                onClick={() => set_is_enrolling(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                <icon_zap size={20} />
                {language === 'fr' ? "S'inscrire maintenant" : 'Enroll now'}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-tighter">
                {language === 'fr' ? 'Paiement sécurisé via Cobel BTC' : 'Secure payment via Cobel BTC'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
