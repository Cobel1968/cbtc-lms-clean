const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySQL() {
    console.log('--- Connecting to Cobel BTC Database ---');
    try {
        const { count, error } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ SQL Query Error:', error.message);
        } else {
            console.log('✅ Status: Connection Successful');
            console.log('📊 Question Count:', count);
            
            if (count >= 191) {
                console.log('🚀 SUCCESS: 191+ questions are successfully inflated and SQL-ready.');
            } else {
                console.log('⚠️ INCOMPLETE: Only ' + count + '/191 questions found. Check "assessments" folder.');
            }
        }
    } catch (err) {
        console.error('❌ Runtime Error:', err.message);
    }
}

verifySQL();
