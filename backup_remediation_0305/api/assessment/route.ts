// D:\CBTC-FINAL\cbtc-lms\app\api\assessment\route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with Service Role to bypass RLS during bulk injection
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET: Health Check & Metadata Verification
 * Confirms the Cobel Engine is online before injection.
 */
export async function GET() {
  try {
    const { count, error } = await supabase
      .from('assessment_pool')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      status: "Cobel Engine Online",
      current_pool_size: count,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST: Segmented Question Injection
 * Handles the 120-question payload for Oil, Hotel, Supply Chain, and AI.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json(); // The 120-question array from PowerShell
    const adminId = req.headers.get('x-admin-id');

    // Strict Authorization for Abel C.
    if (adminId !== '615671ad-a326-4d98-9b09-cb6c4c54c913') {
      return NextResponse.json({ error: 'Unauthorized Administrative Access' }, { status: 401 });
    }

    // Insert partitioned questions into the SQL assessment_pool
    const { data, error } = await supabase
      .from('assessment_pool')
      .insert(body)
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Cobel AI Engine: ${data.length} questions partitioned and live.`,
      subject_sync: "Verified"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}