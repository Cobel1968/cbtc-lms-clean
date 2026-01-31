import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function analyzeGaps(studentId: string) {
    console.log(" Cobel AI Engine: Running Vocational Gap Analysis...");

    const { data, error } = await supabase
        .from('student_competency_matrix')
        .select('*')
        .eq('student_id', studentId)
        .single();

    if (error) return console.error(" Error fetching competency matrix.");

    const standards = [
        { name: "Heavy Machinery (Poclain/Pelle)", met: data.machinery_competency },
        { name: "Site Management (Chantier/Site)", met: data.site_management_competency },
        { name: "Infrastructure (Buses/Drainage)", met: data.infrastructure_competency }
    ];

    const gaps = standards.filter(s => !s.met);

    console.log("--- TRAINING FOCUS REPORT ---");
    if (gaps.length === 0) {
        console.log(" ALL STANDARDS MET: Student is ready for final exam/certification.");
    } else {
        console.log(` ${gaps.length} UNMET STANDARDS DETECTED:`);
        gaps.forEach(gap => console.log(`  - [ ] ${gap.name}`));
        console.log("---");
        console.log(" Recommendation: Schedule practical sessions for the items above.");
    }
}

analyzeGaps(process.argv[2]);