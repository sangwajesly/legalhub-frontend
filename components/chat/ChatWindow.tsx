'use client';

import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Bot, Scale, Home, FileText, Map, PanelLeft, Plus } from 'lucide-react';
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestions = [
    {
      title: 'Douala Business',
      prompt: 'How do I register a business in Douala?',
      description: 'Learn step-by-step company registration procedures in Cameroon.',
      icon: Scale,
    },
    {
      title: 'Yaoundé Tenants',
      prompt: 'What are my tenant rights in Yaoundé?',
      description: 'Review common landlord disputes and legal rental protections.',
      icon: Home,
    },
    {
      title: 'Contract Review',
      prompt: 'Review employment contract for Cameroon',
      description: 'Key red flags to search for in local labor agreements.',
      icon: FileText,
    },
    {
      title: 'Land Title Guide',
      prompt: 'Explain land title procedure in Cameroon',
      description: 'Guidance on secure land acquisitions and title deeds.',
      icon: Map,
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAF9F5] dark:bg-[#121315] relative overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-[#E5E2DC]/40 dark:border-stone-850/40 bg-[#FAF9F5]/75 dark:bg-[#121315]/75 backdrop-blur-md sticky top-0 z-20 transition-all duration-200">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Sidebar Toggle - Only render when collapsed to avoid double buttons on screen */}
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-xl text-stone-500 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-all duration-200 mr-1.5 cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeft size={18} className="stroke-[2]" />
            </button>
          )}

          <div className="w-8 h-8 border border-[#B89868]/30 bg-stone-50 dark:bg-stone-900 rounded-xl flex items-center justify-center text-[#B89868] shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-[10px] font-extrabold text-slate-900 dark:text-[#FAF9F5] leading-tight tracking-wider uppercase font-sans">Legal Assistant</h2>
            <p className="text-[9px] text-[#B89868] font-bold uppercase tracking-widest flex items-center gap-1">
              <span className="w-1 h-1 bg-[#B89868] rounded-full animate-pulse"></span>
              Citizen Companion
            </p>
          </div>
        </div>

        {/* User Navigation & Quick New Chat (New chat only shows when sidebar is closed to prevent double buttons) */}
        <div className="flex items-center gap-2">
           {!isSidebarOpen && (
             <button
               onClick={onNewChat}
               disabled={isLoading}
               className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E2DC]/60 dark:border-stone-850/60 hover:border-[#B89868]/45 bg-[#FDFCF9] dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 cursor-pointer"
               title="Start new conversation"
             >
               <Plus size={12} className="text-[#B89868]" />
               <span className="hidden sm:inline">New Chat</span>
             </button>
           )}
           {!isSidebarOpen && <div className="w-[1px] h-4 bg-[#E5E2DC] dark:bg-stone-800 mx-1.5" />}
           <UserNav />
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scroll-smooth custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto w-full min-h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center py-8 animate-in fade-in-0 slide-in-from-bottom-6 duration-550 ease-out">
              <div className="w-14 h-14 border border-[#B89868]/20 bg-[#FDFCF9] dark:bg-stone-900 rounded-2xl flex items-center justify-center text-[#B89868] mb-5 shadow-sm">
                <Bot size={28} className="stroke-[1.5]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold font-serif text-slate-900 dark:text-white mb-3 tracking-tight">
                How can I assist you today?
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mb-8 leading-relaxed font-sans font-medium">
                Ask me about land disputes, contract reviews, or general citizen legal guidance in West Africa.
              </p>
              
              {/* Horizontal scroll cards */}
              <div className="w-full mt-2">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none px-4 -mx-4 justify-start md:justify-center">
                  {suggestions.map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => onSendMessage?.(item.prompt)}
                        disabled={isLoading}
                        className="flex-shrink-0 w-[220px] text-left bg-[#FDFCF9] dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-2xl p-4 hover:border-[#B89868]/50 dark:hover:border-[#B89868]/45 hover:shadow-sm transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-col justify-between h-[155px] font-sans"
                      >
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] dark:bg-stone-850 flex items-center justify-center text-[#B89868] border border-[#B89868]/15 mb-3 group-hover:scale-105 transition-transform duration-200">
                            <IconComponent size={16} />
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-[#FAF9F5] tracking-wide mb-1">{item.title}</h4>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium leading-normal line-clamp-2">{item.description}</p>
                        </div>
                        <span className="block text-[9px] font-bold text-[#B89868] dark:text-[#C5A880] uppercase tracking-wider mt-2 group-hover:translate-x-0.5 transition-transform duration-250">
                          Try this →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;