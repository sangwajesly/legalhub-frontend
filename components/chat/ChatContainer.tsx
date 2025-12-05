'use client';

import React, { useEffect } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';

const ChatContainer: React.FC = () => {
  const {
    currentSessionId,
    currentMessages,
    isLoading,
    sendMessage,
    createNewSession,
  } = useChatStore();

  useEffect(() => {
    if (!currentSessionId) {
      createNewSession();
    }
  }, [currentSessionId, createNewSession]);

  return (
    <div className="flex h-screen bg-white">
      <ChatHistory />
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={currentMessages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
