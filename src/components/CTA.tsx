import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative group">
        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] -z-10 animate-pulse" />
        
        <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden bg-white/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="glass-badge mb-8 px-6 py-2 bg-indigo-600/5 border-indigo-100 shadow-none hover:bg-indigo-600 hover:text-white transition-all cursor-default">
              <span className="text-[10px] font-black uppercase tracking-widest ">Final Step</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
              Start your journey <br /><span className="text-gradient">today.</span>
            </h2>
            
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Join students who are already using AskSpark to transform hesitation into mastery.
            </p>
            
            <button className="btn-gradient px-12 py-5 rounded-2xl text-lg flex items-center gap-4 mx-auto shadow-2xl hover:-translate-y-1 transition-transform group">
              Submit a Doubt 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
