'use client';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import fs from 'fs';
import path from 'path';

/**
 * Cobel AI Engine: Course Discovery API
 * Handles database merging with physical Adaptive HTML Injection files
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const selectedCategory = searchParams.get('category');

    const supabase = createServerClient();
    const { data: db_courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true);
    
    if (error) {
      console.error('cobel_engine: database_fetch_error:', error);
    }

    // PATH VERIFICATION: strictly lowercase directory names
    const courses_directory = path.join(process.cwd(), 'public/courses');
    
    const get_physical_files = (sub_dir: string) => {
      // Ensure sub_dir is forced to lowercase to match PowerShell migration
      const target_dir = sub_dir.toLowerCase();
      const full_path = path.join(courses_directory, target_dir);
      
      if (!fs.existsSync(full_path)) return [];
      
      return fs.readdirSync(full_path)
        .filter(file => file.endsWith('.html'))
        .map(file => {
          // FEATURE: Lowercase normalization for mapping
          const system_name = file.toLowerCase().replace(/_/g, ' ').replace('.html', '');
          const local_price = target_dir === 'vocational' ? 35000 : 15000;

          return {
            id: `fs-${target_dir}-${file.toLowerCase()}`, 
            slug: file.toLowerCase().replace('.html', ''),
            name_en: system_name,
            name_fr: system_name, 
            file_path: `/courses/${target_dir}/${file.toLowerCase()}`, 
            category: target_dir, // 'vocational' or 'grammar'
            level: 'Beginner', // Default level for auto-detected files
            duration_weeks: 4,
            is_auto_detected: true,
            last_updated: fs.statSync(path.join(full_path, file)).mtime,
            price: local_price,
            currency: 'XOF',
            is_published: true,
            is_locked: true,
            payment_gateways: ['orange money', 'mtn momo', 'moov', 'wave']
          };
        });
    };

    const grammar_files = get_physical_files('grammar');
    const vocational_files = get_physical_files('vocational');

    // Merge database courses with physical file detection
    const merged_courses = [
      ...(db_courses || []),
      ...grammar_files,
      ...vocational_files
    ];

    // Deduplicate by file_path or slug
    const unique_courses = Array.from(
      new Map(merged_courses.map(item => [item.file_path?.toLowerCase() || item.slug, item])).values()
    );

    // ✅ FIX: Null-Safe Filtering for Build Stability
    const filtered = unique_courses.filter((course: any) => {
      if (!selectedCategory || selectedCategory.toLowerCase() === 'all') return true;
      
      // Force both to lowercase and provide fallbacks to prevent .toLowerCase() on null
      const courseCat = (course?.category || 'general').toLowerCase();
      const targetCat = (selectedCategory || 'all').toLowerCase();
      
      return courseCat === targetCat;
    });

    return NextResponse.json({ 
      data: filtered,
      market: 'ci',
      currency: 'xof',
      count: filtered.length
    });

  } catch (error: any) {
    console.error('cobel_engine: lowercase_audit_error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during course scan' }, 
      { status: 500 }
    );
  }
}