import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function manualValidate(studentId: string, moduleName: string, trainerName: string) {
    console.log(` Cobel AI Engine: Manual Trainer Validation for [${moduleName}]...`);

    const { error } = await supabase.from('evidence_logs').insert([{
        student_id: studentId,
        transcript: `MANUAL VALIDATION by ${trainerName}: Student demonstrated proficiency in ${moduleName} during field observation.`,
        action_type: 'MANUAL_TRAINER_VALIDATION',
        evidence_data: {
            module: moduleName,
            validated_by: trainerName,
            method: "In-person Observation"
        }
    }]);

    if (!error) {
        console.log(` SUCCESS: ${moduleName} is now marked as COMPLETED for this student.`);
    } else {
        console.error(" Validation Error:", error.message);
    }
}

// Arguments: StudentID, ModuleKeyword (to trigger SQL regex), TrainerName
manualValidate(process.argv[2], process.argv[3], process.argv[4]);