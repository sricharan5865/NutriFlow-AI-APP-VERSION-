import React, { useState, useRef, useEffect } from 'react';
import { getLocalBotResponse } from '../services/localBotService';
import { AppState } from '../types';
import { IconSparkles } from './ui/Icons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const Assistant: React.FC<{ state: AppState }> = ({ state }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm NutriBot. I'm here to help you stay on track with your health goals. Ask me about your stats, nutrition tips, or workout advice!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Get response from local bot service
      const today = new Date().toISOString().split('T')[0];
      const todayMeals = state.meals.filter(m => m.date === today);

      const response = await getLocalBotResponse(text, state.profile, todayMeals);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Bot Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm having a little trouble thinking right now. Could you ask again?"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-emerald-100 overflow-hidden relative">
      <div className="p-8 border-b bg-white flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/30">N</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="font-extrabold text-xl tracking-tight text-slate-900">NutriBot Assistant</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Always Online</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-2`}>
              <div className={`p-6 rounded-[2.5rem] shadow-sm text-sm leading-relaxed ${m.role === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-white text-slate-700 font-medium rounded-tl-none border border-emerald-100'
                }`}>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-[2rem] border border-emerald-50 flex items-center space-x-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex space-x-4 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about protein, calories, or workouts..."
            className="flex-1 p-5 rounded-[1.5rem] border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 bg-slate-50 text-slate-900 font-medium transition-all"
          />
          <button
            disabled={loading || !input.trim()}
            className="bg-emerald-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 disabled:opacity-50"
          >
            <IconSparkles />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
