'use client';
export const dynamic = 'force-dynamic';
export default function admin_loading() {
  return (
    <div className="p-8 lg:p-12 space-y-10 lowercase">
      {/* skeleton header */}
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 bg-slate-100 rounded-xl" />
        <div className="h-4 w-96 bg-slate-50 rounded-lg" />
      </div>

      {/* skeleton grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-50 rounded-[40px] p-8 h-64 animate-pulse space-y-6">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100 rounded-lg" />
              <div className="h-4 w-2/3 bg-slate-50 rounded-lg" />
            </div>
            <div className="pt-4 flex gap-2">
              <div className="h-8 w-20 bg-slate-100 rounded-full" />
              <div className="h-8 w-20 bg-slate-50 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-12">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 animate-bounce">
          syncing cobel engine...
        </p>
      </div>
    </div>
  );
}
