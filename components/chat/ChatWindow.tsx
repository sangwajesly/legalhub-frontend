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
  isLoading?: boolean;
  onSendMessage?: (message: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-20">
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
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scroll-smooth custom-scrollbar pb-60"
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center mt-12 animate-fade-in">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-teal-400 mb-6 shadow-inner">
                <Bot size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white mb-3">
                How can I help you today?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed">
                Ask me anything about land disputes, contract reviews, or general legal guidance in West Africa.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                {[
                  'How do I register a business in Douala?',
                  'What are my tenant rights in Yaoundé?',
                  'Review employment contract for Cameroon',
                  'Explain land title procedure in Cameroon'
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage?.(suggestion)}
                    disabled={isLoading}
                    className="p-4 text-left text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-lg transition-all text-slate-700 dark:text-slate-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    "{suggestion}"
                    <span className="block mt-2 text-[10px] text-blue-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">Try this →</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;