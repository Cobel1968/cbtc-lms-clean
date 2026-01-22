import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * 1. RUNTIME CONFIGURATION
 * Using 'nodejs' for stability with the Cobel AI Engine.
 */
export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. THE BYPASS LIST (Whitelist)
  // Public pages
  const isAuthPage = pathname.startsWith('/login') || 
                     pathname.startsWith('/register') || 
                     pathname.startsWith('/auth');

  // FEATURE 4 BYPASS: Prevents 500 Redirect errors for the Handwriting Engine
  const isPublicApi = pathname.startsWith('/api/analyzehandwriting');
                     
  // Assets & Static files
  const isStaticAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/assets') || 
                        pathname.includes('favicon.ico') ||
                        /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname);

  // Safeguard: Immediate exit if it's an asset or the public API
  if (isAuthPage || isStaticAsset || isPublicApi) {
    return NextResponse.next();
  }

  // 3. INITIALIZE RESPONSE
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // 4. SAFEGUARD: ENVIRONMENT VARIABLE CHECK
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("COBEL ENGINE ERROR: Missing Supabase Environment Variables");
    return response; // Fail safe - let request through or handle via app error boundaries
  }

  try {
    // 5. SUPABASE SSR CLIENT
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) { return request.cookies.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) {
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

    // 6. SECURE SESSION VALIDATION
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // 7. AUTH GUARD: Redirect to login if no session
    if (authError || !user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 8. ROLE-BASED ACCESS CONTROL (RBAC)
    const role = user.user_metadata?.role;

    // Admin Protection
    if (pathname.startsWith('/admin') && role !== 'admin') {
      const fallback = role === 'trainer' ? '/trainer' : '/student';
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    // Trainer Protection
    if (pathname.startsWith('/trainer') && role === 'student') {
      return NextResponse.redirect(new URL('/student', request.url));
    }

  } catch (error) {
    // 9. CRITICAL SAFEGUARD: Catch unexpected runtime crashes
    console.error("COBEL MIDDLEWARE CRITICAL FAILURE:", error);
    return response; 
  }

  // 10. VERSION TAG & STABILITY BASELINE
  response.headers.set('x-cobel-engine-status', 'stable-2026-01-22-v3-safeguarded');
  return response;
}

export const config = {
  // Using a broader matcher but handling exclusions inside the middleware logic
  // for more granular control over the Cobel Engine routes.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};