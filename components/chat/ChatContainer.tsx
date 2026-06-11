'use client';

import React, { useEffect, useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllSessions();
    }
  }, [isAuthenticated, fetchAllSessions]);

  useEffect(() => {
    // Set initial sidebar state based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCreatingSession = React.useRef(false);

  useEffect(() => {
    if (!isLoading && !currentSessionId) {
      if (isAuthenticated && user) {
        if (allSessions.length === 0 && !error) {
          if (isCreatingSession.current) return;
          isCreatingSession.current = true;
          createSession({ title: 'New Chat' })
            .finally(() => {
              isCreatingSession.current = false;
            });
        } else if (allSessions.length > 0) {
          setCurrentSession(allSessions[0].id);
        }
      } else if (!isAuthenticated) {
        // Auto-initialize local guest session
        const guestSessionId = `local-${Date.now()}`;
        useChatStore.setState({
          currentSessionId: guestSessionId,
          chatHistory: [],
          allSessions: [{
            id: guestSessionId,
            title: 'Guest Chat',
            lastMessage: '',
            timestamp: new Date().toISOString()
          }]
        });
      }
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

  const handleNewChat = () => {
    useChatStore.getState().clearError();
    createSession({ title: 'New Chat' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#212121]">
      <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <ChatWindow
            messages={chatHistory.map(m => ({
              ...m,
              role: m.role as 'user' | 'assistant' // Cast to expected role type
            }))}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onNewChat={handleNewChat}
          />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default ChatContainer;
