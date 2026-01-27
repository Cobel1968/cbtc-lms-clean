import CourseCard from '@/components/CourseCard';
import { translations } from '@/lib/translations';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Training Portal
          </h1>
          <p className="text-slate-500 font-medium">Cobel AI Engine: Adaptive Learning Stream</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CourseCard 
            title="Survival English" 
            category="Vocational" 
            href="/courses/vocational/Survival_English_Trade_Travel.html"
            description="Essential trade and travel communication for French professionals."
          />
          <CourseCard 
            title="Oil & Gas" 
            category="Technical" 
            href="/courses/vocational/Oil_Gas_Communication.html"
            description="Bilingual safety and technical reporting for energy sector workers."
          />
          <CourseCard 
            title="Quality Assurance" 
            category="Manufacturing" 
            href="/courses/vocational/quality-assurance-english.html"
            description="Standardization and compliance terminology in English."
          />
        </div>
      </div>
    </div>
  );
}
