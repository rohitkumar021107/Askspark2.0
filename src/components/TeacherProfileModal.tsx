import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Verified, GraduationCap } from 'lucide-react';
import { Teacher } from '../types';

interface TeacherModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherProfileModal({ teacher, isOpen, onClose }: TeacherModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full overflow-hidden relative shadow-2xl border-white/50"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100/50 hover:bg-slate-200/50 text-slate-500 hover:text-slate-700 transition-all z-10 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Background Gradient */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 absolute top-0 left-0 right-0" />

              <div className="p-8 pt-16 relative flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white border-2 border-white shadow-lg z-20">
                    <Verified className="w-4 h-4" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center space-y-2 mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{teacher.name}</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600">Verified Mentor & Educator</p>
                  
                  <div className="flex items-center justify-center gap-1 text-amber-500 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 'fill-amber-500' : 'text-slate-200'}`} />
                    ))}
                    <span className="text-xs font-black text-slate-400 ml-1">{teacher.rating} Rating</span>
                  </div>
                </div>

                {/* Expertise */}
                <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-800">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-sm">Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {teacher.expertise.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="w-full p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 mb-8">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "{teacher.bio}"
                  </p>
                </div>

                {/* Action */}
                <button 
                  onClick={onClose}
                  className="btn-gradient w-full py-4 text-xs font-black uppercase tracking-widest"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
