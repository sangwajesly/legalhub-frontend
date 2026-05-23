'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot } from 'lucide-react';
import { MessageActions } from './MessageActions';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  role,
  timestamp,
}) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-in fade-in slide-in-from-bottom-3 duration-300 group`}>
      <div className={`flex items-start max-w-[85%] md:max-w-[80%] gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8.5 h-8.5 rounded-full flex items-center justify-center border transition-all duration-200 ${
          isUser 
            ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] border-[#1C1B19] dark:border-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] shadow-sm' 
            : 'bg-[#FDFCF9] dark:bg-stone-900 border-[#E5E2DC] dark:border-stone-800 text-[#B89868] shadow-sm'
        }`}>
          {isUser ? <User size={15} /> : <Bot size={15} />}
        </div>

        {/* Message Content & Actions Container */}
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Content Bubble */}
          <div className={`px-4.5 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] rounded-tr-sm shadow-sm'
              : 'bg-[#FDFCF9] dark:bg-stone-900/20 text-stone-850 dark:text-stone-100 border border-[#E5E2DC] dark:border-stone-850/60 rounded-tl-sm shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)]'
          }`}>
            <div className={`prose dark:prose-invert max-w-none prose-sm font-sans ${isUser ? 'prose-headings:text-[#FAF9F5] dark:prose-headings:text-[#121315]' : 'prose-headings:text-stone-900 dark:prose-headings:text-stone-50'}`}>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-base md:text-lg font-extrabold font-sans my-3 tracking-tight" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-sm md:text-base font-extrabold font-sans my-2.5 tracking-tight" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xs md:text-sm font-bold font-sans my-2" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3 -mx-1 px-1">
                      <table className="table-auto w-full border-collapse border border-[#E5E2DC] dark:border-stone-800 text-xs font-sans" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-[#FAF9F5] dark:bg-stone-900 font-semibold" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-[#E5E2DC] dark:border-stone-800 px-3 py-2 text-left font-bold text-[#B89868]" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-[#E5E2DC] dark:border-stone-800 px-3 py-2 text-stone-600 dark:text-stone-400 font-medium" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-3 pl-3 space-y-1.5 font-medium text-stone-700 dark:text-stone-300" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-3 pl-3 space-y-1.5 font-medium text-stone-700 dark:text-stone-300" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-3 last:mb-0 text-stone-800 dark:text-stone-250 font-medium leading-relaxed" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-2 border-[#B89868] pl-3.5 my-3 italic font-serif text-[#B89868] bg-[#FAF9F5]/40 dark:bg-stone-900/10 py-1 px-2 rounded-r-lg" {...props} />
                  ),
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-4 rounded-xl overflow-hidden border border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/60 shadow-sm">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#FAF9F5] dark:bg-stone-900 border-b border-[#E5E2DC]/70 dark:border-stone-800 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          <span>{match[1]}</span>
                          <span className="text-[9px] text-[#B89868] normal-case">Code Sample</span>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            fontSize: '0.8rem',
                            backgroundColor: 'transparent',
                            fontFamily: 'var(--font-mono, monospace)',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-[#FAF9F5] dark:bg-stone-850 px-1.5 py-0.5 rounded text-[#B89868] dark:text-[#C5A880] font-mono font-bold text-xs border border-[#E5E2DC]/40 dark:border-stone-800/40" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Footer: Time & Actions */}
          <div className={`flex items-center gap-3.5 px-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">{timestamp}</span>
            {!isUser && (
              <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                <MessageActions messageContent={content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
