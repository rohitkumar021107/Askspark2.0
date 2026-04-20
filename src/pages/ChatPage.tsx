import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { SendIcon, Loader2, User, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: "Hello! I'm Sparky, your AskSpark assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemInstruction = 
        "You are Sparky, the friendly AI assistant for AskSpark, an eLearning platform focused on fearless, anonymous doubt solving. " +
        "Answer platform-related questions (e.g. how to ask a doubt, live class schedules, search features). " +
        "Be concise and supportive. If the user asks for complex academic help or specifically asks for a human mentor, " +
        "tell them you can help, but they can also click the 'Talk to a Mentor' button if they need personalized guidance.";

      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${chatHistory}\nUser: ${input}`,
        config: {
          systemInstruction,
        }
      });

      const botMessage: Message = {
        role: 'bot',
        content: response.text || "I'm having trouble connecting to my spark right now. Please try again soon!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Gemini Error:", err);
      const errorMessage: Message = {
        role: 'bot',
        content: "Oops! I encountered an error. Would you like to escalate this to a human mentor?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalate = () => {
    setIsEscalated(true);
    const escalationMessage: Message = {
      role: 'bot',
      content: "I've placed you in the priority queue for a human mentor. A expert teacher will be with you shortly!",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, escalationMessage]);
  };

  return (
    <PageLayout title="Support Chat">
      <div className="flex flex-col h-[600px]">
        {/* Header/Status */}
        <div className="flex items-center justify-between px-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Sparky AI</h3>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Online & Ready</p>
            </div>
          </div>
          
          <button 
            onClick={handleEscalate}
            disabled={isEscalated}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${
              isEscalated 
                ? 'bg-emerald-50 text-emerald-600 cursor-default border border-emerald-100' 
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:-translate-y-0.5 border border-indigo-100'
            }`}
          >
            {isEscalated ? (
              <><CheckCircle2 className="w-4 h-4" /> Mentor Queued</>
            ) : (
              <><UserPlus className="w-4 h-4" /> Talk to a Mentor</>
            )}
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 items-center text-slate-400">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-bold italic tracking-wider">Sparky is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer/Input */}
        <div className="pt-6 border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Sparky something about AskSpark..."
              disabled={isLoading || isEscalated}
              className="w-full p-6 pr-16 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-300"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading || isEscalated}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 enabled:hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
          <p className="mt-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
            {isEscalated ? "You are connected to the mentor queue" : "AI Assistant Powered by Gemini 3 Flash"}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

