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
  messageIndex?: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  role,
  timestamp,
  messageIndex,
}) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-fade-in group`}>
      <div className={`flex items-start max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
          isUser 
            ? 'bg-blue-600 dark:bg-teal-600 border-blue-500 dark:border-teal-500 text-white shadow-lg' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-teal-400'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-1.5">
          <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-blue-600 dark:bg-teal-600 text-white rounded-tr-none'
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-tl-none'
          }`}>
            <div className="prose dark:prose-invert prose-slate max-w-none prose-sm">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-4 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            fontSize: '0.875rem',
                            backgroundColor: '#0f172a',
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
                  p: ({ children }) => <p className="mb-0 last:mb-0 leading-relaxed tabular-nums">{children}</p>,
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
                <MessageActions messageContent={content} messageIndex={messageIndex} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
