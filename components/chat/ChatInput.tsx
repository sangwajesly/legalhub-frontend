'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Mic, Square, X } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store'; // Import useChatStore

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: string[]) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string }[]>([]); // To store file IDs and names
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input

  const { uploadFile, setIsLoading: setStoreIsLoading } = useChatStore(); // Get uploadFile from store

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  const handleSend = async () => {
    if ((!input.trim() && uploadedFiles.length === 0) || isLoading) return;

    try {
      setIsSending(true);
      const fileIds = uploadedFiles.map(f => f.id);
      await onSendMessage(input.trim(), fileIds.length > 0 ? fileIds : undefined);
      setInput('');
      setUploadedFiles([]); // Clear uploaded files after sending
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = async () => {
    // ... (unchanged)
  };

  const stopRecording = () => {
    // ... (unchanged)
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input click
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStoreIsLoading(true); // Indicate global loading for upload
    try {
      const fileId = await uploadFile(file);
      setUploadedFiles((prev) => [...prev, { id: fileId, name: file.name }]);
    } catch (error) {
      console.error('Error uploading file:', error);
      // Display error to user via toast or similar
    } finally {
      setStoreIsLoading(false); // End global loading
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter(f => f.id !== fileId));
  };

  const canSendMessage = (input.trim() || uploadedFiles.length > 0) && !isLoading && !isSending;

  return (
    <div className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
      <div className="max-w-3xl mx-auto">
        {uploadedFiles.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {uploadedFiles.map((file) => (
              <span key={file.id} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                {file.name}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
            <div className="flex items-end gap-2 px-4 py-3">
              {/* Plus Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleFileButtonClick}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                title="Attach file"
                disabled={isLoading || isSending || isRecording}
              >
                <Plus size={20} className="text-slate-500 dark:text-slate-400" />
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message LegalHub"
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none max-h-48 min-h-[48px]"
                rows={2}
                disabled={isLoading || isSending || isRecording}
              />

              {/* Voice/Send Button */}
              {input.trim() || uploadedFiles.length > 0 ? (
                <button
                  onClick={handleSend}
                  disabled={!canSendMessage}
                  className="p-1.5 bg-black dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-black dark:disabled:hover:bg-teal-600 flex-shrink-0"
                  title="Send message"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              ) : (
                <button
                  onClick={handleVoiceClick}
                  disabled={isLoading || isSending}
                  className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  title={isRecording ? 'Stop recording' : 'Voice input'}
                >
                  {isRecording ? <Square size={18} /> : <Mic size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {isRecording ? 'Recording... Click to stop' : 'LegalHub can make mistakes. Check important info.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
