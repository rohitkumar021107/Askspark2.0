import { motion } from 'motion/react';
import { MessageSquarePlus, Users2, BarChart3, HeartHandshake, ArrowRight } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Ask Questions",
      desc: "Instant anonymous doubt submission. Get clarity without judgmental pressure.",
      icon: MessageSquarePlus,
      gradient: "from-blue-500/10 to-indigo-500/10",
      colorIcon: "text-blue-600"
    },
    {
      title: "Learn Together",
      desc: "Benefit from doubts asked by peers. A collective hub for growth.",
      icon: Users2,
      gradient: "from-indigo-500/10 to-purple-500/10",
      colorIcon: "text-indigo-600"
    },
    {
      title: "Track Progress",
      desc: "Visualize your journey and identify areas where you've grown strong.",
      icon: BarChart3,
      gradient: "from-purple-500/10 to-violet-500/10",
      colorIcon: "text-purple-600"
    },
    {
      title: "Build Confidence",
      desc: "Transform hesitation into mastery through expert feedback loop.",
      icon: HeartHandshake,
      gradient: "from-violet-500/10 to-blue-500/10",
      colorIcon: "text-violet-600"
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Designed for <span className="text-gradient">Modern Learners</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Empowering features to make learning seamless, fast, and focused.
            </p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap group">
            Explore All Features <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover p-8 group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`relative z-10 ${feature.colorIcon} mb-6`}>
                <feature.icon className="w-10 h-10" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
