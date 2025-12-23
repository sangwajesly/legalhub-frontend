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
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent pointer-events-none z-10">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <SuggestedPrompts />
        <form 
          onSubmit={handleSubmit}
          className="bg-[#f0f4f9] dark:bg-[#1e1f20] rounded-[1.75rem] transition-all focus-within:bg-white dark:focus-within:bg-[#2d2e30] focus-within:shadow-md py-2 px-2 relative"
        >
          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-2 pb-1 mx-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white dark:bg-[#2d2e30] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 group animate-in zoom-in-50">
                  {file.type.startsWith('image/') ? <ImageIcon size={12} className="text-blue-500" /> : <FileText size={12} className="text-blue-500" />}
                  <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">{file.name}</span>
                  <button 
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 pl-2 pr-2">
             {/* Plus/Attach Button - Left aligned */}
             <div className="flex items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#444746] dark:text-[#c4c7c5] hover:bg-[#e3e3e3] dark:hover:bg-[#444746] transition-colors"
                title="Add attachment"
              >
                <Plus size={22} className="stroke-[1.5]" />
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
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-white placeholder-[#444746] dark:placeholder-[#c4c7c5] py-3 text-[1rem] leading-relaxed resize-none min-h-[48px] max-h-[200px]"
            />

            {/* Send Button - Right aligned */}
            {message.trim() || files.length > 0 ? (
               <button
               type="submit"
               disabled={isLoading}
               className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 dark:bg-[#a8c7fa] text-white dark:text-[#062e6f] hover:opacity-90 transition-all"
             >
               {isLoading ? (
                 <div className="w-5 h-5 border-2 border-white/30 dark:border-[#062e6f]/30 border-t-white dark:border-t-[#062e6f] rounded-full animate-spin"></div>
               ) : (
                 <Send size={20} className="translate-x-0.5" />
               )}
             </button>
            ) : (
               /* Show Mic or other icon when empty (Simulated for visual match) */
               <div className="w-10 h-10"></div>
            )}
           
          </div>
        </form>
        
        {/* Under-input notice */}
        <p className="text-[11px] text-center mt-3 text-[#444746] dark:text-[#c4c7c5] font-normal">
          LegalHub can make mistakes, so double-check it.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;

