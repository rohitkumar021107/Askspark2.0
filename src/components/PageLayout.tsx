import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate('/')}
            className="p-3 glass-card glass-card-hover rounded-2xl text-slate-600 hover:text-indigo-600 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">{title}</h1>
        </div>

        <div className="glass-card p-8 md:p-12">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
