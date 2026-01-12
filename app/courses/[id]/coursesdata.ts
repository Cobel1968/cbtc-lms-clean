// lib/coursesdata.ts

export const coursesData = [
  {
    id: 'hospitality-01',
    name: { en: 'Vocational Hospitality', fr: 'Hôtellerie Professionnelle' },
    description: { 
      en: 'Professional communication for the tourism industry.', 
      fr: 'Communication professionnelle pour l\'industrie du tourisme.' 
    },
    price_xof: 150000,
    duration_weeks: 12,
    level: { label: { en: 'Beginner', fr: 'Débutant' } },
    category: { label: { en: 'Service', fr: 'Service' } },
    curriculum: [
      { 
        title: { en: 'Guest Relations', fr: 'Relations Clients' },
        description: { en: 'Handling check-ins and check-outs.', fr: 'Gestion des arrivées et départs.' }
      }
    ]
  },
  // Add your other modules here...
];

// Helper functions for the engine
export const getCoursesByCategory = (category: string) => 
  coursesData.filter(c => c.category.label.en.toLowerCase() === category.toLowerCase());

export const getCoursesByLevel = (level: string) => 
  coursesData.filter(c => c.level.label.en.toLowerCase() === level.toLowerCase());

export const sortCourses = (courses: any[], option: string) => {
  if (option === 'popularity') return [...courses].sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0));
  return courses;
};