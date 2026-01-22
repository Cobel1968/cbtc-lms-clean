import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import StudentDashboardUI from './StudentDashboardUI';

export default async function Page() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Pre-fetch profile for the Cobel Engine to avoid client-side layout shift
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return <StudentDashboardUI initialProfile={profile} user={user} />;
}