'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Clock, Loader2 } from 'lucide-react';

import supabase from '@/lib/supabaseClient';
import { coursesData } from '@/lib/coursesData';
import { useLanguage } from '@/app/contexts/LanguageContext';

type SupabaseDiagnosticOption = {
  key: string;
  text_fr: string;
  text_en: string;
};

type SupabaseDiagnosticQuestion = {
  id: string;
  type?: string;
  question_fr: string;
  question_en: string;
  options: SupabaseDiagnosticOption[];
  answer?: string; // we don't need it client-side for a diagnostic
  technical_term_target?: string | null;
};

export default function DiagnosticPage() {
  const router = useRouter();
  const { language, isMounted } = useLanguage();

  const [selectedCourse, setSelectedCourse] = useState<string>('');

  // Loaded from Supabase
  const [testId, setTestId] = useState<string>('');
  const [durationSeconds, setDurationSeconds] = useState<number>(30 * 60);
  const [questions, setQuestions] = useState<SupabaseDiagnosticQuestion[]>([]);
  const [isLoadingTest, setIsLoadingTest] = useState<boolean>(false);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60);

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Results
  const [percentageScore, setPercentageScore] = useState<number>(0);

  // ---------- Load diagnostic test when a course is selected ----------
  useEffect(() => {
    const loadTest = async () => {
      if (!selectedCourse) return;

      setIsLoadingTest(true);
      setTestId('');
      setQuestions([]);
      setCurrentQuestion(0);
      setAnswers({});
      setIsComplete(false);
      setPercentageScore(0);

      try {
        const { data, error } = await supabase
          .from('diagnostic_tests')
          .select('id, duration_minutes, questions')
          .eq('course_id', selectedCourse)
          .limit(1)
          .single();

        if (error || !data) {
          console.error('Unable to load diagnostic test:', error);
          return;
        }

        // Only accept course diagnostics where questions is an array
        const q = Array.isArray(data.questions) ? (data.questions as SupabaseDiagnosticQuestion[]) : [];

        if (!Array.isArray(data.questions)) {
          console.warn('Diagnostic test questions is not an array (likely IELTS/object). Ignoring for this page.');
        }

        setTestId(data.id);

        const mins = Number(data.duration_minutes || 30);
        const secs = mins * 60;
        setDurationSeconds(secs);
        setTimeRemaining(secs);

        setQuestions(q);
      } finally {
        setIsLoadingTest(false);
      }
    };

    void loadTest();
  }, [selectedCourse]);

  // ---------- Timer (runs only after a course+test is loaded and until complete) ----------
  useEffect(() => {
    if (!selectedCourse) return;
    if (!testId) return;
    if (isComplete) return;
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCourse, testId, isComplete, timeRemaining]);

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
      if (!testId || questions.length === 0) {
        console.error('Cannot submit: missing testId or questions.');
        setIsComplete(true);
        return;
      }

      // Scoring model: each question yields 1..4 points based on selected option index (0..3)
      // This matches your earlier heuristic and maps well to Supabase fields score/max_score/percentage.
      let totalPoints = 0;
      questions.forEach((_q, index) => {
        if (answers[index] !== undefined) totalPoints += answers[index] + 1; // 1..4
      });

      const maxScore = questions.length * 4; // 20 * 4 = 80 typical
      const pct = maxScore > 0 ? Math.round((totalPoints / maxScore) * 10000) / 100 : 0;

      setPercentageScore(pct);

      // Save to Supabase
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user) {
        const { error } = await supabase.from('diagnostic_results').insert({
          user_id: user.id,
          test_id: testId,
          score: totalPoints,
          max_score: maxScore,
          percentage: pct,
          answers: answers,
          completed_at: new Date().toISOString(),
          time_taken: durationSeconds - timeRemaining,
        });

        if (error) {
          console.error('Error saving diagnostic results:', error);
        }
      }

      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
      setIsComplete(true);
    } finally {
      setIsSaving(false);
    }
  };

  // ---------- Hydration gate ----------
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // ---------- Course selection screen ----------
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

  // ---------- Loading test screen ----------
  if (selectedCourse && !isComplete && (isLoadingTest || !testId)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl p-10 border border-slate-100 text-center">
          <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={32} />
          <p className="font-bold text-slate-700">
            {language === 'fr' ? 'Chargement du diagnostic…' : 'Loading diagnostic…'}
          </p>
          <p className="text-slate-500 text-sm mt-2">
            {language === 'fr'
              ? 'Nous préparons vos 20 questions (30 minutes).'
              : 'Preparing your 20-question test (30 minutes).'}
          </p>
        </div>
      </div>
    );
  }

  // ---------- Results screen ----------
  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-100">
          <CheckCircle size={60} className="mx-auto text-green-500 mb-6" />
          <h2 className="text-5xl font-black mb-2 text-slate-900">{percentageScore}%</h2>

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

  // ---------- Main diagnostic screen ----------
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
          <h2 className="text-2xl font-black mb-8 text-slate-900">
            {language === 'fr' ? currentQ.question_fr : currentQ.question_en}
          </h2>

          <div className="grid gap-4 mb-8">
            {(currentQ.options || []).map((opt: any, index: number) => (
              <button
                key={opt.key ?? index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-6 border-2 rounded-2xl transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-100 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold text-slate-900">
                  {language === 'fr' ? opt.text_fr : opt.text_en}
                </span>
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
