import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px] font-black">Home</Link>
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px] font-black">Dashboard</Link>
            <Link to="/search" className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px] font-black">Search</Link>
            <Link to="/live" className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px] font-black">Live Class</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/chat" className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-indigo-600 transition-colors">
              Support
            </Link>
            <Link to="/ask" className="btn-gradient px-7 py-3 text-[11px] uppercase tracking-widest">
              Ask Doubt
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all active:scale-90"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-nav absolute top-20 left-0 right-0 border-b border-indigo-50 px-6 py-8 space-y-6 flex flex-col font-black uppercase tracking-widest text-[10px]"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600">Home</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600">Dashboard</Link>
          <Link to="/search" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600">Search</Link>
          <Link to="/live" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-indigo-600">Live Class</Link>
          <div className="pt-4 flex flex-col gap-4">
            <Link to="/ask" onClick={() => setIsOpen(false)} className="btn-gradient w-full py-4 text-center">
              Ask Doubt
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
