import React, { useState, useRef } from 'react';
import PageLayout from '../components/PageLayout';
import { SendIcon, Camera, X, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveDoubt } from '../store';
import { Doubt } from '../types';

export default function AskPage() {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please type your question clearly.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDoubt: Doubt = {
        id: Math.random().toString(36).substr(2, 9),
        question,
        description,
        image,
        timestamp: new Date().toISOString(),
        status: 'Pending'
      };

      saveDoubt(newDoubt);

      setIsSuccess(true);
      setQuestion('');
      setDescription('');
      setImage(null);
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Ask Your Doubt">
      <div className="relative">
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-6 left-0 right-0 z-20 flex justify-center"
            >
              <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                Your doubt has been submitted successfully!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-8">
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Ask your question anonymously. Our experts and AI will help you get clear answers as quickly as possible.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">The Core Question</label>
              <input 
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question clearly..."
                className={`w-full p-6 bg-slate-50 border ${error && !question ? 'border-red-200 ring-4 ring-red-500/5' : 'border-slate-100'} rounded-3xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all font-bold text-lg`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Explain your problem</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details, mention what you've tried, or explain your confusion..."
                className="w-full min-h-[160px] p-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all font-medium resize-none shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Attachments (Optional)</label>
              <div className="flex flex-wrap gap-4 items-start">
                {!image ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-200 rounded-[28px] text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group active:scale-95"
                  >
                    <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Add Photo</span>
                  </button>
                ) : (
                  <div className="relative group w-40 h-40">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-[28px] border-2 border-white shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-3 -right-3 p-2 bg-slate-900 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-bold animate-pulse">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-8 border-t border-slate-100">
            <div className="flex items-center gap-4 px-6 py-4 bg-indigo-500/5 rounded-2xl border border-indigo-100">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <p className="text-xs text-indigo-700 font-bold italic">
                Your identity is 100% anonymous.
              </p>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`btn-gradient min-w-[200px] py-5 px-12 flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Doubt...
                </>
              ) : (
                <>
                  Submit Doubt <SendIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
