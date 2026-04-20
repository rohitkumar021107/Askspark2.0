import { motion } from 'motion/react';
import { ArrowRight, HelpCircle, CheckCircle2, Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="glass-badge mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Confidence starts here</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-10 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Ask</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Get Answers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Build Confidence</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <button onClick={() => navigate('/ask')} className="btn-gradient px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-200/50 flex items-center justify-center gap-3 group">
                Submit a Doubt 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-secondary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest">
                Join as Teacher
              </button>

              <button className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-indigo-600 transition-colors py-2">
                I am a Student
              </button>
            </div>
          </motion.div>

          {/* Right Side: Dashboard Style Grid */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="grid grid-cols-2 gap-4"
          >
            <button onClick={() => navigate('/ask')} className="glass-card glass-card-hover p-8 h-48 flex flex-col justify-between text-left group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Ask Anonymously</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Remove fear of judgment completely and learn freely.</p>
              </div>
            </button>
            
            <button onClick={() => navigate('/live')} className="glass-card glass-card-hover p-8 h-48 flex flex-col justify-between text-left group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Live Classes</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Expert support in real-time from verified educators.</p>
              </div>
            </button>

            <button onClick={() => navigate('/search')} className="glass-card glass-card-hover p-8 h-44 flex flex-col justify-between text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Search Doubts</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Find answers from our database of 10k+ solved doubts.</p>
              </div>
            </button>

            <button onClick={() => navigate('/chat')} className="glass-card glass-card-hover p-8 h-44 flex flex-col justify-between text-left group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Chat Support</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct message mentors for quick troubleshooting.</p>
              </div>
            </button>

            <div className="col-span-2 bg-slate-900 p-10 rounded-[32px] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4">Our Mission</h4>
                <p className="text-white/90 text-xl md:text-2xl leading-snug font-medium italic">
                  "Building the future of fearless learning where every question matters and every student thrives."
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-white/20"></div>
                  <span className="text-white/40 text-[10px] font-bold tracking-widest">EST. 2024</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl group-hover:scale-125 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
