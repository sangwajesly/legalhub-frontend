'use client';

import { Trash2, Plus } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';
import React, { useEffect } from 'react';

const ChatHistory: React.FC = () => {
  const { sessions, currentSessionId, selectSession, createNewSession, deleteSession, fetchSessions, isLoading } =
    useChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-bold text-lg">Chat History</h2>
        <button
          onClick={createNewSession}
          disabled={isLoading}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No conversations yet.
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                  currentSessionId === session.id
                    ? 'bg-blue-100'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => selectSession(session.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-gray-800">
                    {session.title || 'Untitled Conversation'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.messages.length} message{session.messages.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  disabled={isLoading}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-100 rounded text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatHistory;
