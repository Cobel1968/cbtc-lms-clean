import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ADVANCED BOT & PROBE TERMINATION (Stop the 307 Spam)
  // Instead of redirecting unknown bots to /login, we return a 404 immediately.
  const botPatterns = [
    /wp-/,                // WordPress paths
    /\.php$/,             // PHP scripts
    /xmlrpc/i,            // Remote procedures
    /actuator/i,          // Spring Boot probes
    /config/i,            // Config files
    /admin-console/i,     // Console probes
    /\.env$/,             // Environment files
    /\.git/               // Git directory probes
  ];

  const isBotProbe = botPatterns.some(pattern => pattern.test(pathname));

  if (isBotProbe) {
    // SILENT TERMINATION: Returning 404 stops the middleware and logs a 404, not a 307.
    return new NextResponse(null, { status: 404 });
  }

  // 2. UPDATED BYPASS LOGIC (The "Green Zone")
  const isPublicPage = 
    pathname === '/' || 
    pathname === '/diagnostic' ||
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/auth') ||
    pathname.startsWith('/pricing'); 

  const isPublicApi = pathname.startsWith('/api/analyze-handwriting');
                        
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/assets') || 
    pathname.includes('favicon.ico') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname);

  if (isPublicPage || isStaticAsset || isPublicApi) {
    return NextResponse.next();
  }

  // 3. STABLE SUPABASE INITIALIZATION
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return response;

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          get(name: string) { return request.cookies.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    // CRITICAL: Verify the user session
    const { data: { user } } = await supabase.auth.getUser();

    // 4. AUTH GUARD (Refined Redirect)
    if (!user) {
      // Only redirect to login for actual app paths to prevent random 307s
      const isAppPath = 
        pathname.startsWith('/dashboard') || 
        pathname.startsWith('/student') || 
        pathname.startsWith('/trainer') || 
        pathname.startsWith('/admin');

      if (isAppPath) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
      
      // If it's not a known app path and user is unauthenticated, return 404
      return new NextResponse(null, { status: 404 });
    }

    // 5. ROLE-BASED ACCESS CONTROL (Cobel Engine Pedagogical Roles)
    const role = user.user_metadata?.role;

    if (pathname.startsWith('/admin') && role !== 'admin') {
      const fallback = role === 'lead_trainer' ? '/dashboard' : '/student';
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    if (pathname.startsWith('/trainer') && role !== 'lead_trainer' && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

  } catch (error) {
    console.error("COBEL ENGINE AUTH ERROR:", error);
    return response; 
  }

  response.headers.set('x-cobel-engine-status', 'stable-v5.3-307-cleanup');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};