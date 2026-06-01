'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, X, Image as ImageIcon, FileText } from 'lucide-react';
import { SuggestedPrompts } from './SuggestedPrompts';
import { useChatStore } from '@/lib/store/chat-store';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const { rateLimitCountdown } = useChatStore();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || files.length > 0) && !isLoading) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const canSend = (message.trim().length > 0 || files.length > 0) && !isLoading && rateLimitCountdown === 0;

  return (
    <div className="w-full px-4 pb-4 md:pb-6 bg-white dark:bg-[#212121]">
      <div className="max-w-3xl mx-auto">
        <SuggestedPrompts />

        <form
          onSubmit={handleSubmit}
          className="relative bg-stone-100 dark:bg-[#2f2f2f] rounded-3xl transition-all duration-200 focus-within:ring-1 focus-within:ring-stone-300 dark:focus-within:ring-stone-600"
        >
          {/* File previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white dark:bg-[#3a3a3a] px-2.5 py-1.5 rounded-xl text-xs text-stone-600 dark:text-stone-400">
                  {file.type.startsWith('image/') ? <ImageIcon size={12} /> : <FileText size={12} />}
                  <span className="max-w-[100px] truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(idx)} className="hover:text-red-500 transition-colors">
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 px-4 py-3">
            {/* Attach */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 mb-0.5 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              disabled={rateLimitCountdown > 0}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={rateLimitCountdown > 0 ? `Please wait ${rateLimitCountdown}s before sending...` : "Message LegalHub"}
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm leading-relaxed resize-none min-h-[28px] max-h-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Send */}
            <button
              type="submit"
              disabled={!canSend}
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                canSend
                  ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-100 active:scale-95'
                  : 'bg-stone-300 dark:bg-stone-600 text-stone-500 dark:text-stone-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowUp size={15} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-2">
          LegalHub can make mistakes. Verify important legal details with a local lawyer.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
