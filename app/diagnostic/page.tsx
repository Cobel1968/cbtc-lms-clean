'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import supabase from '@/lib/supabaseClient';
import { useLanguage } from '@/app/contexts/languagecontext';
import { coursesData } from '@/lib/coursesData';

interface Question {
  id: string;
  question: { fr: string; en: string };
  options: { fr: string; en: string }[];
  correctAnswer: number;
}

export default function DiagnosticPage() {
  const { language, isMounted } = useLanguage();
  const router = useRouter();

  const [selectedCourse, setSelectedCourse] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: '1',
      question: {
        fr: 'ExpÃ©rience technique prÃ©alable ?',
        en: 'Prior technical experience?'
      },
      options: [
        { fr: 'Aucune', en: 'None' },
        { fr: 'DÃ©butant', en: 'Beginner' },
        { fr: 'IntermÃ©diaire', en: 'Intermediate' },
        { fr: 'AvancÃ©', en: 'Advanced' }
      ],
      correctAnswer: 0
    },
    {
      id: '2',
      question: {
        fr: 'MaÃ®trise de la terminologie technique bilingue ?',
        en: 'Mastery of bilingual technical terminology?'
      },
      options: [
        { fr: 'Faible', en: 'Low' },
        { fr: 'Moyenne', en: 'Average' },
        { fr: 'Bonne', en: 'Good' },
        { fr: 'Excellente', en: 'Excellent' }
      ],
      correctAnswer: 0
    }
  ];

  useEffect(() => {
    if (!isComplete && timeRemaining > 0 && selectedCourse) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isComplete, selectedCourse]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    
    try {
      // Calculate score
      let totalPoints = 0;
      questions.forEach((question, index) => {
        if (answers[index] !== undefined) {
          totalPoints += (answers[index] + 1);
        }
      });
      
      const calculatedScore = Math.round((totalPoints / (questions.length * 4)) * 100);
      setScore(calculatedScore);

      // Save to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('diagnostic_results')
          .insert({
            user_id: user.id,
            course_id: selectedCourse,
            score: calculatedScore,
            answers: answers,
            completed_at: new Date().toISOString()
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // Course selection screen
  if (!selectedCourse && !isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
        <div className="max-w-xl w-full bg-white rounded-[40px] shadow-xl p-10 border border-slate-100">
          <h1 className="text-2xl font-black mb-8 uppercase italic tracking-tighter text-slate-900">
            {language === 'fr' ? 'SÃ©lectionner le Domaine' : 'Select Vocational Domain'}
          </h1>
          <div className="grid gap-3">
            {coursesData.map((course: any) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className="w-full text-left p-6 border-2 border-slate-50 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-slate-900">
                  {course.name[language]}
                </span>
                <ArrowRight
                  className="text-slate-300 group-hover:text-indigo-600 transition-colors"
                  size={20}
                />
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
            {language === 'fr' ? 'Parcours Cobel AI CartographiÃ©' : 'Cobel AI Path Mapped'}
          </p>
          <Link
            href="/dashboard"
            className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all"
          >
            {language === 'fr' ? 'AccÃ©der au Tableau de Bord' : 'Enter Dashboard'}
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
            {language === 'fr' ? 'Ã‰tape' : 'Step'} {currentQuestion + 1} / {questions.length}
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
            {currentQ.question[language]}
          </h2>

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
                <span className="font-bold text-slate-900">
                  {option[language]}
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
