'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';

interface MessageActionsProps {
  messageContent: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  messageContent,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      setCopied(true);
      showToast({ message: 'Copied to clipboard', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast({ message: 'Failed to copy message', type: 'error' });
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    showToast({ 
      message: type === 'up' ? 'Feedback received! Glad we could help.' : 'Feedback received. We will strive to improve.', 
      type: 'info' 
    });
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={handleCopy}
        className={`p-1.5 rounded-lg transition-colors ${
          copied
            ? 'text-emerald-500'
            : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#3a3a3a]'
        }`}
        title="Copy message"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <button
        onClick={() => handleFeedback('up')}
        className={`p-1.5 rounded-lg transition-colors ${
          feedback === 'up'
            ? 'text-stone-700 dark:text-stone-200'
            : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#3a3a3a]'
        }`}
        title="Good response"
      >
        <ThumbsUp size={14} fill={feedback === 'up' ? 'currentColor' : 'none'} />
      </button>

      <button
        onClick={() => handleFeedback('down')}
        className={`p-1.5 rounded-lg transition-colors ${
          feedback === 'down'
            ? 'text-stone-700 dark:text-stone-200'
            : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#3a3a3a]'
        }`}
        title="Bad response"
      >
        <ThumbsDown size={14} fill={feedback === 'down' ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};

export default MessageActions;
