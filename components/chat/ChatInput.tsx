'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, X, Image as ImageIcon, FileText } from 'lucide-react';

import { SuggestedPrompts } from './SuggestedPrompts';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
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

  return (
    <div className="w-full p-4 md:p-6 bg-[#FAF9F5] dark:bg-[#121315] border-t border-[#E5E2DC]/40 dark:border-stone-850/40 z-10">
      <div className="max-w-3xl mx-auto">
        <SuggestedPrompts />
        <form 
          onSubmit={handleSubmit}
          className="bg-[#FDFCF9] dark:bg-stone-900/20 border border-[#E5E2DC] dark:border-stone-850 rounded-2xl transition-all duration-300 focus-within:bg-[#FDFCF9] dark:focus-within:bg-stone-900/35 focus-within:border-[#B89868]/60 focus-within:ring-2 focus-within:ring-[#B89868]/10 focus-within:shadow-sm py-2 px-2 relative"
        >
          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-3 pt-2 pb-1 mx-1 border-b border-[#E5E2DC]/50 dark:border-stone-850/50 mb-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-[#FAF9F5] dark:bg-stone-900/60 px-2.5 py-1 rounded-xl border border-[#E5E2DC] dark:border-stone-800 group animate-in zoom-in-95 duration-200">
                  {file.type.startsWith('image/') ? (
                    <ImageIcon size={12} className="text-[#B89868]" />
                  ) : (
                    <FileText size={12} className="text-[#B89868]" />
                  )}
                  <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 max-w-[120px] truncate">{file.name}</span>
                  <button 
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-stone-400 hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-800"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 pl-1 pr-1">
             {/* Plus/Attach Button - Left aligned */}
             <div className="flex items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-500 dark:text-stone-400 hover:text-[#FAF9F5] dark:hover:text-[#121315] hover:bg-[#1C1B19] dark:hover:bg-[#FAF9F5] transition-all duration-200"
                title="Add attachment"
              >
                <Plus size={20} className="stroke-[2]" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>

            {/* Input Field */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask LegalHub..."
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-stone-900 dark:text-[#FAF9F5] placeholder-stone-450 dark:placeholder-stone-500 py-2.5 text-sm leading-relaxed resize-none min-h-[40px] max-h-[200px] font-sans"
            />

            {/* Send Button - Right aligned */}
            <div className="flex items-center">
              {message.trim() || files.length > 0 ? (
                 <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#B89868] text-white hover:bg-[#A38355] transition-all duration-200 shadow-sm active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send size={16} className="translate-x-0.5" />
                  )}
                </button>
              ) : (
                 <div className="w-10 h-10 flex items-center justify-center text-stone-300 dark:text-stone-700">
                   <Send size={16} className="opacity-40" />
                 </div>
              )}
            </div>
           
          </div>
        </form>
        
        {/* Under-input notice */}
        <p className="text-[10px] text-center mt-2.5 text-[#B89868]/70 dark:text-stone-500 font-medium tracking-wide uppercase">
          LegalHub helps guide you, but please double-check important details with a local lawyer.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;

