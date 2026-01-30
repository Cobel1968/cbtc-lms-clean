import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabaseDB'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Use our build-safe local provider
  const supabase = createMiddlewareClient();
  
  const { data: { session } } = await supabase.auth.getSession()

  const trainerRoles = ['instructor', 'trainer', 'lead_trainer', 'admin', 'super_admin'];

  // Protect Instructor/Trainer Routes
  if (req.nextUrl.pathname.startsWith('/instructor')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    
    // Fetch profile from 'users' table (consistent with our Registration logic)
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || !trainerRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}

// Ensure middleware only runs on relevant paths to save resources
export const config = {
  matcher: ['/instructor/:path*', '/admin/:path*', '/dashboard/:path*'],
}