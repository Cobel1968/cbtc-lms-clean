import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI({ apiKey: 'YOUR_OPENAI_API_KEY' });
const supabase = createClient(
    "https://rvlcpygatguvxhuliand.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"
);

async function processVerbalEvidence(filePath: string, profId: string) {
    console.log(" Cobel AI Engine: Transcribing Audio Evidence...");

    try {
        // 1. Transcription via Whisper (Bilingual optimized)
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
            language: "fr" // Forces French for better technical term accuracy
        });

        console.log(` Detected Text: "${transcription.text}"`);

        // 2. Sync to Supabase
        const { error } = await supabase.from('evidence_logs').insert([{
            student_id: profId,
            transcript: transcription.text,
            action_type: "AUDIO_ASSESSMENT",
            language_detected: "fra",
            evidence_data: {
                source: "Whisper-v1",
                file_name: filePath
            }
        }]);

        if (!error) console.log(" SUCCESS! Verbal evidence archived.");
    } catch (err) {
        console.error(" Audio Bridge Failed:", err);
    }
}

const [,, file, pid] = process.argv;
processVerbalEvidence(file, pid);