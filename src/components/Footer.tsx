import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-t border-white -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8 text-sm font-medium">
              Empowering students to ask doubts without fear and building real-world confidence through accessible, anonymous, and expert-led learning.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 rounded-xl border border-white/60 bg-white/40 hover:bg-white transition-all text-slate-400 hover:text-indigo-600 shadow-sm"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2.5 rounded-xl border border-white/60 bg-white/40 hover:bg-white transition-all text-slate-400 hover:text-indigo-600 shadow-sm"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2.5 rounded-xl border border-white/60 bg-white/40 hover:bg-white transition-all text-slate-400 hover:text-indigo-600 shadow-sm"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/ask" className="hover:text-indigo-600 transition-colors">Ask Doubt</Link></li>
              <li><Link to="/search" className="hover:text-indigo-600 transition-colors">Search Doubts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-slate-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Company</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 AskSpark. Established by EEE Students.
          </p>
          <div className="bg-indigo-600/5 px-6 py-4 rounded-2xl border border-indigo-100 flex items-center gap-8 shadow-sm">
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Confidence Score</span>
              <span className="text-xs font-bold text-slate-700">Track your progress</span>
            </div>
            <Link to="/dashboard" className="px-5 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-black text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
