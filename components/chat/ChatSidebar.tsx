'use client';

import { Plus, Trash2, MessageSquare, PanelLeftClose, LayoutDashboard, Settings } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ChatSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ChatSidebar({ isOpen, setIsOpen }: ChatSidebarProps) {
  const { allSessions, currentSessionId, setCurrentSession, createSession, deleteChatSession, fetchAllSessions, isLoading, error } =
    useChatStore();

  useEffect(() => {
    fetchAllSessions();
  }, [fetchAllSessions]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#FAF9F5] dark:bg-[#121315] border-r border-[#E5E2DC] dark:border-stone-850 text-slate-900 dark:text-[#e3e3e3] flex flex-col z-50 transition-all duration-300 ease-in-out 
          ${isOpen 
            ? 'w-64 translate-x-0 fixed md:relative h-screen md:h-full opacity-100' 
            : 'w-0 -translate-x-full fixed md:relative h-screen md:h-full overflow-hidden border-r-0 md:border-r-0 opacity-0'
          }`}
      >
        {/* Row 1: Brand & Sidebar Collapse Toggle */}
        <div className="p-4 flex items-center justify-between min-w-[256px]">
          <span className="font-serif font-extrabold text-sm tracking-wider text-stone-900 dark:text-[#FAF9F5] flex items-center gap-1.5 select-none">
            Legal<span className="text-[#B89868] italic font-normal">Hub</span>
          </span>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-850 rounded-xl text-stone-500 hover:text-stone-950 dark:hover:text-[#FAF9F5] transition-all duration-200 md:flex hidden"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={18} className="stroke-[2]" />
          </button>
        </div>

        {/* Row 2: Prominent wide New Chat Button */}
        <div className="px-4 pb-3 border-b border-[#E5E2DC]/40 dark:border-stone-850/40 min-w-[256px]">
          <button
            onClick={() => {
              useChatStore.getState().clearError();
              createSession({ title: 'New Chat' });
            }}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1C1B19] dark:bg-[#FAF9F5] hover:bg-[#32312E] dark:hover:bg-[#EAE8E2] text-[#FAF9F5] dark:text-[#121315] rounded-xl transition-all duration-200 disabled:opacity-50 text-xs font-bold uppercase tracking-wider shadow-sm active:scale-[0.98] cursor-pointer"
            title="Start new conversation"
          >
            <Plus size={15} className="text-[#B89868] stroke-[2.5]" />
            <span>New Chat</span>
          </button>
        </div>

        {error && (
          <div className="p-2 mx-3 mt-2 text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-300 rounded-xl text-xs border border-red-100 dark:border-red-900/30 min-w-[256px]">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="px-3 pt-3 mb-1 min-w-[256px]">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 h-9 rounded-xl hover:bg-stone-100 dark:hover:bg-[#2d2e30] text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider"
            >
              <LayoutDashboard size={14} className="text-[#B89868]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Sessions List - Scrollable */}
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-4 min-w-[256px]">
          {!Array.isArray(allSessions) || allSessions.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-stone-400 dark:text-stone-500 text-xs font-medium">Recent chats appear here</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <h3 className="px-3 py-1.5 text-[9px] font-bold text-[#B89868]/80 dark:text-stone-500 uppercase tracking-widest">
                Recent
              </h3>
              {Array.isArray(allSessions) && allSessions.map((session: any) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${currentSessionId === session.id
                    ? 'bg-[#FDFCF9] dark:bg-stone-900/35 border-[#B89868]/45 text-stone-900 dark:text-[#FAF9F5] font-semibold shadow-sm'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-900/10 text-stone-660 dark:text-stone-400'
                    } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => {
                    setCurrentSession(session.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MessageSquare size={15} className={`flex-shrink-0 transition-colors ${currentSessionId === session.id ? 'text-[#B89868]' : 'text-stone-400'}`} />
                    <p className="text-xs truncate font-medium">
                      {session.title || 'New Conversation'}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (session.id) {
                        deleteChatSession(session.id);
                      } else {
                        console.error("Attempted to delete session with missing ID:", session);
                      }
                    }}
                    disabled={isLoading}
                    className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-850 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-150"
                    title="Delete chat"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E2DC]/40 dark:border-stone-850/40 min-w-[256px]">
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 h-9 rounded-xl hover:bg-stone-100 dark:hover:bg-[#2d2e30] text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider"
            >
              <Settings size={14} className="text-[#B89868]" />
              <span>Settings</span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
