'use client';

import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">What's on your mind today?</h2>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
                index={index}
              />
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-start mt-4">
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
