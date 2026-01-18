'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Clock, Loader2 } from 'lucide-react';

import supabase from '@/lib/supabaseClient';
import { coursesData } from '@/lib/coursesData';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Question {
  id: string;
  question: { fr: string; en: string };
  options: { fr: string; en: string }[];
  correctAnswer: number;
}

export default function DiagnosticPage() {
  const router = useRouter();
  const { language, isMounted } = useLanguage();

  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(1800);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const questions: Question[] = useMemo(
    () => [
      {
        id: '1',
        question: {
          fr: 'Expérience technique préalable ?',
          en: 'Prior technical experience?',
        },
        options: [
          { fr: 'Aucune', en: 'None' },
          { fr: 'Débutant', en: 'Beginner' },
          { fr: 'Intermédiaire', en: 'Intermediate' },
          { fr: 'Avancé', en: 'Advanced' },
        ],
        correctAnswer: 0,
      },
      {
        id: '2',
        question: {
          fr: 'Maîtrise de la terminologie technique bilingue ?',
          en: 'Mastery of bilingual technical terminology?',
        },
        options: [
          { fr: 'Faible', en: 'Low' },
          { fr: 'Moyenne', en: 'Average' },
          { fr: 'Bonne', en: 'Good' },
          { fr: 'Excellente', en: 'Excellent' },
        ],
        correctAnswer: 0,
      },
    ],
    []
  );

  // Timer (runs only after a course is selected and until complete)
  useEffect(() => {
    if (!selectedCourse) return;
    if (isComplete) return;
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCourse, isComplete, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }
    void handleSubmit();
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    try {
      // Score: normalize to 0-100 (simple heuristic)
      let totalPoints = 0;
      questions.forEach((_q, index) => {
        if (answers[index] !== undefined) totalPoints += answers[index] + 1; // 1..4
      });

      const calculatedScore = Math.round((totalPoints / (questions.length * 4)) * 100);
      setScore(calculatedScore);

      // Save to Supabase (best-effort)
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user && selectedCourse) {
        const { error } = await supabase.from('diagnostic_results').insert({
          user_id: user.id,
          course_id: selectedCourse,
          score: calculatedScore,
          answers,
          completed_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Error saving diagnostic results:', error);
        }
      }

      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Loading gate (prevents hydration mismatch if your LanguageContext uses client-only logic)
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // Course selection
  if (!selectedCourse && !isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
        <div className="max-w-xl w-full bg-white rounded-[40px] shadow-xl p-10 border border-slate-100">
          <h1 className="text-2xl font-black mb-8 uppercase italic tracking-tighter text-slate-900">
            {language === 'fr' ? 'Sélectionner le Domaine' : 'Select Vocational Domain'}
          </h1>

          <div className="grid gap-3">
            {coursesData.map((course: any) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className="w-full text-left p-6 border-2 border-slate-50 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-slate-900">{course.name?.[language] ?? course.id}</span>
                <ArrowRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-100">
          <CheckCircle size={60} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-5xl font-black mb-2 text-slate-900">{score}%</h2>

          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">
            {language === 'fr' ? 'Parcours Cobel AI cartographié' : 'Cobel AI path mapped'}
          </p>

          <Link
            href="/dashboard"
            className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all"
          >
            {language === 'fr' ? 'Accéder au Tableau de Bord' : 'Enter Dashboard'}
          </Link>
        </div>
      </div>
    );
  }

  // Main diagnostic screen
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-black uppercase text-xs text-slate-900">
            {language === 'fr' ? 'Étape' : 'Step'} {currentQuestion + 1} / {questions.length}
          </span>

          <div className="flex items-center gap-2 text-indigo-600 font-black font-mono text-sm bg-indigo-50 px-4 py-2 rounded-full">
            <Clock size={16} />
            {formatTime(timeRemaining)}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100">
          <h2 className="text-2xl font-black mb-8 text-slate-900">{currentQ.question[language]}</h2>

          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-6 border-2 rounded-2xl transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-100 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-slate-900">{option[language]}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined || isSaving}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                {language === 'fr' ? 'Sauvegarde...' : 'Saving...'}
              </>
            ) : currentQuestion < questions.length - 1 ? (
              <>
                {language === 'fr' ? 'Suivant' : 'Next'}
                <ArrowRight size={16} />
              </>
            ) : (
              language === 'fr' ? 'Terminer' : 'Finish'
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
