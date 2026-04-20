import { motion } from 'motion/react';
import { AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export default function ProblemSolution() {
  const points = [
    {
      title: "The Problem",
      desc: "Fear of judgment stops students from asking critical questions.",
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "Our Solution",
      desc: "Anonymity gives students the freedom to ask anything safely.",
      icon: ShieldCheck,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Simple Learning",
      desc: "Streamlined platform for focused learning and confidence.",
      icon: Zap,
      color: "bg-blue-500/10 text-blue-600",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Breaking the Barrier of <span className="text-gradient">Silence</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            We believe no doubt is too small and no student should feel hesitant to learn.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card p-10 flex flex-col items-start gap-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${point.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <point.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{point.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
