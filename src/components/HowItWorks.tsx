import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Ask your doubt",
      desc: "Type your question anonymously. No fear."
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Categorization for routing to experts."
    },
    {
      num: "03",
      title: "Teacher Answers",
      desc: "Detailed explanations from educators."
    },
    {
      num: "04",
      title: "Active Learning",
      desc: "Engage and browse similar topics."
    },
    {
      num: "05",
      title: "Growing Confidence",
      desc: "Mastery replaces hesitation."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Your Path to <span className="text-gradient">Mastery</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Five simple steps from a nagging doubt to total confidence.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[1px] bg-indigo-100 -z-0" />
          
          <div className="grid lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left flex flex-col items-center lg:items-start"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center mb-8 shadow-xl shadow-indigo-100 relative z-20">
                   <span className="text-indigo-600 font-black font-display">{step.num}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
