'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Paperclip, X, Image as ImageIcon, FileText } from 'lucide-react';

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
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/80 dark:via-slate-950/80 to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <form 
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-blue-500/10 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 transition-all focus-within:border-blue-400 dark:focus-within:border-teal-500 overflow-hidden"
        >
          {/* File Previews */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 px-6 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 group animate-in zoom-in-50">
                  {file.type.startsWith('image/') ? <ImageIcon size={14} className="text-blue-500" /> : <FileText size={14} className="text-blue-500" />}
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[120px] truncate">{file.name}</span>
                  <button 
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end p-2 md:p-3 gap-2">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
            />

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
              placeholder="Ask a legal question..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 py-3 md:py-4 px-2 max-h-[200px] resize-none text-sm md:text-base leading-relaxed"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!message.trim() && files.length === 0)}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl transition-all ${
                (message.trim() || files.length > 0) && !isLoading
                  ? 'bg-blue-600 dark:bg-teal-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send size={20} className={message.trim() ? "translate-x-0.5" : ""} />
              )}
            </button>
          </div>
        </form>
        
        {/* Under-input notice */}
        <p className="text-[10px] text-center mt-3 text-slate-400 dark:text-slate-600 font-medium">
          LegalHub AI can make mistakes. Verify important legal information.
        </p>
      </div>
    </div>
  );
};
