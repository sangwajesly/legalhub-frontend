import { create } from 'zustand';
import { Message, ChatSession } from '@/types';
import { apiClient } from '@/lib/api-client';

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  currentMessages: Message[];
  isLoading: boolean;
  error: string | null;

  // Session management
  fetchSessions: () => Promise<void>;
  createNewSession: () => Promise<void>;
  selectSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, newTitle: string) => void;

  // Message management
  addMessage: (message: Message) => void;
  sendMessage: (content: string) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Conversation actions
  regenerateResponse: (messageIndex: number) => Promise<void>;
  submitFeedback: (messageId: string, rating: number, feedback?: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  currentMessages: [],
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    try {
      set({ isLoading: true, error: null });
      const sessions = await apiClient.getChatSessions();
      set({ sessions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch sessions', isLoading: false });
    }
  },

  createNewSession: async () => {
    try {
      set({ isLoading: true, error: null });
      const newSession = await apiClient.createChatSession();
      set((state) => ({
        sessions: [newSession, ...state.sessions],
        currentSessionId: newSession.id,
        currentMessages: [],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: `Failed to create session: ${error.message}`, isLoading: false });
    }
  },

  selectSession: async (sessionId: string) => {
    try {
      set({ isLoading: true, error: null });
      const messages = await apiClient.getChatHistory(sessionId);
      set({
        currentSessionId: sessionId,
        currentMessages: messages,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load session', isLoading: false });
    }
  },

  deleteSession: async (sessionId: string) => {
    try {
      set({ isLoading: true, error: null });
      await apiClient.deleteChatSession(sessionId);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== sessionId),
        currentSessionId:
          state.currentSessionId === sessionId ? null : state.currentSessionId,
        currentMessages:
          state.currentSessionId === sessionId ? [] : state.currentMessages,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete session', isLoading: false });
    }
  },

  renameSession: (sessionId: string, newTitle: string) => {
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, title: newTitle } : s
      ),
    }));
  },

  addMessage: (message: Message) => {
    set((state) => ({
      currentMessages: [...state.currentMessages, message],
    }));
  },

  sendMessage: async (content: string) => {
    console.log('sendMessage called with content:', content);
    const state = get();
    if (!state.currentSessionId) {
      set({ error: 'No session selected' });
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
        set((state) => ({
          currentMessages: [...state.currentMessages, userMessage],
        }));
    
        // Add a placeholder for the AI response
        const assistantMessageId = (Date.now() + 1).toString();
        const assistantPlaceholder: Message = {
          id: assistantMessageId,
          content: '...',
          role: 'assistant',
          timestamp: new Date().toISOString(),
          isStreaming: true,
        };
        set((state) => ({
          currentMessages: [...state.currentMessages, assistantPlaceholder],
          isLoading: true,
          error: null,
        }));
    
        try {
          // Get AI response
          const response = await apiClient.sendMessage(state.currentSessionId, content);
    
          // Replace the placeholder with the actual response
          set((state) => ({
            currentMessages: state.currentMessages.map((message) =>
              message.id === assistantMessageId ? { ...response, isStreaming: false } : message
            ),
            isLoading: false,
          }));
        } catch (error: any) {
          // Update the placeholder with an error message
          set((state) => ({
            currentMessages: state.currentMessages.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...assistantPlaceholder,
                    content: 'Sorry, I encountered an error. Please try again.',
                    isStreaming: false,
                  }
                : message
            ),
            error: error.message || 'Failed to send message',
            isLoading: false,
          }));
        }
      },
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  regenerateResponse: async (messageIndex: number) => {
    const state = get();
    const messages = state.currentMessages;

    if (messageIndex < 0 || messageIndex >= messages.length) {
      set({ error: 'Invalid message index' });
      return;
    }

    // Find the last user message before this index
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex].role !== 'user') {
      set({ error: 'Cannot regenerate without a user message' });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const userContent = messages[userMessageIndex].content;
      const response = await apiClient.sendMessage(
        state.currentSessionId!,
        userContent
      );

      // Replace the old response with new one
      set((state) => ({
        currentMessages: [
          ...state.currentMessages.slice(0, messageIndex),
          response,
        ],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to regenerate response', isLoading: false });
    }
  },

  submitFeedback: async (messageId: string, rating: number, feedback?: string) => {
    const state = get();
    if (!state.currentSessionId) {
      set({ error: 'No session selected' });
      return;
    }

    try {
      await apiClient.submitFeedback(
        state.currentSessionId,
        messageId,
        rating,
        feedback
      );
    } catch (error: any) {
      set({ error: error.message || 'Failed to submit feedback' });
    }
  },
}));
