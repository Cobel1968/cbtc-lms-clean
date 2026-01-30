export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabaseDB';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data: modules } = await supabase.from('modules').select('id, title_en, title_fr');
    if (!modules) return NextResponse.json({ error: "No modules found" });

    const totalTarget = 191;
    const perModule = Math.floor(totalTarget / modules.length);
    let currentTotal = 0;

    const updates = modules.map((mod, index) => {
        const count = (index === modules.length - 1) ? (totalTarget - currentTotal) : perModule;
        currentTotal += count;

        const questions = Array.from({ length: count }).map((_, i) => ({
            id: crypto.randomUUID(),
            text_en: `Technical Assessment: ${mod.title_en} - Item ${i + 1}`,
            text_fr: `Ã‰valuation technique: ${mod.title_fr} - Ã‰lÃ©ment ${i + 1}`,
            technical_term: `${mod.title_en.split(' ')[0]}_Term_${i}`,
            difficulty: 0.7
        }));

        // Stringify the JSON so the 'category' TEXT column accepts it
        return supabase.from('modules').update({ category: JSON.stringify(questions) }).eq('id', mod.id);
    });

    await Promise.all(updates);
    return NextResponse.json({ message: "Category Injection Complete", total: currentTotal });
}