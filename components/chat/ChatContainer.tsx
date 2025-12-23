'use client';

import React, { useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { useAuthStore } from '@/lib/store/auth-store';
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
  } = useChatStore();

  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllSessions();
    }
  }, [isAuthenticated, fetchAllSessions]);

  useEffect(() => {
    // Wait for user to be available before auto-creating
    if (isAuthenticated && user && !isLoading && !currentSessionId && allSessions.length === 0 && !error) {
       // Only auto-create if no error implies we haven't failed recently
      createSession({ title: 'New Chat' });
    } else if (isAuthenticated && !isLoading && !currentSessionId && allSessions.length > 0) {
       setCurrentSession(allSessions[0].id);
    }
  }, [isAuthenticated, user, currentSessionId, isLoading, allSessions, createSession, setCurrentSession, error]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // Do not clear error automatically, or we risk infinite loops if the error
      // causes a state (like no sessions) that triggers a retry (like createSession).
      // clearError(); 
    }
  }, [error]);

  const handleSendMessage = async (content: string, files?: File[]) => {
    let attachmentUrls: string[] = [];
    if (files && files.length > 0) {
      // Upload files first
      const uploadPromises = files.map(file => useChatStore.getState().uploadFile(file));
      try {
        attachmentUrls = await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Failed to upload files", error);
        toast.error("Failed to upload attachments");
        return;
      }
    }
    await sendMessage(content, attachmentUrls);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950">
      <ChatSidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto overflow-hidden">
          <ChatWindow
            messages={chatHistory.map(m => ({
              ...m,
              role: m.role as 'user' | 'assistant' // Cast to expected role type
            }))}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default ChatContainer;
