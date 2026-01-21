import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  // FIX: Explicitly pass URL and KEY to ensure the Vercel Edge Runtime 
  // can see them. This prevents the 500 Middleware Invocation Error.
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  // Refresh session cookie
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Authentication check
  // Added bypass for /login, /register, and public assets
  const isAuthPage = path === '/login' || path === '/register' || path === '/auth/signin';
  const isPublicAsset = path.startsWith('/_next') || path.includes('/favicon.ico');

  if (!session && !isAuthPage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. Role-Based Access Control (RBAC) Gatekeeping
  const role = session?.user?.user_metadata?.role; // 'admin', 'trainer', or 'student'

  // Admin Protection (including Diagnostic and Ingestion modules)
  if (path.startsWith('/admin') && role !== 'admin') {
    const redirectPath = role === 'trainer' ? '/trainer' : '/student';
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Trainer Protection (Protecting Feature 4: Bilingual Technical Mapping)
  if (path.startsWith('/trainer') && role === 'student') {
    return NextResponse.redirect(new URL('/student', req.url));
  }

  return res;
}

/**
 * OPTIMIZED MATCHER
 * Strictly excludes static assets and icons to save on Vercel Edge compute usage
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};