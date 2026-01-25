import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // 'next' allows us to redirect the user back to where they were (e.g., Checkout)
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    // 2. EXCHANGE CODE FOR SESSION
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // 3. SUCCESS: Send them to the intended pedagogical path
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 4. ROLLBACK: If auth fails, return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
