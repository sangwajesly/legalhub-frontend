'use client';

import { Plus, Trash2, MessageSquare, Menu, Settings, Home } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect } from 'react';
import { groupSessionsByDate, getSessionPreview } from '@/lib/utils/chat-utils';
import Link from 'next/link';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function ChatSidebar({ isOpen, onClose, onToggle }: ChatSidebarProps) {
  const { sessions, currentSessionId, selectSession, createNewSession, deleteSession, fetchSessions, isLoading } =
    useChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white flex flex-col z-50 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="p-2 flex flex-col gap-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <button
                onClick={onToggle}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Close sidebar"
              >
                <Menu size={20} className="text-slate-600 dark:text-slate-400" />
              </button>

              <Link
                href="/dashboard"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Go to Dashboard"
              >
                <Home size={20} className="text-slate-600 dark:text-slate-400" />
              </Link>
            </div>

            <button
              onClick={createNewSession}
              disabled={isLoading}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              title="New chat"
            >
              <Plus size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Sessions List - Scrollable */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          {sessions.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-slate-400 dark:text-slate-500 text-xs">No conversations</p>
            </div>
          ) : (
            <div className="space-y-1">
              {Object.entries(groupedSessions).map(([period, periodSessions]) => (
                <div key={period} className="mb-3">
                  <h3 className="px-2 py-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {period}
                  </h3>
                  <div className="space-y-0.5 mt-1">
                    {periodSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`group relative px-2 py-2 rounded-lg cursor-pointer transition-all ${currentSessionId === session.id
                          ? 'bg-slate-100 dark:bg-slate-800'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={() => {
                          selectSession(session.id);
                          if (window.innerWidth < 768) onClose();
                        }}
                      >
                        <div className="flex items-start gap-2 pr-6">
                          <MessageSquare
                            size={14}
                            className={`mt-0.5 flex-shrink-0 ${currentSessionId === session.id ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                              }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate text-slate-700 dark:text-slate-300">
                              {session.title || getSessionPreview(session.messages, 30)}
                            </p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          disabled={isLoading}
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-2">
          <Link href="/settings" className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Settings size={16} className="text-slate-500 dark:text-slate-400" />
            <span className="text-xs text-slate-600 dark:text-slate-300">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Toggle Button - Always visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-3 left-3 z-30 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
          title="Open sidebar"
        >
          <Menu size={20} className="text-slate-700 dark:text-slate-300" />
        </button>
      )}
    </>
  );
}
