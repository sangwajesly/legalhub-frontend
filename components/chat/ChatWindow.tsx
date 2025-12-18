'use client';

import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Bot } from 'lucide-react';
import { UserNav } from '@/components/shared/UserNav';

interface ChatWindowProps {
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
  }>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-teal-400">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Legal Assistant</h2>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* User Navigation */}
        <div className="flex items-center gap-4">
           <UserNav />
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-10 scroll-smooth custom-scrollbar"
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center mt-20 animate-fade-in">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-3xl flex items-center justify-center text-blue-600 dark:text-teal-400 mb-8 shadow-inner">
                <Bot size={40} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-4">
                How can I help you today?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-12 leading-relaxed">
                Ask me anything about land disputes, contract reviews, or general legal guidance in West Africa.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                {[
                  'How do I register a business in Ghana?',
                  'What are my rights as a tenant in Lagos?',
                  'Help me review a employment contract',
                  'Explain land ownership laws'
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    className="p-4 text-left text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-lg transition-all text-slate-700 dark:text-slate-300 group"
                  >
                    "{suggestion}"
                    <span className="block mt-2 text-[10px] text-blue-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">Try this →</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                messageIndex={idx}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};