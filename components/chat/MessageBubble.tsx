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
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-fade-in group`}>
      <div className={`flex items-start max-w-[90%] md:max-w-[85%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
          isUser 
            ? 'bg-blue-600 dark:bg-teal-600 border-blue-500 dark:border-teal-500 text-white shadow-md' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-teal-400'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-1">
          <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-blue-600 dark:bg-teal-600 text-white rounded-tr-none shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
          }`}>
            <div className="prose dark:prose-invert prose-slate max-w-none prose-sm">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-xl md:text-2xl font-bold my-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-lg md:text-xl font-bold my-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-base md:text-lg font-semibold my-2" {...props} />,
                  table: ({ node, ...props }) => <table className="table-auto w-full my-4 border-collapse border border-slate-200 dark:border-slate-700" {...props} />,
                  thead: ({ node, ...props }) => <thead className="bg-slate-50 dark:bg-slate-800" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-slate-200 dark:border-slate-700 px-3 py-2" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-4 pl-4 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-4 pl-4 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-4 rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900">
                        <div className="flex items-center justify-between px-4 py-1 bg-slate-800 text-xs text-slate-400">
                          <span>{match[1]}</span>
                          <button>Copy</button>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1rem',
                            fontSize: '0.875rem',
                            backgroundColor: 'transparent',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-teal-400 font-semibold" {...props}>
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
          <div className={`flex items-center gap-3 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">{timestamp}</span>
            {!isUser && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MessageActions messageContent={content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
