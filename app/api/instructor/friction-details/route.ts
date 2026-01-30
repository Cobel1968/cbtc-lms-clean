import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId')
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase
    .from('evidence_logs')
    .select('evidence_data, created_at')
    .eq('student_id', studentId)
    .eq('action_type', 'FRICTION_DETECTED')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return NextResponse.json(data || { error: 'No friction logs found' })
}
