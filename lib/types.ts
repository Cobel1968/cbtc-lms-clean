/**
 * COBEL BUSINESS TRAINING CENTER (LMS) - CORE TYPES
 * File: lib/types.ts (Lowercase path for Vercel/Linux compatibility)
 * Innovation: Computer-Implemented Pedagogical Logic
 */

/** * 1. UI & LOCALIZATION TYPES
 * Preserving PascalCase for Interface names
 */
export interface bilingualtext {
  fr: string;
  en: string;
}

/**
 * 2. FEATURE 4: ANALOG-TO-DIGITAL BRIDGE (OCR)
 * Defining the technical mapping for handwriting ingestion
 */
export interface TechnicalTermMapping {
  id: string;
  term_en: string;
  term_fr: string;
  vocational_sector: 'Mechanical' | 'Electrical' | 'Hospitality' | 'OilGas' | 'Business';
  difficulty_weight: number; 
}

export interface OCRAssessmentResult {
  raw_text_ingested: string;
  detected_terms: string[]; 
  confidence_score: number;
  bilingual_fluency_increment: number; 
  processed_at: string;
}

/**
 * 3. CORE PEDAGOGICAL ENTITIES
 */
export interface Course {
  id: string;
  name: bilingualtext;
  description: bilingualtext;
  category: {
    id: string;
    label: bilingualtext;
  };
  level: {
    id: string;
    label: bilingualtext;
  };
  duration_weeks: number;
  price_xof: number;
  objectives: bilingualtext[];
  prerequisites: bilingualtext[];
  curriculum: bilingualtext[];
  instructor_id?: string;
  rating?: number;
  reviewCount?: number;
  enrollmentCount?: number;
  
  // COBEL AI ENGINE LOGIC FLAGS
  requires_pre_test: boolean;       // Phase 1: Multi-Dimensional Diagnostic
  requires_post_test: boolean;      // Phase 3: Temporal Optimization Validation
  min_progress_delta: number;       // e.g., +20 points required
  certificate_enabled: boolean;     // Grants certificate upon success
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'super_admin';
  first_name?: string;
  last_name?: string;
  
  // COBEL AI ENGINE METRICS (Updated via Digital & Analog assessments)
  bilingual_technical_fluency: number; // Feature 4: Handwriting Bridge output
  curriculum_density: number;          // Learning saturation metric
  timeframe_prediction: string;        // Phase 2: Dynamic Path Mapping output
  
  created_at?: string;
}

/**
 * 4. ASSESSMENT & DIAGNOSTIC LOGIC
 */
export interface DiagnosticTest {
  id: string;
  course_id: string;
  title: bilingualtext;
  type: 'pre-test' | 'post-test'; 
  questions: any[];
  created_at?: string;
}

export interface DiagnosticResult {
  id: string;
  user_id: string;
  test_id: string;
  course_id: string;
  test_type: 'pre-test' | 'post-test';
  score: number;                        
  technical_fluency_score?: number;     
  ocr_metadata?: OCRAssessmentResult;   // Connection to the Handwriting Analysis Module
  answers: any[];
  completed_at?: string;
}

/**
 * 5. PROGRESS & CERTIFICATION
 */
export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'cancelled';
  enrolled_at?: string;
  
  // DYNAMIC PATH MAPPING DATA
  pre_test_score?: number;
  post_test_score?: number;
  progress_validated: boolean;         
  certificate_url?: string;            
}

export interface LearningContract {
  id: string;
  enrollment_id: string;
  objectives: bilingualtext[];
  status: 'pending' | 'active' | 'completed';
  created_at?: string;
}

// Global Filtering Types
export type CourseCategory = 'tech' | 'language' | 'business';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'duration';
