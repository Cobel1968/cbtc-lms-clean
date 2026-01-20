'use client';

// Import matches your lowercase file: languagecontext.tsx
import { useLanguage } from '@/app/contexts/LanguageContext'; 
import { Award, Users, BookOpen, Target, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'fr' ? 'Ãƒâ‚¬ propos de nous' : 'About Us',
    subtitle: language === 'fr' 
      ? 'Votre partenaire de confiance pour la formation professionnelle'
      : 'Your trusted partner for professional training',
    mission: {
      title: language === 'fr' ? 'Notre Mission' : 'Our Mission',
      description: language === 'fr'
        ? "Offrir des formations de qualitÃƒÂ© supÃƒÂ©rieure qui transforment les carriÃƒÂ¨res et dÃƒÂ©veloppent les compÃƒÂ©tences professionnelles en CÃƒÂ´te d'Ivoire et en Afrique."
        : "Provide superior quality training that transforms careers and develops professional skills in CÃƒÂ´te d'Ivoire and Africa.",
    },
    vision: {
      title: language === 'fr' ? 'Notre Vision' : 'Our Vision',
      description: language === 'fr'
        ? "Devenir la rÃƒÂ©fÃƒÂ©rence en matiÃƒÂ¨re de formation professionnelle en ligne en Afrique de l'Ouest, en offrant des programmes innovants et accessibles."
        : 'Become the reference for online professional training in West Africa, offering innovative and accessible programs.',
    },
    values: {
      title: language === 'fr' ? 'Nos Valeurs' : 'Our Values',
      items: language === 'fr' 
        ? ['Excellence', 'Innovation', 'AccessibilitÃƒÂ©', 'IntÃƒÂ©gritÃƒÂ©', 'Engagement']
        : ['Excellence', 'Innovation', 'Accessibility', 'Integrity', 'Commitment'],
    },
    stats: {
      students: language === 'fr' ? 'Ãƒâ€°tudiants' : 'Students',
      courses: language === 'fr' ? 'Cours' : 'Courses',
      instructors: language === 'fr' ? 'Instructeurs' : 'Instructors',
      satisfaction: language === 'fr' ? 'Satisfaction' : 'Satisfaction',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 tracking-tighter uppercase">{t.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 text-center">
            <Users className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-3xl font-black text-slate-900 mb-2">500+</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t.stats.students}</p>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 text-center">
            <BookOpen className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-3xl font-black text-slate-900 mb-2">12+</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t.stats.courses}</p>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 text-center">
            <Award className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-3xl font-black text-slate-900 mb-2">15+</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t.stats.instructors}</p>
          </div>
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 text-center">
            <Target className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-3xl font-black text-slate-900 mb-2">98%</h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t.stats.satisfaction}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-[32px] border border-slate-100 p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <Target className="text-blue-600" size={32} />
              {t.mission.title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t.mission.description}</p>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-100 p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <Award className="text-blue-600" size={32} />
              {t.vision.title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t.vision.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tight">
            <CheckCircle className="text-blue-600" size={32} />
            {t.values.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.values.items.map((value, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:border-blue-200 transition-colors">
                <CheckCircle className="mx-auto text-blue-600 mb-3" size={24} />
                <p className="font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}