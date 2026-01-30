export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { createServerClient }  from '@/lib/supabaseDB';
import * as db  from '@/lib/supabaseDB';

export async function POST(req: Request) {
  try {
    const { email, password, first_name, last_name, phone } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe sont requis' }, 
        { status: 400 }
      );
    }
    
    const supabase = createServerClient();
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Erreur lors de la crÃ©ation du compte' }, 
        { status: 400 }
      );
    }
    
    // Create user profile in users table
    const { data: newUser, error: createError } = await db.createUser({
      id: authData.user?.id,
      email: authData.user?.email!,
      first_name: first_name || null,
      last_name: last_name || null,
      phone: phone || null,
      role: 'student',
      is_active: true,
    });
    
    if (createError || !newUser) {
      return NextResponse.json(
        { error: 'Erreur lors de la crÃ©ation du profil utilisateur' },
        { status: 500 }
      );
    }
    
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
      message: 'Compte crÃ©Ã© avec succÃ¨s !',
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'inscription' }, 
      { status: 500 }
    );
  }
}
