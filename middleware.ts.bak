import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. SILENT ASSET HANDLER (Turns 307s into clean 200s for missing icons/maps)
  const isMissingAssetProbe = 
    pathname.includes('apple-touch-icon') || 
    pathname.includes('android-chrome') || 
    pathname.includes('browserconfig') ||
    pathname.endsWith('.map') ||
    pathname.includes('manifest.json');

  if (isMissingAssetProbe) {
    // Return a 200 OK with an empty body to stop the redirect loop and quiet the logs
    return new NextResponse(null, { status: 200 });
  }

  // 2. BOT & PROBE TERMINATION (Stay firm with 404s for actual attacks)
  const botPatterns = [/wp-/, /\.php$/, /xmlrpc/i, /actuator/i, /config/i, /\.env$/, /\.git/];
  if (botPatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  // 3. PUBLIC BYPASS
  const isPublicPage = ['/', '/diagnostic', '/login', '/register', '/auth', '/pricing'].some(path => 
    pathname === path || pathname.startsWith(path)
  );
  
  // UPDATED: Removed hyphen to match your existing app/api/analyzehandwriting structure
  const isPublicApi = pathname.startsWith('/api/analyzehandwriting');
  
  const isStaticAsset = pathname.startsWith('/_next') || pathname.startsWith('/assets') || pathname.includes('favicon.ico');

  if (isPublicPage || isStaticAsset || isPublicApi) {
    return NextResponse.next();
  }

  // 4. SUPABASE AUTH INITIALIZATION
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return response;

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
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
    });

    const { data: { user } } = await supabase.auth.getUser();

    // 5. AUTH GUARD
    if (!user) {
      const isAppPath = ['/dashboard', '/student', '/trainer', '/admin'].some(p => pathname.startsWith(p));
      if (isAppPath) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
      return new NextResponse(null, { status: 404 });
    }

    // 6. RBAC
    const role = user.user_metadata?.role;
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(role === 'lead_trainer' ? '/dashboard' : '/student', request.url));
    }
    if (pathname.startsWith('/trainer') && role !== 'lead_trainer' && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

  } catch (error) {
    return response; 
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
