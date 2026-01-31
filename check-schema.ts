import { createClient } from '@supabase/supabase-js';

// No environment variables - pure hardcoding for diagnostic
const SB_URL = "https://rvlcpygatguvxhuliand.supabase.co"; 
const SB_KEY = "PASTE_YOUR_SERVICE_ROLE_KEY_HERE"; 

const supabase = createClient(SB_URL, SB_KEY);

async function checkTable() {
    console.log(" Cobel Diagnostic: Testing Connection...");
    
    try {
        const { data, error } = await supabase.from('evidence_logs').select('*').limit(1);

        if (error) {
            console.error(" Connection Refused:", error.message);
            console.log(" Note: If it says 'Invalid API key', the key you pasted is likely the 'anon' key or has a typo.");
        } else {
            console.log(" Connection Verified!");
            if (data && data.length > 0) {
                console.log(" Available Columns:", Object.keys(data[0]));
            } else {
                console.log(" Table is currently empty, but the connection works.");
            }
        }
    } catch (e) {
        console.error(" Fatal Script Error:", e);
    }
}

checkTable();