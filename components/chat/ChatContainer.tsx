'use client';

import React, { useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import toast from 'react-hot-toast';

const ChatContainer: React.FC = () => {
  const {
    allSessions,
    currentSessionId,
    chatHistory,
    isLoading,
    error,
    sendMessage,
    createSession,
    fetchAllSessions,
    setCurrentSession,
    clearError,
  } = useChatStore();

  useEffect(() => {
    fetchAllSessions();
  }, [fetchAllSessions]);

  useEffect(() => {
    if (!isLoading && !currentSessionId && allSessions.length > 0) {
      setCurrentSession(allSessions[0].id);
    } else if (!isLoading && !currentSessionId && allSessions.length === 0) {
      createSession({ title: 'New Chat' });
    }
  }, [currentSessionId, isLoading, allSessions, createSession, setCurrentSession]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950">
      <ChatSidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto overflow-hidden">
          <ChatWindow
            messages={chatHistory}
            isLoading={isLoading}
            onSendMessage={sendMessage}
          />
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default ChatContainer;
