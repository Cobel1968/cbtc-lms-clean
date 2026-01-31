import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function fixAbsenceRecord(studentId: string) {
    console.log(" Cobel AI Engine: Categorizing Evidence Records...");

    const { data, error } = await supabase
        .from('evidence_logs')
        .update({ action_type: 'ABSENCE_LOGGED' })
        .eq('student_id', studentId)
        .ilike('transcript', '%ABSENCE:%');

    if (error) {
        console.error(" Fix Failed:", error.message);
    } else {
        console.log(" SUCCESS: Absence formalized. Billing view updated.");
    }
}

fixAbsenceRecord(process.argv[2]);