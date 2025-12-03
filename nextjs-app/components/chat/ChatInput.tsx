'use client';

import React, { useState } from 'react';


interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    console.log('handleSend called');
    if (!input.trim() || isLoading) return;

    try {
      setIsSending(true);
      await onSendMessage(input.trim());
      setInput('');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a legal question... (Shift+Enter for new line)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          disabled={isLoading || isSending}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || isSending}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            input.trim() && !isLoading && !isSending
              ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSending ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
