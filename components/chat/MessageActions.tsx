'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import toast from 'react-hot-toast'; // Assuming toast for notifications

interface MessageActionsProps {
  messageId: string;
  messageIndex: number; // messageIndex might not be needed after removing regenerateResponse
}

const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  messageIndex,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false); // New state to track if feedback is given

  const { submitFeedback } = useChatStore();

  const handleCopy = () => {
    const messageElement = document.querySelector(
      `[data-message-id="${messageId}"]`
    );
    if (messageElement && messageElement.textContent) {
      navigator.clipboard.writeText(messageElement.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback for cases where messageId doesn't directly map to a selectable element
      // For now, let's assume message content is available via props if needed, or handle differently.
      // For this change, I'll rely on the existing DOM query which might need refinement depending on actual rendering.
      const messageContent = document.getElementById(`message-content-${messageId}`)?.textContent;
      if (messageContent) {
        navigator.clipboard.writeText(messageContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error("Failed to copy message content.");
      }
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    try {
      await submitFeedback(messageId, rating, feedback || undefined);
      setFeedbackGiven(true); // Set feedbackGiven to true on successful submission
      setShowFeedback(false);
      toast.success('Feedback submitted!');
    } catch (error) {
      toast.error('Failed to submit feedback.');
      console.error('Feedback submission error:', error);
    }
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

      {/* Conditional rendering for Feedback button */}
      {!feedbackGiven ? (
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded transition"
          title="Give feedback"
        >
          👍 Feedback
        </button>
      ) : (
        <span className="text-xs px-2 py-1 bg-green-600 text-white rounded">
          Feedback Submitted
        </span>
      )}


      {showFeedback && !feedbackGiven && ( // Only show form if not feedbackGiven
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
