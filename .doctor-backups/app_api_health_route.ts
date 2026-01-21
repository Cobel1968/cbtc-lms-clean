import { NextResponse } from 'next/server';
import { createServerClient }  from '@/lib/supabaseClient';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // Test database connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed',
          error: error.message 
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Supabase connection successful',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}