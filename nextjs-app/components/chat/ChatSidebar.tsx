'use client';

import { Trash2, Plus, Settings } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect } from 'react';

export function ChatSidebar() {
  const { sessions, currentSessionId, selectSession, createNewSession, deleteSession, fetchSessions, isLoading } =
    useChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo & Title */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          L
        </div>
        <div>
          <h2 className="font-bold text-gray-900 text-sm">LegalHub</h2>
          <p className="text-xs text-gray-500">AI Legal Assistant</p>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={createNewSession}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : <><Plus size={18} /> New Chat</>}
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-4">
        {sessions.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">No conversations yet</p>
            <p className="text-gray-300 text-xs mt-2">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-start justify-between ${
                  currentSessionId === session.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => selectSession(session.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    currentSessionId === session.id ? 'text-blue-900' : 'text-gray-800'
                  }`}>
                    {session.title || 'Untitled Conversation'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {session.messages.length} message{session.messages.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  disabled={isLoading}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded text-red-500 ml-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-lg">
            👤
          </div>
          <span>User Account</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm">
          <Settings size={18} className="text-gray-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
