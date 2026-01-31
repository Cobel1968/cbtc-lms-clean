import Tesseract from 'tesseract.js';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import * as fs from 'fs';

const SB_URL = "https://rvlcpygatguvxhuliand.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGNweWdhdGd1dnhodWxpYW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjE0ODMzMywiZXhwIjoyMDc3NzI0MzMzfQ.shtG62BDC1rVeYvSCq04KjW0cFNp0joALVMdUoE38tc"; 
const supabase = createClient(SB_URL, SB_KEY);

async function runCalibratedBridge(imagePath: string, profId: string) {
    console.log(" Calibrating Image for Cobel AI Engine...");

    const processedPath = "./calibrated-input.png";

    try {
        // PRE-PROCESSING: Scaling up and cleaning
        await sharp(imagePath)
            .resize(2000) // Force high-res for small handwriting
            .grayscale()
            .normalize() // Enhances contrast
            .sharpen()
            .toFile(processedPath);

        console.log(" Running OCR on Calibrated Image...");
        
        const result = await Tesseract.recognize(processedPath, 'fra+eng', {
            logger: m => { if (m.status === 'recognizing text') console.log(` Reading: ${(m.progress * 100).toFixed(0)}%`); }
        });

        const { error } = await supabase.from('evidence_logs').insert([{
            student_id: profId,
            transcript: result.data.text,
            language_detected: "fra+eng",
            action_type: "CALIBRATED_OCR",
            evidence_data: {
                original_file: imagePath,
                confidence: result.data.confidence,
                calibrated: true
            }
        }]);

        if (!error) console.log(" SUCCESS! High-Confidence Evidence Logged.");
        else console.error(" Sync Error:", error.message);

    } catch (err) {
        console.error(" Calibration Failed:", err);
    } finally {
        if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
        process.exit(0);
    }
}

const [,, img, , pid] = process.argv;
runCalibratedBridge(img, pid);