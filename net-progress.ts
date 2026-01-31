import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function generateNetProgress(studentId: string) {
    console.log(" Cobel AI Engine: Finalizing Net Pedagogical Report...");

    const { data, error } = await supabase
        .from('student_competency_matrix')
        .select('*')
        .eq('student_id', studentId)
        .single();

    if (error) return console.error(" Data Fetch Error:", error.message);

    // LOGIC CALCULATION
    const baseDuration = 90; // Standard 90-day Vocational Track
    const daysSaved = ( (data.machinery_competency ? 1 : 0) + 
                       (data.site_management_competency ? 1 : 0) + 
                       (data.infrastructure_competency ? 1 : 0) ) * 5;
    
    // We fetch the extension days from our recent update
    const daysAdded = data.days_missed * 3; // 3 days penalty per absence
    const netAdjustment = daysAdded - daysSaved;
    const totalFees = data.days_missed * 2500;

    const gradDate = new Date();
    gradDate.setDate(gradDate.getDate() + baseDuration + netAdjustment);

    console.log("--- STUDENT NET STATUS ---");
    console.log(` Student ID: ${studentId}`);
    console.log(` Technical Mastery: ${daysSaved / 5} Modules (-${daysSaved} Days)`);
    console.log(` Attendance Gaps: ${data.days_missed} Missed Sessions (+${daysAdded} Days)`);
    console.log(` Billing Adjustment: ${totalFees} CFA`);
    console.log("---");
    console.log(` NET ADJUSTMENT: ${netAdjustment > 0 ? '+' : ''}${netAdjustment} Days`);
    console.log(` FINAL PREDICTED GRADUATION: ${gradDate.toDateString()}`);
}

generateNetProgress(process.argv[2]);