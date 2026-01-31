export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export interface Database {
  public: {
    Tables: {
      assessment_results: {
        Row: {
          id: string; course_id: string | null; ocr_text_raw: string | null;
          technical_terms_detected: Json | null; fluency_score: number | null;
          curriculum_density_update: number | null; created_at: string;
        }
      };
      courses: {
        Row: {
          id: string; name_en: string; name_fr: string; title_en: string | null;
          title_fr: string | null; category: string;
        }
      }
    }
  }
}

// Manually added for CBTC Business Logic alignment
export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  expected_completion_date: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar_url?: string;
}
