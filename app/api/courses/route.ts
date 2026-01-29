import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Retrieves all published vocational tracks
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const showAll = searchParams.get('all') === 'true';

  let query = supabase.from('courses').select('*');
  
  // If ?all=true is not present, only show published pillars
  if (!showAll) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Handles both UPDATING existing tracks and INSERTING new ones
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const { title, is_published } = body;

    if (id) {
      // --- UPDATE MODE ---
      // Used for: Rebranding/Publishing existing IDs (like Oil/Hospitality)
      const { data, error } = await supabase
        .from('courses')
        .update({ 
          title: title, 
          is_published: is_published ?? true 
        })
        .eq('id', id)
        .select();

      if (error) throw error;
      return NextResponse.json({ success: true, mode: 'update', data });

    } else {
      // --- INSERT MODE ---
      // Used for: Creating new pillars (Supply Chain, Digital Strategy)
      const { data, error } = await supabase
        .from('courses')
        .insert([{ 
          title: title, 
          is_published: is_published ?? true 
        }])
        .select();

      if (error) throw error;
      return NextResponse.json({ success: true, mode: 'insert', data });
    }
  } catch (err: any) {
    // Basic Rollback Logic: Log the failure to prevent ghost data
    console.error("Critical Engine Error during Course POST:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}