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
    <div className="w-full max-w-3xl mx-auto px-1 pb-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Sparkles className="h-3.5 w-3.5 text-[#B89868] animate-pulse" />
        <h4 className="text-[10px] font-bold text-[#B89868] uppercase tracking-wider">
          Suggested Follow-ups
        </h4>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {suggestedFollowUps.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            disabled={isLoading}
            className="px-3.5 py-1.5 bg-[#FDFCF9] dark:bg-stone-900/35 border border-[#E5E2DC] dark:border-stone-850 rounded-xl text-xs text-stone-700 dark:text-stone-300 hover:border-[#B89868]/60 hover:text-[#B89868] dark:hover:text-[#C5A880] hover:bg-white dark:hover:bg-stone-850 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans font-semibold cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
