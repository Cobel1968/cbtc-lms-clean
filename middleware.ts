import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protect Instructor Routes
  if (req.nextUrl.pathname.startsWith('/instructor')) {
    if (!session) return NextResponse.redirect(new URL('/login', req.url))
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'instructor' && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}
