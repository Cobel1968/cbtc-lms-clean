import { createClient } from '@/utils/supabase/server';
import { 
  FlaskConical, 
  Languages, 
  FileCheck, 
  ExternalLink,
  Search
} from 'lucide-react';

export default async function FluencyLabs() {
  const supabase = createClient();

  // Fetch the latest physical assessments synced via Feature 4
  const { data: assessments } = await supabase
    .from('vocational_assessments')
    .select(`
      *,
      profiles:user_id (email, vocational_track)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      
      {/* Header: Analytical Deep-Dive */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            fluency <span className="text-indigo-600">labs</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 italic">bilingual vocational mapping audit: analog-to-digital bridge</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="search technical terms..." 
            className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm"
          />
        </div>
      </header>

      {/* Lab Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-600 p-6 rounded-[32px] text-white">
          <FlaskConical size={20} className="mb-4 opacity-50" />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">mapped terms</p>
          <h4 className="text-2xl font-black italic">1,240</h4>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <Languages size={20} className="mb-4 text-indigo-600" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">avg fluency</p>
          <h4 className="text-2xl font-black text-slate-900 italic">84.2%</h4>
        </div>
      </div>

      {/* Assessment Feed */}
      <div className="space-y-4">
        {assessments?.map((item) => (
          <div key={item.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm group hover:border-indigo-500 transition-all duration-500">
            <div className="flex flex-wrap lg:flex-nowrap gap-8">
              
              {/* Image Preview (The Analog Input) */}
              <div className="w-full lg:w-48 h-48 bg-slate-100 rounded-[32px] overflow-hidden relative border border-slate-50 shadow-inner">
                {item.image_url ? (
                  <img src={item.image_url} alt="Assessment" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300 italic text-[10px] font-bold">no image data</div>
                )}
                <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-xl text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} />
                </div>
              </div>

              {/* Data Extraction Analysis */}
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-slate-900 text-lg leading-tight uppercase tracking-tighter italic">
                      {item.profiles?.email}
                    </h4>
                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">
                      {item.profiles?.vocational_track || 'electrical track'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">fluency impact</span>
                    <span className="text-2xl font-black text-emerald-500 italic">+{item.bilingual_fluency_score}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                  {/* French Extraction */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FileCheck size={12} className="text-indigo-400" /> detected (fr)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.detected_technical_terms_fr?.map((term: string) => (
                        <span key={term} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100 uppercase tracking-tight">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* English Mapping */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Languages size={12} className="text-emerald-400" /> mapped (en)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.detected_technical_terms_en?.map((term: string) => (
                        <span key={term} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase tracking-tight">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}