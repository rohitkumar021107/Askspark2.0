import { motion } from 'motion/react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Team() {
  const members = [
    {
      name: "Rohit Kumar",
      role: "Founder",
      desc: "Visionary behind AskSpark, focused on student innovation.",
      image: "RK"
    },
    {
      name: "P. Rohit",
      role: "Developer",
      desc: "Full-stack enthusiast crafting seamless experiences.",
      image: "PR"
    },
    {
      name: "Nehal",
      role: "Product Designer",
      desc: "Creative mind shaping the premium look and feel.",
      image: "NH"
    },
    {
      name: "K. Hemanth",
      role: "Backend Developer",
      desc: "Architecting the engines that process knowledge.",
      image: "KH"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Our <span className="text-gradient">Team</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            EEE students on a mission to build the future of fearless learning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card glass-card-hover p-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 overflow-hidden border-2 border-white shadow-inner group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold text-indigo-600 font-display">{member.image}</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-1">{member.name}</h3>
              <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">{member.desc}</p>
              
              <div className="flex gap-4 mt-auto">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-4 h-4" /></button>
                <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Github className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
