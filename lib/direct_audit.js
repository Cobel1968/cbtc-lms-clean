const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function runAudit() {
  console.log(' Connecting to SQL tables...');
  
  // Check Questions Table
  const { count: qCount, error: qError } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true });

  // Check Courses Table (The Courses inflation)
  const { count: cCount, error: cError } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });

  if (qError || cError) {
    console.error(' SQL Error:', qError?.message || cError?.message);
  } else {
    console.log('\n====================================');
    console.log(' INFLATION REPORT: COBEL AI ENGINE');
    console.log('====================================');
    console.log(' Total Courses: ' + cCount);
    console.log(' Total Questions: ' + qCount + ' / 191');
    console.log('------------------------------------');
    
    if (qCount >= 191) {
      console.log(' STATUS: FULLY INFLATED');
    } else {
      console.log(' STATUS: DATA GAP DETECTED (' + (191 - qCount) + ' missing)');
    }
    console.log('====================================\n');
  }
}

runAudit();