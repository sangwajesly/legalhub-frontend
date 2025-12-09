'use client';

import React, { useState, useRef } from 'react';
import { Send, Plus, Mic, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsSending(true);
      await onSendMessage(input.trim());
      setInput('');
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setInput('Voice input: [Audio transcription would appear here]');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="relative bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-3xl shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
            <div className="flex items-end gap-2 px-4 py-3">
              {/* Plus Button */}
              <button
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                title="Attach file"
              >
                <Plus size={20} className="text-slate-500 dark:text-slate-400" />
              </button>

              {/* Textarea */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message LegalHub"
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none max-h-48 min-h-[48px]"
                rows={2}
                disabled={isLoading || isSending || isRecording}
              />

              {/* Voice/Send Button */}
              {input.trim() ? (
                <button
                  onClick={handleSend}
                  disabled={isLoading || isSending}
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
                  disabled={isLoading}
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
