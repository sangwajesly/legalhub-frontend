'use client';

import React, { useEffect, useState } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import toast from 'react-hot-toast'; // Using react-hot-toast, not 'react-hot-toast';

const ChatContainer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    allSessions, // Changed from sessions
    currentSessionId,
    chatHistory, // Changed from currentMessages
    isLoading,
    error,
    sendMessage,
    createSession, // Changed from createNewSession
    fetchAllSessions, // Changed from fetchSessions
    setCurrentSession, // Changed from selectSession
    clearError,
  } = useChatStore();

  // Fetch all sessions on component mount
  useEffect(() => {
    fetchAllSessions();
  }, [fetchAllSessions]);

  // Ensure a session is always selected or created
  useEffect(() => {
    // Only attempt to initialize if we are not already loading and don't have a current session
    if (!isLoading && !currentSessionId && allSessions.length > 0) {
      // If sessions are loaded and none is current, select the most recent one
      setCurrentSession(allSessions[0].id);
    } else if (!isLoading && !currentSessionId && allSessions.length === 0) {
      // If no sessions exist and not loading, create a new one
      createSession({ title: 'New Chat' });
    }
  }, [currentSessionId, isLoading, allSessions, createSession, setCurrentSession]);

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
          messages={chatHistory} // Changed from currentMessages
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
