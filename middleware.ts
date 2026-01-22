import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * 1. RUNTIME CONFIGURATION
 * Using 'nodejs' provides better stability for the Cobel AI Engine
 * when dealing with cross-proxy session handling between Vercel and Supabase.
 */
export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. THE BYPASS LIST: Prevents "Too Many Redirects" (ERR_TOO_MANY_REDIRECTS)
  // These paths bypass the Supabase session check entirely.
  const isAuthPage = pathname.startsWith('/login') || 
                     pathname.startsWith('/register') || 
                     pathname.startsWith('/auth');
                     
  const isStaticAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/assets') || 
                        pathname.includes('favicon.ico') ||
                        /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname);

  // Immediate exit for public routes and assets
  if (isAuthPage || isStaticAsset) {
    return NextResponse.next();
  }

  // 3. INITIALIZE RESPONSE OBJECT
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // 4. SUPABASE SSR CLIENT
  // Initialized with optimized cookie handlers for Next.js 14/15/2026 standards
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { 
          return request.cookies.get(name)?.value; 
        },
        set(name: string, value: string, options: CookieOptions) {
          // Setting on both ensures the session is available in the current request
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  /**
   * 5. SECURE SESSION VALIDATION
   * Using getUser() is the core security measure for Feature 4: 
   * Analog-to-Digital Pedagogical Bridge. It prevents unauthorized
   * ingestion of technical technical terms.
   */
  const { data: { user } } = await supabase.auth.getUser();

  // 6. AUTH GUARD: Shielding the LMS
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    // Persist the destination so students return to their specific lesson after login
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * 7. ROLE-BASED ACCESS CONTROL (RBAC)
   * Protects the Bilingual Vocational Mapping and Automated Milestone Forecasting.
   */
  const role = user.user_metadata?.role;

  // Protect Admin dashboard
  if (pathname.startsWith('/admin') && role !== 'admin') {
    const fallback = role === 'trainer' ? '/trainer' : '/student';
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  // Protect Trainer dashboard (Handwriting Analysis Module access)
  if (pathname.startsWith('/trainer') && role === 'student') {
    return NextResponse.redirect(new URL('/student', request.url));
  }

  // 8. VERSION TAG & ROLLBACK STABILITY
  // Baseline: Jan 22, 2026 - Optimized for Vercel/Supabase/FastComet hybrid
  response.headers.set('x-cobel-engine-status', 'stable-2026-01-22');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};