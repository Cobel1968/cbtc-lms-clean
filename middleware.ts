import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Critical: This refreshes the session cookie so the user doesn't get logged out mid-session
  const { data: { session } } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;

  // 1. Authentication check: redirect to signin if no session
  // Excluding the signin page itself to avoid infinite loops
  if (!session && path !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // 2. Role verification (Engine Logic)
  const role = session?.user?.user_metadata?.role; // 'admin', 'trainer', or 'student'

  // 3. RBAC Gatekeeping
  
  // Protect admin root (including your new /admin/diagnostic route)
  if (path.startsWith('/admin') && role !== 'admin') {
    // If not admin, send to trainer or student dashboard
    const redirectPath = role === 'trainer' ? '/trainer' : '/student';
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Protect trainer root
  if (path.startsWith('/trainer') && role === 'student') {
    return NextResponse.redirect(new URL('/student', req.url));
  }

  return res;
}

// THE FIX: Updated matcher to include authentication, root, and dynamic routes
// This ensures Supabase cookies are managed globally
export const config = {
  matcher: [
    '/admin/:path*', 
    '/trainer/:path*', 
    '/student/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};