import { NextResponse } from 'next/server';
import * as db from '@/lib/supabaseDB';
import { createClient } from '@supabase/supabase-js';

// strictly lowercase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { course_id, user_id, time_spent, learning_contract_id } = body;

    // 1. validation: check for core identifiers
    if (!course_id || !user_id) {
      return NextResponse.json(
        { error: 'course_id et user_id sont requis' }, 
        { status: 400 }
      );
    }

    // 2. FEATURE 3: Temporal Pulse Logic
    // If 'time_spent' is provided, we update the student's vocational timeframe
    if (time_spent !== undefined) {
      const { data: existing } = await supabase
        .from('enrollments')
        .select('time_spent_minutes, progress_percentage')
        .eq('course_id', course_id)
        .eq('student_id', user_id)
        .single();

      const new_total_minutes = (existing?.time_spent_minutes || 0) + time_spent;
      
      // logic: update progress based on time (e.g., 60 mins = 10% progress increment)
      const calculated_progress = Math.min((existing?.progress_percentage || 0) + (time_spent / 6), 100);

      const { data: updated, error: pulse_error } = await supabase
        .from('enrollments')
        .upsert({
          student_id: user_id,
          course_id: course_id,
          time_spent_minutes: new_total_minutes,
          progress_percentage: calculated_progress,
          last_accessed: new Date().toISOString(),
          status: 'active'
        }, { onConflict: 'student_id, course_id' });

      if (pulse_error) throw pulse_error;

      return NextResponse.json({ 
        success: true, 
        message: 'temporal_pulse_recorded',
        total_minutes: new_total_minutes 
      });
    }

    // 3. INITIAL ENROLLMENT: Legacy creation logic
    const { data: enrollment, error } = await db.createEnrollment({
      user_id,
      course_id,
      learning_contract_id: learning_contract_id || null,
      enrollment_date: new Date().toISOString(),
      progress_percentage: 0,
      status: 'pending', // stays pending until first pulse
    });

    if (error || !enrollment) throw new Error('Erreur lors de l\'inscription');

    return NextResponse.json({ data: enrollment }, { status: 201 });

  } catch (error: any) {
    console.error('cobel_engine: enrollment_sync_error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' }, 
      { status: 500 }
    );
  }
}
