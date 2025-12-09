'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/lib/store/chat-store';


interface MessageActionsProps {
  messageId: string;
  messageIndex: number;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  messageIndex,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);
  const { regenerateResponse, submitFeedback } = useChatStore();

  const handleCopy = () => {
    const message = document.querySelector(
      `[data-message-id="${messageId}"]`
    );
    if (message) {
      navigator.clipboard.writeText(message.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = async () => {
    await regenerateResponse(messageIndex);
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    await submitFeedback(messageId, rating, feedback || undefined);
    setShowFeedback(false);
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="mt-2 flex gap-2">
      <button
        onClick={handleCopy}
        className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded transition"
        title="Copy message"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <button
        onClick={handleRegenerate}
        className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded transition"
        title="Regenerate response"
      >
        🔄 Regenerate
      </button>
      <button
        onClick={() => setShowFeedback(!showFeedback)}
        className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded transition"
        title="Give feedback"
      >
        👍 Feedback
      </button>

      {showFeedback && (
        <div className="mt-2 p-2 bg-gray-700 rounded text-white text-xs">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`px-2 py-1 rounded ${
                  rating >= star ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional feedback..."
            className="w-full px-2 py-1 bg-gray-600 text-white rounded text-xs mb-2"
            rows={2}
          />
          <button
            onClick={handleSubmitFeedback}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded transition"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageActions;
