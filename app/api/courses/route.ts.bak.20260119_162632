import { NextResponse } from 'next/server';
import * as db from '@/lib/supabaseClient';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { data: db_courses, error } = await db.getCourses();
    
    if (error) {
      console.error('cobel_engine: database_fetch_error:', error);
    }

    // PATH VERIFICATION: strictly lowercase directory names
    const courses_directory = path.join(process.cwd(), 'public/courses');
    
    const get_physical_files = (sub_dir: string) => {
      // Ensure sub_dir is forced to lowercase to match your PowerShell migration
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
            id: `fs-${target_dir}-${file.toLowerCase()}`, // ID forced lowercase
            name_en: system_name,
            name_fr: system_name, 
            file_path: `/courses/${target_dir}/${file.toLowerCase()}`, // PATH forced lowercase
            type: target_dir, // 'vocational' or 'grammar'
            category: target_dir, 
            is_auto_detected: true,
            last_updated: fs.statSync(path.join(full_path, file)).mtime,
            price: local_price,
            currency: 'xof', // Currency normalized
            is_locked: true,
            payment_gateways: ['orange money', 'mtn momo', 'moov', 'wave']
          };
        });
    };

    const grammar_files = get_physical_files('grammar');
    const vocational_files = get_physical_files('vocational');

    const merged_courses = [
      ...(db_courses || []),
      ...grammar_files,
      ...vocational_files
    ];

    const unique_courses = Array.from(
      new Map(merged_courses.map(item => [item.file_path.toLowerCase(), item])).values()
    );

    return NextResponse.json({ 
      data: unique_courses,
      market: 'ci',
      currency: 'xof'
    });

  } catch (error: any) {
    console.error('cobel_engine: lowercase_audit_error:', error);
    return NextResponse.json(
      { error: 'erreur serveur lors du scan' }, 
      { status: 500 }
    );
  }
}