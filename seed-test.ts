import { createClient } from '@supabase/supabase-js'

// 1. Force alignment with your .env.local names
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing environment variables in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log("🚀 Starting Sync: Local Drive -> Supabase Cloud...")

  // 2. Alignment: Matches your 'profiles' table
  const testId = '00000000-0000-0000-0000-000000000000'
  
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ 
      id: testId, 
      full_name: 'Cobel Test Student',
      role: 'student' 
    })

  if (profileError) {
    console.error("❌ Profile Sync Failed:", profileError.message)
    return
  }

  // 3. Alignment: Matches your 'enrollments' table (using user_id, not student_id)
  const { error: enrollmentError } = await supabase
    .from('enrollments')
    .upsert({ 
      user_id: testId, 
      status: 'active',
      progress_percentage: 0
    })

  if (enrollmentError) {
    console.error("❌ Enrollment Sync Failed:", enrollmentError.message)
  } else {
    console.log("✅ SUCCESS: Local drive is now synced with SQL tables!")
  }
}

seed()