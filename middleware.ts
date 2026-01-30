import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  const trainerRoles = ['instructor', 'trainer', 'lead_trainer', 'admin', 'super_admin'];

  if (req.nextUrl.pathname.startsWith('/instructor')) {
    if (!session) return NextResponse.redirect(new URL('/login', req.url))
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!trainerRoles.includes(profile?.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}
