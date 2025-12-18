'use client';

import { Plus, Trash2, MessageSquare, PanelLeftOpen, PanelLeftClose, LayoutDashboard, Settings } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ChatSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { allSessions, currentSessionId, setCurrentSession, createSession, deleteChatSession, fetchAllSessions, isLoading, error } =
    useChatStore();

  useEffect(() => {
    // Set initial sidebar state based on screen size
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }

    fetchAllSessions();
  }, [fetchAllSessions]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#f8fafd] dark:bg-[#131314] border-r border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#e3e3e3] flex flex-col z-50 transition-transform duration-300 ease-in-out md:h-full md:relative md:translate-x-0 md:flex ${isSidebarOpen ? 'translate-x-0 fixed h-screen' : '-translate-x-full fixed h-screen'
          }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-200 dark:hover:bg-[#2d2e30] rounded-full transition-colors md:hidden"
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={20} className="text-slate-600 dark:text-[#c4c7c5]" />
            ) : (
              <PanelLeftOpen size={20} className="text-slate-600 dark:text-[#c4c7c5]" />
            )}
          </button>
          
          <button
            onClick={() => createSession({ title: 'New Chat' })}
            disabled={isLoading}
            className="flex items-center gap-3 px-4 py-3 bg-[#e9eef6] dark:bg-[#1e1f20] hover:bg-[#dde3ea] dark:hover:bg-[#2d2e30] rounded-full transition-colors disabled:opacity-50 text-sm font-medium"
          >
            <Plus size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="hidden lg:inline text-[#444746] dark:text-[#e3e3e3]">New Chat</span>
          </button>
        </div>

        {error && (
          <div className="p-2 mx-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg text-xs">
            <p>{error}</p>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="px-3 mb-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#2d2e30] text-slate-700 dark:text-[#e3e3e3]"
            >
              <LayoutDashboard size={18} />
              <span>Go to Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Sessions List - Scrollable */}
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-4">
          {allSessions.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-slate-500 dark:text-[#c4c7c5] text-xs">Recent chats appear here</p>
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-[#c4c7c5] uppercase tracking-wider">
                Recent
              </h3>
              {allSessions.map((session: any) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between px-3 py-2 rounded-full cursor-pointer transition-colors ${currentSessionId === session.id
                    ? 'bg-[#d3e3fd] dark:bg-[#004a77] text-blue-900 dark:text-[#c2e7ff]'
                    : 'hover:bg-slate-200 dark:hover:bg-[#2d2e30] text-slate-700 dark:text-[#e3e3e3]'
                    } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => {
                    setCurrentSession(session.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MessageSquare size={16} className="flex-shrink-0" />
                    <p className="text-sm truncate">
                      {session.title || 'New Conversation'}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatSession(session.id);
                    }}
                    disabled={isLoading}
                    className="p-1 rounded-full hover:bg-slate-300 dark:hover:bg-[#3d3e41] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#2d2e30] text-slate-700 dark:text-[#e3e3e3]"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
