// FILE: app/lib/translations.ts

export type Language = 'fr' | 'en';

export interface Translations {
  nav: {
    home: string;
    courses: string;
    about: string;
    contact: string;
    login: string;
    register: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  exploreCourses: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      courses: 'Cours',
      about: 'Ã€ propos',
      contact: 'Contact',
      login: 'Connexion',
      register: 'Inscription'
    },
    hero: {
      title: 'Transformez votre avenir avec CBTC',
      subtitle: "Des formations de qualité en technologie, langues et business en Côte d'Ivoire",
      cta: 'Commencer maintenant'
    },
    exploreCourses: 'Explorer les cours'
  },
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register'
    },
    hero: {
      title: 'Transform your future with CBTC',
      subtitle: 'Quality training in technology, languages and business in Côte d\'Ivoire',
      cta: 'Start now'
    },
    exploreCourses: 'Explore courses'
  }
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
