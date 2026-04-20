import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Story() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <div className="glass-badge mb-8 px-6 py-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Our Story</span>
          </div>
          
          <div className="space-y-8 text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
            <p>
              AskSpark started as a college project by <span className="text-slate-900 font-black">EEE students</span> who saw friends hesitate to speak up.
            </p>
            
            <p>
              We saw talented students hesitate due to <span className="text-gradient font-black underline decoration-indigo-200 underline-offset-8">fear of judgment</span>.
            </p>
            
            <p>
              So we built the future of <span className="text-indigo-600 font-bold">fearless learning</span>, where every doubt is a step toward confidence.
            </p>
          </div>

          <div className="mt-16 glass-card p-1">
             <div className="bg-slate-900 rounded-[22px] px-8 py-12 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-400 mb-6">Our Mission</p>
                <p className="text-2xl md:text-4xl font-black leading-tight italic">
                  "Build confidence through fearless learning."
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
