'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, Share2, MoreHorizontal } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';

interface MessageActionsProps {
  messageContent: string;
  messageIndex?: number;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  messageContent,
  messageIndex,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageContent);
      setCopied(true);
      showToast({ message: 'Message copied to clipboard', type: 'success' });
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
    <div className="flex items-center gap-1.5 p-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <button
        onClick={handleCopy}
        className={`p-1.5 rounded-lg transition-all ${
          copied ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' : 'text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Copy message"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <button
        onClick={() => handleFeedback('up')}
        className={`p-1.5 rounded-lg transition-all ${
          feedback === 'up' ? 'text-blue-600 dark:text-teal-400 bg-blue-50 dark:bg-teal-900/20' : 'text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Helpful"
      >
        <ThumbsUp size={14} fill={feedback === 'up' ? 'currentColor' : 'none'} />
      </button>

      <button
        onClick={() => handleFeedback('down')}
        className={`p-1.5 rounded-lg transition-all ${
          feedback === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Not helpful"
      >
        <ThumbsDown size={14} fill={feedback === 'down' ? 'currentColor' : 'none'} />
      </button>

      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800 mx-0.5" />

      <button
        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        title="Share"
      >
        <Share2 size={14} />
      </button>

      <button
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        title="More"
      >
        <MoreHorizontal size={14} />
      </button>
    </div>
  );
};
