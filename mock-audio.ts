import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function syncMockAudio(profId: string, verbalInput: string) {
    console.log(" Cobel AI Engine: Simulating Audio Transcription...");

    const { error } = await supabase.from('evidence_logs').insert([{
        student_id: profId,
        transcript: verbalInput,
        action_type: "AUDIO_ASSESSMENT_MOCK",
        language_detected: "fra",
        evidence_data: {
            simulation: true,
            technical_focus: "Site Logistics"
        }
    }]);

    if (!error) {
        console.log(" SUCCESS! Verbal evidence synced to profile.");
        console.log(` Text Captured: "${verbalInput}"`);
    } else {
        console.error(" Sync Error:", error.message);
    }
}

const [,, pid, text] = process.argv;
syncMockAudio(pid, text);