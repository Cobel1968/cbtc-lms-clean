'use client';
export const dynamic = 'force-dynamic';
/**
 * Course data exports
 * Enhanced with Filtering and Sorting Logic for Cobel AI Engine
 */

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
}

// Placeholder for static courses if database is unreachable during build
export const coursesData: Course[] = [];

/**
 * Filter courses by Category
 * Fixed: Added null-safe checking to prevent .toLowerCase() errors
 */
export const getCoursesByCategory = (courses: Course[], category: string): Course[] => {
  if (!category || category === 'all') return courses;
  return courses.filter(course => 
    course?.category?.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Filter courses by Level (Beginner, Intermediate, Advanced)
 */
export const getCoursesByLevel = (courses: Course[], level: string): Course[] => {
  if (!level || level === 'all') return courses;
  return courses.filter(course => 
    course?.level?.toLowerCase() === level.toLowerCase()
  );
};

/**
 * Sort courses by specific criteria
 */
export const sortCourses = (courses: Course[], criteria: string): Course[] => {
  const sorted = [...courses];
  switch (criteria) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'duration':
      return sorted.sort((a, b) => a.duration_weeks - b.duration_weeks);
    case 'name':
      return sorted.sort((a, b) => (a.name_en || '').localeCompare(b.name_en || ''));
    default:
      return sorted;
  }
};

export default coursesData;