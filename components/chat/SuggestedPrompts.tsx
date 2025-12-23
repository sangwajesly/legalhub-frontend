'use client';

import { useChatStore } from '@/lib/store/chat-store';
import { Sparkles } from 'lucide-react';
import React from 'react';

export function SuggestedPrompts() {
  const { suggestedFollowUps, sendMessage, isLoading } = useChatStore();

  if (isLoading || suggestedFollowUps.length === 0) {
    return null;
  }

  const handlePromptClick = (prompt: string) => {
    if (!isLoading) {
      sendMessage(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-2 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-slate-500" />
        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Suggested Follow-ups
        </h4>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {suggestedFollowUps.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
