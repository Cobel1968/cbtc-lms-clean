import { useLanguage as use_language } from '@/app/contexts/LanguageContext';
import { Zap, Calendar, TrendingDown } from 'lucide-react';

interface progress_props {
  standard_weeks: number;
  days_saved: number; // This comes from vocational_assessments.suggested_timeframe_adjustment
  completion_percentage: number;
}

export default function ProgressForecasting({ standard_weeks, days_saved, completion_percentage }: progress_props) {
  const { language } = use_language();
  
  const total_days = standard_weeks * 7;
  // Ensure we don't show a negative number if no days are saved yet
  const optimized_days = total_days - Math.abs(days_saved || 0);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-400" size={24} fill="currentColor" />
            {language === 'fr' ? 'Optimisation Temporelle' : 'Temporal Optimization'}
          </h3>
          <p className="text-blue-200 text-sm">
            {language === 'fr' ? 'Analyse de fluidité bilingue appliquée' : 'Bilingual fluency analysis applied'}
          </p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
          <span className="text-2xl font-black text-yellow-400">-{Math.abs(days_saved || 0)}</span>
          <span className="ml-1 text-xs uppercase font-bold">{language === 'fr' ? 'Jours' : 'Days'}</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-blue-300">
            <span>{language === 'fr' ? 'Progression du Curriculum' : 'Curriculum Progress'}</span>
            <span>{completion_percentage}%</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              style={{ width: `${completion_percentage}%` }}
            />
          </div>
        </div>

        {/* Milestone Comparison */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <Calendar className="text-blue-300 mb-2" size={20} />
            <div className="text-xs text-blue-300 uppercase">{language === 'fr' ? 'Parcours Standard' : 'Standard Path'}</div>
            <div className="text-lg font-bold tracking-tight">{total_days} {language === 'fr' ? 'Jours' : 'Days'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
            <TrendingDown className="text-yellow-400 mb-2" size={20} />
            <div className="text-xs text-yellow-400 uppercase">{language === 'fr' ? 'Parcours Optimisé' : 'Optimized Path'}</div>
            <div className="text-lg font-bold text-yellow-400 tracking-tight">{optimized_days} {language === 'fr' ? 'Jours' : 'Days'}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-blue-300 italic opacity-80">
          {language === 'fr' 
            ? "* Prédiction basée sur l'analyse de vos évaluations manuscrites." 
            : "* Prediction based on the analysis of your handwritten assessments."}
        </p>
      </div>
    </div>
  );
}