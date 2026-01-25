'use client';
export const dynamic = 'force-dynamic';

export interface Course {
  id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  category: string;
  level: string;
  duration_weeks: number;
  price: number;
  currency: string;
  language: string;
  is_published: boolean;
  requires_diagnostic: boolean;
  instructor_name: string;
  image_url?: string;
  thumbnail_url?: string;
  objectives_en?: string;
  objectives_fr?: string;
  prerequisites_en?: string;
  prerequisites_fr?: string;
  curriculum?: any;
  // Added compatibility fields for the UI
  name?: { en: string; fr: string };
  description?: { en: string; fr: string };
}

// Initializing as empty array to prevent .map errors
export const coursesData: Course[] = [];

/**
 * Filter courses by Category
 * Logic: Safe check for array existence before filtering
 */
export const getCoursesByCategory = (category: string): Course[] => {
  const courses = Array.isArray(coursesData) ? coursesData : [];
  if (!category || category === 'all') return courses;
  return courses.filter(course => 
    course?.category?.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Filter courses by Level
 */
export const getCoursesByLevel = (level: string): Course[] => {
  const courses = Array.isArray(coursesData) ? coursesData : [];
  if (!level || level === 'all') return courses;
  return courses.filter(course => 
    course?.level?.toLowerCase() === level.toLowerCase()
  );
};

/**
 * Sort courses by specific criteria
 * Enhanced with popularity and rating fallbacks
 */
export const sortCourses = (courses: Course[], criteria: string): Course[] => {
  if (!Array.isArray(courses)) return [];
  const sorted = [...courses];
  
  switch (criteria) {
    case 'price-asc':
    case 'price-low':
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'price-desc':
    case 'price-high':
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'duration':
      return sorted.sort((a, b) => (a.duration_weeks || 0) - (b.duration_weeks || 0));
    case 'name':
      return sorted.sort((a, b) => (a.name_en || '').localeCompare(b.name_en || ''));
    default:
      return sorted; // 'popularity' or 'rating' defaults to the current order
  }
};

export default coursesData;