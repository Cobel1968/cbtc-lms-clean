import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const assessmentsDir = path.join(process.cwd(), 'assessments');
        
        if (!fs.existsSync(assessmentsDir)) {
            return NextResponse.json({ error: "Assessments folder not found at " + assessmentsDir });
        }

        const files = fs.readdirSync(assessmentsDir).filter(f => f.endsWith('.json'));
        let totalProcessed = 0;
        let errors = [];

        for (const file of files) {
            const filePath = path.join(assessmentsDir, file);
            const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            // Expected format: Array of question objects
            // Mapping to your schema: text_fr, text_en, technical_term, module_id, course_id
            const { data, error } = await supabase
                .from('questions')
                .upsert(fileData, { onConflict: 'id' });

            if (error) {
                errors.push({ file, msg: error.message });
            } else {
                totalProcessed += (Array.isArray(fileData) ? fileData.length : 1);
            }
        }

        return NextResponse.json({
            status: errors.length > 0 ? "Partial Success" : "Full Success",
            questions_inflated: totalProcessed,
            files_processed: files.length,
            errors: errors
        });
    } catch (err) {
        return NextResponse.json({ status: "Error", message: err.message }, { status: 500 });
    }
}