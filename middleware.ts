import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. UPDATED BYPASS LIST
  // Added '/' and '/diagnostic' so the public can actually see your work!
  const isPublicPage = 
    pathname === '/' || 
    pathname === '/diagnostic' ||
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/auth');

  const isPublicApi = pathname.startsWith('/api/analyzehandwriting');
                       
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/assets') || // Matches your public/assets/ logo path
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

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response; 
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) { return request.cookies.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            // IMPORTANT: Update response so cookies persist
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};