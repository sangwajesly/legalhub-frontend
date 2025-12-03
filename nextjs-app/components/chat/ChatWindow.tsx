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

  const quickActions = [
    {
      icon: '📋',
      title: 'Explain NDA basics',
      description: 'Learn about non-disclosure agreements',
    },
    {
      icon: '❓',
      title: 'How to register a trademark?',
      description: 'Guide to trademark registration process',
    },
    {
      icon: '📝',
      title: 'Draft a simple contract',
      description: 'Create a basic contract template',
    },
  ];

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LegalHub AI</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Welcome Screen */}
            <div className="text-center mb-12 mt-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                ⚖️
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                How can I help you today?
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-900">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
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
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>

      {/* Disclaimer */}
      {messages.length === 0 && !isLoading && (
        <div className="border-t border-gray-200 px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            Disclaimer: This is an AI assistant and not a substitute for professional legal advice.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
