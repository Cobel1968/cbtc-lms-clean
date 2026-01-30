export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Innovation: Temporal Optimization - Ensures real-time data for the friction dashboard

export async function GET() {
  // Use our unified server client utility
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('friction_logs')
    .select('term, friction_index, created_at')
    .order('friction_index', { ascending: false });

  if (error) {
    console.error("COBEL_FRICTION_FETCH_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
