/**
 * Course data exports
 * This file provides course information from Supabase
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
export const coursesData: Course[] = [];
export default coursesData;
