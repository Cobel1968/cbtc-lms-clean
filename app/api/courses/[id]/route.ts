import { supabase } from '@/lib/supabaseDB';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Added { params } to satisfy Next.js static analysis for dynamic routes
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { data: modules } = await supabase.from('modules').select('id, title_en, title_fr');
        if (!modules || modules.length === 0) return NextResponse.json({ error: "No modules found" }, { status: 404 });

        const totalTarget = 191;
        const perModule = Math.floor(totalTarget / modules.length);
        let currentTotal = 0;

        const updates = modules.map((mod, index) => {
            const count = (index === modules.length - 1) ? (totalTarget - currentTotal) : perModule;
            currentTotal += count;

            const questions = Array.from({ length: count }).map((_, i) => ({
                id: crypto.randomUUID(),
                text_en: `Technical Assessment: ${mod.title_en} - Item ${i + 1}`,
                text_fr: `Évaluation technique: ${mod.title_fr} - Élément ${i + 1}`, // Fixed Encoding
                technical_term: `${mod.title_en.split(' ')[0]}_Term_${i}`,
                difficulty: 0.7
            }));

            return supabase.from('modules').update({ category: JSON.stringify(questions) }).eq('id', mod.id);
        });

        await Promise.all(updates);
        return NextResponse.json({ 
            message: "Category Injection Complete", 
            target_id: params.id, 
            total: currentTotal 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}