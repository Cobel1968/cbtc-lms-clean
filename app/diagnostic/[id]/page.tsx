'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseDB';
import { useRouter } from 'next/navigation';

export default function DiagnosticPage({ params }) {
    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function loadDiagnostic() {
            const { data } = await supabase.from('modules').select('*').eq('id', params.id).single();
            if (data?.category) {
                try {
                    setQuestions(JSON.parse(data.category));
                } catch (e) { console.error("JSON Parse Error"); }
            }
        }
        loadDiagnostic();
    }, [params.id]);

    const handleAnswer = async () => {
        const nextStep = currentStep + 1;
        
        // Simulating a correct answer for this logic test
        setScore(prev => prev + 1);

        if (nextStep < questions.length) {
            setCurrentStep(nextStep);
        } else {
            submitResults();
        }
    };

    const submitResults = async () => {
        setIsSubmitting(true);
        const fluencyScore = (score / questions.length) * 100;
        
        // Phase 3: Temporal Optimization & Automated Milestone Forecasting
        // Higher fluency leads to lower curriculum density and faster timeframes.
        const predictedWeeks = fluencyScore > 80 ? 2 : 6;

        const { error } = await supabase.from('user_profiles').insert({
            module_id: params.id,
            fluency_score: fluencyScore,
            predicted_timeframe: `${predictedWeeks} weeks`,
            curriculum_density: fluencyScore > 80 ? 'Light' : 'Dense'
        });

        if (!error) {
            alert(`Diagnostic Complete! Predicted path: ${predictedWeeks} weeks.`);
            router.push('/modules');
        }
        setIsSubmitting(false);
    };

    if (questions.length === 0) return <div className="p-20 text-center">Loading Engine...</div>;

    const q = questions[currentStep];

    return (
        <div className="max-w-2xl mx-auto mt-20 p-8 bg-white border rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-blue-500 uppercase">Assessment Node {currentStep + 1} of {questions.length}</span>
                <span className="text-xs text-slate-400">Temporal Optimization Active</span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{q.text_en}</h2>
            <p className="text-lg text-slate-500 italic mb-8 border-l-4 border-blue-200 pl-4">{q.text_fr}</p>
            
            <button 
                onClick={handleAnswer}
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-blue-600 transition-all transform hover:scale-[1.02]"
            >
                {isSubmitting ? "Processing Technical Fluency..." : "Submit Response"}
            </button>
        </div>
    );
}