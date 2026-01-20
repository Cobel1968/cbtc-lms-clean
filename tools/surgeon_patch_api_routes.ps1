# PS 3.1 - Script Surgeon: Patch API routes safely (Option A + Option B)
param(
  [string]$Root = "D:\cbtc-final\cbtc-lms",
  [switch]$WhatIf
)

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Backup-File([string]$Path) {
  $stamp = (Get-Date).ToString("yyyyMMdd_HHmmss")
  $bak = "$Path.bak.$stamp"
  [System.IO.File]::Copy($Path, $bak, $true)
  return $bak
}

function Patch-File([string]$Path, [string]$NewContent) {
  if (!(Test-Path $Path)) { throw "Not found: $Path" }

  if ($WhatIf) {
    "WOULD-PATCH: $Path"
    return
  }

  $bak = Backup-File $Path
  Write-Utf8NoBom $Path $NewContent
  "PATCHED: $Path"
  "BACKUP:  $bak"
}

# Pin working directory (prevents System32 path bugs)
Set-Location $Root
if ((Get-Location).Path -ne $Root) { throw "Failed to set location to $Root" }

# ---- Target paths ----
$coursesRoute = Join-Path $Root "app\api\courses\route.ts"
$loginRoute   = Join-Path $Root "app\api\auth\login\route.ts"

# ---- New content: app/api/courses/route.ts (Option A: direct Supabase query) ----
$coursesContent = @"
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const supabase = createServerClient();

    const { data: db_courses, error } = await supabase
      .from('courses')
      .select('*');

    if (error) {
      console.error('cobel_engine: database_fetch_error:', error);
    }

    // PATH VERIFICATION: strictly lowercase directory names
    const courses_directory = path.join(process.cwd(), 'public/courses');

    const get_physical_files = (sub_dir: string) => {
      // Ensure sub_dir is forced to lowercase to match your PowerShell migration
      const target_dir = sub_dir.toLowerCase();
      const full_path = path.join(courses_directory, target_dir);

      if (!fs.existsSync(full_path)) return [];

      return fs.readdirSync(full_path)
        .filter((file) => file.endsWith('.html'))
        .map((file) => {
          // FEATURE: Lowercase normalization for mapping
          const system_name = file.toLowerCase().replace(/_/g, ' ').replace('.html', '');
          const local_price = target_dir === 'vocational' ? 35000 : 15000;

          return {
            id: `fs-${target_dir}-${file.toLowerCase()}`, // ID forced lowercase
            name_en: system_name,
            name_fr: system_name,
            file_path: `/courses/${target_dir}/${file.toLowerCase()}`, // PATH forced lowercase
            type: target_dir, // 'vocational' or 'grammar'
            category: target_dir,
            is_auto_detected: true,
            last_updated: fs.statSync(path.join(full_path, file)).mtime,
            price: local_price,
            currency: 'xof', // Currency normalized
            is_locked: true,
            payment_gateways: ['orange money', 'mtn momo', 'moov', 'wave']
          };
        });
    };

    const grammar_files = get_physical_files('grammar');
    const vocational_files = get_physical_files('vocational');

    const merged_courses = [
      ...(db_courses || []),
      ...grammar_files,
      ...vocational_files
    ];

    const unique_courses = Array.from(
      new Map(merged_courses.map((item: any) => [String(item.file_path).toLowerCase(), item])).values()
    );

    return NextResponse.json({
      data: unique_courses,
      market: 'ci',
      currency: 'xof'
    });

  } catch (error: any) {
    console.error('cobel_engine: lowercase_audit_error:', error);
    return NextResponse.json(
      { error: 'erreur serveur lors du scan' },
      { status: 500 }
    );
  }
}
"@

# ---- New content: app/api/auth/login/route.ts (Option B: direct users query/create) ----
# Uses created_at (confirmed by you).
$loginContent = @"
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Identifiants requis pour accéder à CBTC' },
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
          { error: 'Erreur lors de la création du profil utilisateur' },
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
      message: 'Connexion CBTC réussie ! Redirection...'
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur de connexion' },
      { status: 500 }
    );
  }
}
"@

"=== SURGEON: PATCH PLAN ==="
"Root: $Root"
"Course route: $coursesRoute"
"Login route:  $loginRoute"
"Dry-run: $WhatIf"
""

Patch-File $coursesRoute $coursesContent
""
Patch-File $loginRoute $loginContent
""
"=== SURGEON DONE ==="
