import { createClient } from '@supabase/supabase-js';

const SB_URL = "https://rvlcpygatguvxhuliand.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"; 
const supabase = createClient(SB_URL, SB_KEY);

// Keywords that indicate actual vocational progress
const techKeywords = ["chan", "work", "trav", "cons", "site", "engin", "pelle", "fuel", "carb", "gaso"];

async function runVocationalCheck(studentId: string) {
    const { data } = await supabase.from('evidence_logs').select('transcript').eq('student_id', studentId).limit(1).single();
    if (!data) return;

    const rawText = data.transcript.toLowerCase();
    const matches = techKeywords.filter(k => rawText.includes(k));

    console.log(" Raw Segment:", rawText.substring(0, 100).replace(/\n/g, ' '));
    console.log("---");
    
    if (matches.length > 0) {
        console.log(` Technical DNA Found: ${matches.join(', ')}`);
        console.log(" Logic: Updating Student Skill Profile...");
    } else {
        console.log("ℹ Status: Administrative document detected (No technical milestones found).");
    }
}

runVocationalCheck(process.argv[2]);