'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-2 group`}>
      <div className={`flex flex-col ${isUser ? 'items-end max-w-[75%] md:max-w-[65%]' : 'items-start w-full max-w-3xl'}`}>
        {/* Bubble */}
        <div className={`text-sm leading-relaxed ${
          isUser
            ? 'bg-stone-100 dark:bg-[#2f2f2f] text-stone-900 dark:text-stone-100 px-4 py-3 rounded-3xl rounded-br-md'
            : 'text-stone-800 dark:text-stone-100 px-2 py-1'
        }`}>
          {isUser ? (
            <p>{content}</p>
          ) : (
            <div className="prose dark:prose-invert max-w-none prose-sm">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-base font-bold my-2.5" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-sm font-semibold my-2" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-stone-300 dark:border-stone-600 pl-4 my-3 italic text-stone-600 dark:text-stone-400" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3">
                      <table className="table-auto w-full border-collapse text-xs" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => <th className="border border-stone-200 dark:border-stone-700 px-3 py-2 text-left font-semibold bg-stone-50 dark:bg-stone-800" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-stone-200 dark:border-stone-700 px-3 py-2" {...props} />,
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-3 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-stone-800 text-stone-400 text-xs">
                          <span>{match[1]}</span>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1rem 1.25rem',
                            fontSize: '0.8rem',
                            borderRadius: 0,
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-700 dark:text-stone-300 font-mono text-xs" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions — only for assistant, shown on hover */}
        {!isUser && (
          <div className="mt-1 px-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
            <MessageActions messageContent={content} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
