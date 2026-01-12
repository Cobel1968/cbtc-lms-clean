import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('Seeding...');

  // Helper to create user safely
  async function createAuthUser(email: string, password: string) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    if (!data?.user) throw new Error(`Failed to create ${email}`);
    return data.user;
  }

  // Admin
  const admin = await createAuthUser('admin@cbtc.com', 'Admin123!');
  await supabase.from('users').upsert({
    id: admin.id,
    email: 'admin@cbtc.com',
    role: 'admin',
    first_name: 'System',
    last_name: 'Admin',
    is_active: true,
  });

  // Trainer
  const trainer = await createAuthUser('trainer@cbtc.com', 'Trainer123!');
  await supabase.from('users').upsert({
    id: trainer.id,
    email: 'trainer@cbtc.com',
    role: 'instructor',
    first_name: 'Jane',
    last_name: 'Doe',
    is_active: true,
  });

  // Student
  const student = await createAuthUser('student@cbtc.com', 'Student123!');
  await supabase.from('users').upsert({
    id: student.id,
    email: 'student@cbtc.com',
    role: 'student',
    first_name: 'John',
    last_name: 'Smith',
    is_active: true,
  });

  // Sample Course
  const { data: course } = await supabase
    .from('courses')
    .insert({
      title: 'Introduction to Web Development',
      description: 'Learn HTML, CSS, JS',
      instructor_id: trainer.id,
      price: 99,
    })
    .select()
    .single();

  if (!course) throw new Error('Failed to create course');

  // Enroll student
  await supabase.from('enrollments').insert({
    user_id: student.id,
    course_id: course.id,
  });

  console.log('SEED SUCCESS: admin, trainer, student + course');
}

seed().catch(console.error);
