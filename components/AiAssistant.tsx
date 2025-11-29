
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant FC. Je peux répondre à vos questions sur le prix, la roadmap ou comment acheter.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Casting motion.div to any to resolve TypeScript errors with current framer-motion types configuration
  const MotionDiv = motion.div as any;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(userMsg, history);

    setMessages(prev => [...prev, { role: 'model', text: response || "Erreur de connexion." }]);
    setIsLoading(false);
  };

  const suggestions = [
    "💰 Prix actuel du FC ?",
    "📈 Comment acheter ?",
    "🗺️ Voir la Roadmap",
    "🛡️ Le projet est-il sûr ?"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:scale-105 hover:rotate-12 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[380px] bg-slate-950/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[550px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 flex justify-between items-center border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                   <h3 className="font-bold text-white text-sm font-serif">Assistant Officiel</h3>
                   <div className="flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                     <span className="text-[10px] text-blue-200 uppercase tracking-wider">En ligne</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-900/20' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-black/20'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-xs text-slate-400 font-medium animate-pulse">L'IA réfléchit...</span>
                  </div>
                </div>
              )}

              {/* Suggestions (Only show if few messages) */}
              {messages.length < 3 && !isLoading && (
                <div className="flex flex-col gap-2 mt-4 animate-fade-in">
                   <p className="text-xs text-slate-500 font-medium ml-1 mb-1 uppercase tracking-wide">Suggestions</p>
                   <div className="flex flex-wrap gap-2">
                      {suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => handleSend(s)}
                          className="text-xs bg-slate-800/80 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/50 border border-slate-700 text-slate-300 px-3 py-2 rounded-full transition-all duration-200 text-left flex items-center gap-2 group"
                        >
                          {s}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                        </button>
                      ))}
                   </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 shadow-inner"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white p-2 rounded-lg transition-all duration-200 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-3 opacity-50">
                 <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Propulsé par Gemini AI
                 </span>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
