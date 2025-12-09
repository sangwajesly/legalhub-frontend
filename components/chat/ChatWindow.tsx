'use client';

import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import MessageBubble from './MessageBubble';
import { Scale, Menu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { UserNav } from '@/components/shared/UserNav';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onToggleSidebar: () => void;
  onSendMessage: (message: string) => Promise<void>;
  isSidebarOpen: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onToggleSidebar, onSendMessage, isSidebarOpen }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 dark:border-teal-500 border-t-transparent animate-spin mb-4"></div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Initializing AI Assistant...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 overflow-hidden">
      {/* Minimal Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className={`flex items-center gap-3 transition-all duration-300 ${isSidebarOpen ? 'max-w-3xl mx-auto' : 'max-w-full'}`}>
          {/* Hamburger Menu - Only show when sidebar is CLOSED (to open it) */}
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-semibold">Back to Home</span>
          </Link>
        </div>

        {/* Right Side: User Profile */}
        <div>
          <UserNav />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth bg-white dark:bg-slate-950">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center pt-20">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 dark:from-teal-500 dark:to-emerald-500 rounded-xl flex items-center justify-center mb-8">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-4xl font-medium text-slate-900 dark:text-white mb-16">
              How can I help you today?
            </h2>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                onClick={() => onSendMessage("Explain the basics of non-disclosure agreements (NDAs)")}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 transition-colors"
              >
                📜 Explain NDA basics
              </button>
              <button
                onClick={() => onSendMessage("Guide me through the trademark registration process")}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 transition-colors"
              >
                ™️ Trademark process
              </button>
              <button
                onClick={() => onSendMessage("Help me draft a basic contract template")}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 transition-colors"
              >
                📄 Draft a contract
              </button>
              <button
                onClick={() => onSendMessage("What are my legal rights as a tenant?")}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 transition-colors"
              >
                ⚖️ Legal rights guide
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                index={index}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
