import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { useParams } from 'react-router-dom';
import { getDoubts, updateDoubt, incrementViewScore } from '../store';
import { Doubt, Answer, Teacher } from '../types';
import { MessageSquare, User, Clock, Send, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { TeacherProfileModal } from '../components/TeacherProfileModal';

const MOCK_TEACHER: Teacher = {
  id: 't1',
  name: 'Dr. Sarah Spark',
  photo: 'https://picsum.photos/seed/teacher-sarah/200/200',
  expertise: ['Physics', 'Quantum Mechanics', 'Problem Solving'],
  bio: 'A passionate educator with over 10 years of experience in simplifying complex physics concepts for students. I believe every doubt is a stepping stone to mastery.',
  rating: 4.9
};

export default function DoubtDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  useEffect(() => {
    const allDoubts = getDoubts();
    const found = allDoubts.find(d => d.id === id);
    if (found) {
      setDoubt(found);
      // Increment score for viewing answer if it's already answered
      if (found.status === 'Answered') {
        incrementViewScore();
      }
    }
  }, [id]);

  const handleTeacherReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !doubt) return;

    setIsReplying(true);
    
    // Simulate teacher delay
    setTimeout(() => {
      const newAnswer: Answer = {
        id: Math.random().toString(36).substr(2, 9),
        content: replyText,
        teacher: MOCK_TEACHER,
        teacherName: MOCK_TEACHER.name,
        timestamp: new Date().toISOString()
      };

      const updatedDoubt: Doubt = {
        ...doubt,
        status: 'Answered',
        answer: newAnswer
      };

      updateDoubt(updatedDoubt);
      setDoubt(updatedDoubt);
      setReplyText('');
      setIsReplying(false);
      incrementViewScore(); // Bonus for getting an answer
    }, 1000);
  };

  if (!doubt) return <PageLayout title="Doubt Not Found"><p>We couldn't find the doubt you're looking for.</p></PageLayout>;

  return (
    <PageLayout title="Doubt Discussion">
      <div className="space-y-12">
        {/* Question Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="glass-badge bg-amber-500/10 text-amber-600 border-amber-100 uppercase text-[10px] tracking-widest font-black">Question</span>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              {new Date(doubt.timestamp).toLocaleString()}
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 leading-tight">{doubt.question}</h2>
          
          <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
             <p className="text-slate-600 font-medium leading-relaxed italic">"{doubt.description || 'No additional description provided.'}"</p>
          </div>

          {doubt.image && (
            <div className="rounded-[40px] overflow-hidden border-4 border-white shadow-2xl inline-block max-w-full">
              <img 
                src={doubt.image} 
                alt="Doubt attachment" 
                className="max-h-[500px] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Answer Section */}
        <div className="pt-12 border-t border-slate-100 space-y-8">
          <div className="flex items-center gap-2 mb-6">
             <MessageSquare className="w-5 h-5 text-indigo-600" />
             <h3 className="text-xl font-black text-slate-900 tracking-tight">Mentor Response</h3>
          </div>

          {doubt.answer ? (
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-10 relative overflow-hidden bg-indigo-600/5 border-indigo-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => setIsTeacherModalOpen(true)}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity group"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative">
                      <img 
                        src={doubt.answer.teacher?.photo || 'https://picsum.photos/seed/mentor/100/100'} 
                        alt={doubt.answer.teacherName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-slate-900 flex items-center gap-2">
                        {doubt.answer.teacherName}
                        <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Verified Mentor</p>
                    </div>
                  </button>

                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Answered on {new Date(doubt.answer.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="pl-6 border-l-4 border-indigo-200">
                  <p className="text-slate-700 font-medium text-lg leading-relaxed whitespace-pre-wrap">{doubt.answer.content}</p>
                </div>
              </motion.div>

              {/* Related Teacher Modal */}
              {doubt.answer.teacher && (
                <TeacherProfileModal 
                  teacher={doubt.answer.teacher} 
                  isOpen={isTeacherModalOpen} 
                  onClose={() => setIsTeacherModalOpen(false)} 
                />
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-4 animate-pulse" />
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Waiting for a mentor to reply...</p>
            </div>
          )}
        </div>

        {/* Demo Teacher Reply Section */}
        {!doubt.answer && (
          <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl">
            <h4 className="text-white font-black text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Teacher Portal (Demo Mode)
            </h4>
            <form onSubmit={handleTeacherReply} className="space-y-6">
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Provide a detailed explanation or solution..."
                className="w-full min-h-[120px] p-6 bg-white/10 border border-white/20 rounded-3xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium resize-none shadow-inner"
              />
              <button 
                disabled={isReplying || !replyText.trim()}
                className="btn-gradient w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isReplying ? <span className="flex items-center gap-2"><Clock className="w-4 h-4 animate-spin" /> Replying...</span> : <><Send className="w-4 h-4" /> Send Teacher Response</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
