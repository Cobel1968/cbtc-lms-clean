import { NextResponse } from 'next/server';
import { supabase, createUser } from '@/lib/supabaseDB';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Guard against build-time environment absence
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { email, password, first_name, last_name, phone } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe sont requis' }, 
        { status: 400 }
      );
    }
    
    // 2. Auth Signup in Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Erreur lors de la création du compte' }, 
        { status: 400 }
      );
    }
    
    // 3. Profile Creation in the 'users' table via the shared helper
    const { data: newUser, error: createError } = await createUser({
      id: authData.user.id,
      email: authData.user.email!,
      first_name: first_name || null,
      last_name: last_name || null,
      phone: phone || null,
      role: 'student',
      is_active: true,
    });
    
    if (createError || !newUser) {
      return NextResponse.json(
        { error: 'Erreur lors de la création du profil utilisateur' },
        { status: 500 }
      );
    }
    
    // 4. Successful Response
    return NextResponse.json({ 
      data: {
        token: authData.session?.access_token || '',
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          phone: newUser.phone,
          created_at: newUser.created_at,
        },
      },
      message: 'Compte créé avec succès !',
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'inscription' }, 
      { status: 500 }
    );
  }
}