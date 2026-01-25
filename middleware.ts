import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. IMPROVED BYPASS LOGIC
  // Explicitly allowing /auth/callback to prevent the hanging during initial login sign-in
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

  if (isPublicPage || isStaticAsset || isPublicApi) {
    return NextResponse.next();
  }

  // 2. STABLE INITIALIZATION
  // Create an unmodified response first
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
            // Update request cookies so subsequent logic sees the changes
            request.cookies.set({ name, value, ...options });
            // Sync with the response object we created earlier
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

    // CRITICAL: getUser() triggers the session refresh logic safely
    const { data: { user } } = await supabase.auth.getUser();

    // 3. AUTH GUARD
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 4. ROLE-BASED ACCESS CONTROL (Cobel Engine Pedagogical Roles)
    // Metadata is the safest place to store role for fast middleware checks
    const role = user.user_metadata?.role;

    // Protection for Admin/Lead Trainer routes
    if (pathname.startsWith('/admin') && role !== 'admin') {
      const fallback = role === 'lead_trainer' ? '/dashboard' : '/student';
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    // Protection for Lead Trainer features (e.g., Handwriting Analysis Dashboard)
    if (pathname.startsWith('/trainer') && role !== 'lead_trainer' && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

  } catch (error) {
    console.error("COBEL ENGINE AUTH ERROR:", error);
    return response; 
  }

  response.headers.set('x-cobel-engine-status', 'stable-v4-redirect-fix');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};