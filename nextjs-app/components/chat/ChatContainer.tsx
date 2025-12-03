'use client';

import React, { useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import Toast from '@/components/ui/Toast';

const ChatPage: React.FC = () => {
  const {
    currentSessionId,
    currentMessages,
    isLoading,
    error,
    sendMessage,
    createNewSession,
    clearError,
  } = useChatStore();

  // Create initial session on load
  useEffect(() => {
    if (!currentSessionId) {
      createNewSession();
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={currentMessages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {error && (
        <Toast
          message={error}
          type="error"
          onClose={clearError}
        />
      )}
    </div>
  );
};

export default ChatPage;
