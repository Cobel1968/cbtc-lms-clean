// Auto-generated Supabase Database Types
// Project: rvlcpygatguvxhuliand
// Generated: 2026-01-09 22:57

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          slug: string | null
          name_fr: string
          name_en: string
          description_fr: string | null
          description_en: string | null
          category: string | null
          price: number | null
          currency: string | null
          duration_weeks: number | null
          level: string | null
          language: string | null
          instructor_id: string | null
          instructor_name: string | null
          image_url: string | null
          thumbnail_url: string | null
          video_intro_url: string | null
          objectives_fr: string[] | null
          objectives_en: string[] | null
          prerequisites_fr: string[] | null
          prerequisites_en: string[] | null
          curriculum: Json | null
          is_published: boolean | null
          requires_diagnostic: boolean | null
          created_at: string | null
          updated_at: string | null
          published_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      diagnostic_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          score: number
          max_score: number
          percentage: number
          level_recommendation: string | null
          ai_analysis_fr: string | null
          ai_analysis_en: string | null
          suggested_duration_weeks: number | null
          completed_at: string | null
          created_at: string | null
          reading_score: number | null
          listening_score: number | null
          grammar_score: number | null
          vocabulary_score: number | null
          writing_score: number | null
          speaking_score: number | null
          ielts_band: number | null
          cefr_level: string | null
          answers: Json | null
          time_taken: number | null
          strengths: Json | null
          weaknesses: Json | null
          recommended_courses: Json | null
          technical_fluency_score: number | null
        }
        Insert: Omit<Database['public']['Tables']['diagnostic_results']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['diagnostic_results']['Insert']>
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: string | null
          progress_percentage: number | null
          enrollment_date: string | null
          learning_contract_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          avatar_url: string | null
          bio: string | null
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['user_roles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['user_roles']['Insert']>
      }
      payments: {
        Row: {
          id: string
          user_id: string
          enrollment_id: string | null
          amount: number
          currency: string
          status: string
          payment_method: string | null
          transaction_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      assignments: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          due_date: string | null
          max_score: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['assignments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['assignments']['Insert']>
      }
      submissions: {
        Row: {
          id: string
          assignment_id: string
          user_id: string
          content: string | null
          score: number | null
          feedback: string | null
          submitted_at: string | null
          graded_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['submissions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['submissions']['Insert']>
      }
      vocational_courses: {
        Row: {
          id: string
          name_fr: string
          name_en: string
          category: string | null
          level: string | null
          duration_weeks: number | null
          is_published: boolean | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['vocational_courses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['vocational_courses']['Insert']>
      }
    }
  }
}
