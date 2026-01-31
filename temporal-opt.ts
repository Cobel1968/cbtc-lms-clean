import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function calculateTemporalOptimization(studentId: string) {
    console.log(" Cobel AI Engine: Calculating Temporal Optimization...");

    const { data, error } = await supabase
        .from('student_competency_matrix')
        .select('*')
        .eq('student_id', studentId)
        .single();

    if (error) return console.error(" Error:", error.message);

    // LOGIC: Each technical competency validated saves 5 days of manual training
    let daysSaved = 0;
    if (data.machinery_competency) daysSaved += 5;
    if (data.site_management_competency) daysSaved += 5;
    if (data.infrastructure_competency) daysSaved += 5;

    const originalGraduation = new Date(data.last_updated);
    originalGraduation.setDate(originalGraduation.getDate() + 90); // Default 90-day program

    const optimizedGraduation = new Date(originalGraduation);
    optimizedGraduation.setDate(optimizedGraduation.getDate() - daysSaved);

    console.log("---");
    console.log(` Competencies Found: ${daysSaved / 5} / 3`);
    console.log(` Timeframe Prediction: -${daysSaved} Days`);
    console.log(` New Predicted Graduation: ${optimizedGraduation.toDateString()}`);
}

calculateTemporalOptimization(process.argv[2]);