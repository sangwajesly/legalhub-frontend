'use client';

import { Plus, Trash2, PanelLeftClose, LayoutDashboard, Settings } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect } from 'react';
import Link from 'next/link';

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
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#f9f9f9] dark:bg-[#171717] text-stone-800 dark:text-stone-200 flex flex-col z-50 transition-all duration-300 ease-in-out
          ${isOpen
            ? 'w-64 translate-x-0 fixed md:relative h-screen md:h-full opacity-100'
            : 'w-0 -translate-x-full fixed md:relative h-screen md:h-full overflow-hidden opacity-0'
          }`}
      >
        {/* Brand row */}
        <div className="h-14 flex items-center justify-between px-4 min-w-[256px]">
          <span className="font-semibold text-sm text-stone-900 dark:text-white select-none">
            LegalHub
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-stone-200 dark:hover:bg-[#2f2f2f] rounded-lg text-stone-500 dark:text-stone-400 transition-colors md:flex hidden cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-3 min-w-[256px]">
          <button
            onClick={() => {
              useChatStore.getState().clearError();
              createSession({ title: 'New Chat' });
            }}
            disabled={isLoading}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-stone-200 dark:hover:bg-[#2f2f2f] text-stone-700 dark:text-stone-300 text-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
        </div>

        {error && (
          <div className="px-3 mb-2 min-w-[256px]">
            <p className="text-red-500 dark:text-red-400 text-xs px-2">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="px-3 mb-2 min-w-[256px]">
          <Link href="/dashboard">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-200 dark:hover:bg-[#2f2f2f] text-stone-600 dark:text-stone-400 text-sm transition-colors cursor-pointer">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
          </Link>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-3 min-w-[256px]">
          {!Array.isArray(allSessions) || allSessions.length === 0 ? (
            <p className="px-3 py-4 text-xs text-stone-400 dark:text-stone-500">
              Your conversations will appear here
            </p>
          ) : (
            <div className="space-y-0.5">
              <p className="px-3 pt-2 pb-1 text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                Recent
              </p>
              {allSessions.map((session: any) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors text-sm ${
                    currentSessionId === session.id
                      ? 'bg-stone-200 dark:bg-[#2f2f2f] text-stone-900 dark:text-white'
                      : 'hover:bg-stone-200 dark:hover:bg-[#2f2f2f] text-stone-600 dark:text-stone-400'
                  } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => {
                    setCurrentSession(session.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                >
                  <p className="truncate flex-1">{session.title || 'New Conversation'}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (session.id) deleteChatSession(session.id);
                    }}
                    disabled={isLoading}
                    className="p-1 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 pb-4 min-w-[256px]">
          <Link href="/settings">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-200 dark:hover:bg-[#2f2f2f] text-stone-600 dark:text-stone-400 text-sm transition-colors cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
