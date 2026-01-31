import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function applyProRataAdjustment(studentId: string, daysMissed: number) {
    console.log("📈 Cobel AI Engine: Applying Pro-Rata Financial Adjustment...");

    const RATE_PER_DAY = 2500; // 2500 CFA
    const penalty = daysMissed * RATE_PER_DAY;

    const { error } = await supabase.from('evidence_logs').insert([{
        student_id: studentId,
        transcript: `AUTOMATED PENALTY: Missed ${daysMissed} classes. Fee: ${penalty} CFA.`,
        action_type: 'ABSENCE_LOGGED',
        evidence_data: { 
            penalty_amount: penalty, 
            type: "Pro-Rata Extension",
            currency: "CFA" 
        }
    }]);

    if (!error) {
        console.log("---");
        console.log(`📅 Timeline Adjusted: +${daysMissed} Days`);
        console.log(`💰 Billing: ${penalty} CFA added to account.`);
    }
}

applyProRataAdjustment(process.argv[2], parseInt(process.argv[3]));