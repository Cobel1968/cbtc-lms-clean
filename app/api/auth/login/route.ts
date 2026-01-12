import { NextResponse } from 'next/server';
import { createServerClient }  from '@/lib/supabaseClient';
import * as db  from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Identifiants requis pour accÃ©der Ã  CBTC' }, 
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
    let userProfile;
    const { data: existingUser, error: getUserError } = await db.getUserByEmail(email);
    
    if (getUserError || !existingUser) {
      // If user doesn't exist in users table, create one from auth user
      const { data: newUser, error: createError } = await db.createUser({
        id: authData.user?.id,
        email: authData.user?.email!,
        role: 'student',
        is_active: true,
      });
      
      if (createError || !newUser) {
        return NextResponse.json(
          { error: 'Erreur lors de la crÃ©ation du profil utilisateur' },
          { status: 500 }
        );
      }
      
      userProfile = newUser;
    } else {
      userProfile = existingUser;
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
          created_at: userProfile.created_at,
        },
      },
      message: 'ðŸš€ Connexion CBTC rÃ©ussie ! Redirection...',
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur de connexion' }, 
      { status: 500 }
    );
  }
}
