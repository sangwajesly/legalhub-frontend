'use client';

import React, { useEffect, useState } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { toast } from 'react-hot-toast';

const ChatContainer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    sessions,
    currentSessionId,
    currentMessages,
    isLoading,
    error,
    sendMessage,
    createNewSession,
    fetchSessions,
    selectSession,
    clearError,
  } = useChatStore();

  // Ensure a session is always selected
  useEffect(() => {
    const initSession = async () => {
      if (!currentSessionId && !isLoading) {
        // If we have sessions but none selected, select the first one
        if (sessions.length > 0) {
          selectSession(sessions[0].id);
        } else {
          // If no sessions exist at all, create a new one
          await createNewSession();
        }
      }
    };
    initSession();
  }, [currentSessionId, isLoading, sessions.length, createNewSession, selectSession]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />

      {/* Main Chat Area - Expands when sidebar closes */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
        <ChatWindow
          messages={currentMessages}
          isLoading={isLoading}
          onToggleSidebar={toggleSidebar}
          onSendMessage={sendMessage}
          isSidebarOpen={isSidebarOpen}
        />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
