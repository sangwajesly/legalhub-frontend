'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, Share2, MoreHorizontal } from 'lucide-react';
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
    <div className="flex items-center gap-1 p-1 bg-[#FDFCF9]/90 dark:bg-stone-900/95 backdrop-blur-sm rounded-xl border border-[#E5E2DC] dark:border-stone-850 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] transition-all duration-200">
      <button
        onClick={handleCopy}
        className={`p-1.5 rounded-lg transition-all duration-200 ${
          copied 
            ? 'text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20' 
            : 'text-stone-400 dark:text-stone-500 hover:text-[#B89868] dark:hover:text-[#C5A880] hover:bg-[#FAF9F5] dark:hover:bg-stone-850'
        }`}
        title="Copy message"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>

      <button
        onClick={() => handleFeedback('up')}
        className={`p-1.5 rounded-lg transition-all duration-200 ${
          feedback === 'up' 
            ? 'text-[#B89868] bg-[#B89868]/10' 
            : 'text-stone-400 dark:text-stone-500 hover:text-[#B89868] dark:hover:text-[#C5A880] hover:bg-[#FAF9F5] dark:hover:bg-stone-850'
        }`}
        title="Helpful"
      >
        <ThumbsUp size={13} className="stroke-[1.75]" fill={feedback === 'up' ? 'currentColor' : 'none'} />
      </button>

      <button
        onClick={() => handleFeedback('down')}
        className={`p-1.5 rounded-lg transition-all duration-200 ${
          feedback === 'down' 
            ? 'text-red-650 bg-red-50 dark:bg-red-950/25' 
            : 'text-stone-400 dark:text-stone-500 hover:text-red-500 hover:bg-[#FAF9F5] dark:hover:bg-stone-850'
        }`}
        title="Not helpful"
      >
        <ThumbsDown size={13} className="stroke-[1.75]" fill={feedback === 'down' ? 'currentColor' : 'none'} />
      </button>

      <div className="w-[1px] h-3 bg-[#E5E2DC] dark:bg-stone-800 mx-0.5" />

      <button
        className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-[#B89868] dark:hover:text-[#C5A880] hover:bg-[#FAF9F5] dark:hover:bg-stone-850 transition-all duration-200"
        title="Share"
      >
        <Share2 size={13} className="stroke-[1.75]" />
      </button>

      <button
        className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-[#FAF9F5] dark:hover:bg-stone-850 transition-all duration-200"
        title="More options"
      >
        <MoreHorizontal size={13} className="stroke-[1.75]" />
      </button>
    </div>
  );
};

export default MessageActions;
