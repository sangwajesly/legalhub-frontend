'use client';

import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { PanelLeft, Plus } from 'lucide-react';
import { UserNav } from '@/components/shared/UserNav';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';

interface ChatWindowProps {
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
  }>;
  isLoading?: boolean;
  onSendMessage?: (message: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onNewChat?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSendMessage,
  isSidebarOpen = true,
  onToggleSidebar,
  onNewChat,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestions = [
    {
      label: 'What fundamental rights does the Cameroon Constitution guarantee?',
      query: 'What are the fundamental rights and freedoms guaranteed under the Constitution of Cameroon?',
    },
    {
      label: 'What rights do I have if I am arrested or detained?',
      query: 'What are the rights of an accused person during arrest and police custody under the Cameroonian Criminal Procedure Code?',
    },
    {
      label: 'What are the requirements to stand as a presidential candidate?',
      query: 'What are the eligibility conditions to be a candidate in presidential elections under the Electoral Code of Cameroon?',
    },
    {
      label: "What does Cameroonian law say about women's rights in customary marriage?",
      query: 'What are the legal rights of women in customary marriages and family law in Cameroon?',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#212121] relative overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 md:px-5 bg-white dark:bg-[#212121] sticky top-0 z-20">
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-[#2f2f2f] rounded-lg text-stone-500 dark:text-stone-400 transition-colors cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeft size={18} />
            </button>
          )}
          {!isSidebarOpen && (
            <button
              onClick={onNewChat}
              disabled={isLoading}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-[#2f2f2f] rounded-lg text-stone-500 dark:text-stone-400 transition-colors cursor-pointer disabled:opacity-40"
              title="New chat"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
        <UserNav />
      </header>

      {/* Anonymous Guest Alert Banner */}
      {!isAuthenticated && (
        <div className="w-full bg-[#B89868]/10 border-b border-[#B89868]/20 px-6 py-2.5 text-center text-xs text-[#B89868] dark:text-[#C5A880] flex items-center justify-center gap-1.5 shrink-0 shadow-sm">
          <span>You are chatting as a guest.</span>
          <Link href="/login" className="font-bold underline hover:text-[#9c8056] transition-colors">
            Log in
          </Link>
          <span>or</span>
          <Link href="/signup" className="font-bold underline hover:text-[#9c8056] transition-colors">
            Sign up
          </Link>
          <span>to save your consultation history and book sessions with local lawyers.</span>
        </div>
      )}

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="max-w-3xl mx-auto w-full px-4 md:px-6 min-h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-16 animate-in fade-in duration-500">
              <h1 className="text-3xl md:text-4xl font-semibold text-stone-800 dark:text-white mb-8 tracking-tight">
                How can I help you today?
              </h1>

              {/* Suggestion chips — plain text, no cards */}
              {/* Suggestion chips */}
              <div className="flex flex-col gap-2 w-full max-w-lg">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onSendMessage?.(s.query)}
                    disabled={isLoading}
                    className="text-left px-4 py-3 rounded-xl bg-stone-100 dark:bg-[#2f2f2f] hover:bg-stone-200 dark:hover:bg-[#3a3a3a] text-stone-700 dark:text-stone-300 text-sm transition-all duration-150 disabled:opacity-40 cursor-pointer hover:shadow-sm group"
                  >
                    <span className="block font-medium group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-6 space-y-1">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start px-2 py-4">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;