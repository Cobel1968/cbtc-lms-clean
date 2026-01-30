export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseProvider';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Identifiants requis pour accÃƒÂ©der Ãƒ  CBTC' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Get user profile from users table
    const { data: existingUser, error: getUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    let userProfile: any = existingUser;

    if (getUserError || !existingUser) {
      // If user doesn't exist in users table, create one from auth user
      const payload = {
        id: authData.user.id,
        email: authData.user.email,
        first_name: null,
        last_name: null,
        phone: null,
        role: 'student',
        is_active: true,
        avatar_url: null,
        bio: null
      };

      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert(payload)
        .select('*')
        .single();

      if (createError || !newUser) {
        return NextResponse.json(
          { error: 'Erreur lors de la crÃƒÂ©ation du profil utilisateur' },
          { status: 500 }
        );
      }

      userProfile = newUser;
    }

    return NextResponse.json({
      data: {
        token: authData.session?.access_token || '',
        user: {
          id: userProfile.id,
          email: userProfile.email,
          role: userProfile.role,
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          created_at: userProfile.created_at
        }
      },
      message: 'Connexion CBTC rÃƒÂ©ussie ! Redirection...'
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur de connexion' },
      { status: 500 }
    );
  }
}
