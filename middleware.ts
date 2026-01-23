import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. UPDATED BYPASS LIST
  const isPublicPage = 
    pathname === '/' || 
    pathname === '/diagnostic' ||
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/auth');

  const isPublicApi = pathname.startsWith('/api/analyzehandwriting');
                        
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/assets') || 
    pathname.includes('favicon.ico') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname);

  // Safeguard: Immediate exit for public routes and assets
  if (isPublicPage || isStaticAsset || isPublicApi) {
    return NextResponse.next();
  }

  // 2. INITIALIZE RESPONSE
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response; 
  }

  try {
    // Using the library directly here prevents the naming conflict with utils/supabase/server
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

    // Refresh session if it exists
    const { data: { user } } = await supabase.auth.getUser();

    // 3. AUTH GUARD: Redirect to login if no session on private routes
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 4. ROLE-BASED ACCESS CONTROL
    const role = user.user_metadata?.role;

    if (pathname.startsWith('/admin') && role !== 'admin') {
      const fallback = role === 'trainer' ? '/trainer' : '/student';
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    if (pathname.startsWith('/trainer') && role === 'student') {
      return NextResponse.redirect(new URL('/student', request.url));
    }

  } catch (error) {
    console.error("COBEL MIDDLEWARE ERROR:", error);
    return response; 
  }

  response.headers.set('x-cobel-engine-status', 'stable-v4-redirect-fix');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to add other excluded static paths here, as /assets is handled in isStaticAsset
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};