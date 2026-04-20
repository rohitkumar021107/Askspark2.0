import PageLayout from '../components/PageLayout';
import { SearchIcon, History } from 'lucide-react';

export default function SearchPage() {
  const trending = ["Calculus limits", "Chemical bonding", "Modern History", "Quantum Physics"];

  return (
    <PageLayout title="Search Doubts">
      <div className="space-y-10">
        <div className="relative">
          <textarea 
            placeholder="Search for questions asked by others..."
            className="w-full min-h-[80px] p-8 pr-16 bg-slate-50 border border-slate-100 rounded-[32px] text-lg text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all font-medium resize-none shadow-inner"
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-slate-800 hover:-translate-y-[calc(50%+2px)] active:scale-90 transition-all">
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4" /> Trending Doubts
            </h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase hover:text-indigo-700 transition-colors active:scale-95">Clear</button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {trending.map((t, idx) => (
              <button 
                key={idx}
                className="px-6 py-3 bg-white border border-slate-100 rounded-full text-sm font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm active:scale-95 hover:-translate-y-0.5"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex items-center justify-center">
           <p className="text-sm text-slate-400 font-medium italic">
             Over 10,000+ doubts solved by our community.
           </p>
        </div>
      </div>
    </PageLayout>
  );
}
