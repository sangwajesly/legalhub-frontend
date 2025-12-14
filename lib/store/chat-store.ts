import { create } from 'zustand';
import { Message, Session, SessionSummary } from '@/types';
import { chatApi } from '@/lib/chat-api';
import { useAuthStore } from './auth-store';

interface ChatStore {
  allSessions: SessionSummary[];
  currentSessionId: string | null;
  chatHistory: Message[];
  isLoading: boolean;
  error: string | null;

  // Session management
  fetchAllSessions: () => Promise<void>;
  setAllSessions: (sessions: SessionSummary[]) => void;

  createSession: (sessionData: Partial<Session>) => Promise<void>;

  setCurrentSession: (sessionId: string | null) => void;
  fetchChatHistory: (sessionId: string) => Promise<void>;

  deleteChatSession: (sessionId: string) => Promise<void>;
  removeSession: (sessionId: string) => void;

  // Message management
  addMessage: (message: Message) => void;
  sendMessage: (content: string, attachments?: string[]) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setChatHistory: (messages: Message[]) => void;
  clearChatHistory: () => void;

  // Conversation actions
  submitFeedback: (messageId: string, rating: number, feedback?: string) => Promise<void>;
  uploadFile: (file: File) => Promise<string>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  allSessions: [],
  currentSessionId: null,
  chatHistory: [],
  isLoading: false,
  error: null,

  fetchAllSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await chatApi.getSessions();
      set({ allSessions: response.sessions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch sessions', isLoading: false });
    }
  },

  setAllSessions: (sessions: SessionSummary[]) => {
    set({ allSessions: sessions });
  },

  createSession: async (sessionData: Partial<Session>) => {
    set({ isLoading: true, error: null });
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: 'User not authenticated', isLoading: false });
      return;
    }
    try {
      const newSession = await chatApi.createSession(sessionData, userId);
      
      const newSessionSummary: SessionSummary = {
        id: newSession.id,
        title: newSession.title,
        lastMessage: '',
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        allSessions: [newSessionSummary, ...state.allSessions], // Add to the beginning
        currentSessionId: newSession.id,
        chatHistory: [],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: `Failed to create session: ${error.message}`, isLoading: false });
    }
  },

  setCurrentSession: (sessionId: string | null) => {
    set({ currentSessionId: sessionId });
    if (sessionId) {
      get().fetchChatHistory(sessionId);
    } else {
      set({ currentSessionId: null, chatHistory: [] }); // Explicitly set currentSessionId to null
    }
  },

  fetchChatHistory: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await chatApi.getChatHistory(sessionId);
      set({ chatHistory: response.messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load chat history', isLoading: false });
    }
  },

  deleteChatSession: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      await chatApi.deleteChatSession(sessionId);
      get().removeSession(sessionId);
      if (get().currentSessionId === sessionId) {
        set({ currentSessionId: null, chatHistory: [] });
      }
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete session', isLoading: false });
    }
  },

  removeSession: (sessionId: string) => {
    set((state) => ({
      allSessions: state.allSessions.filter((session) => session.id !== sessionId),
    }));
  },

  addMessage: (message: Message) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }));
  },

  sendMessage: async (content: string, attachments: string[] = []) => {
    const { currentSessionId } = get();
    if (!currentSessionId) {
      set({ error: 'No session selected to send message' });
      return;
    }

    const userMessage: Message = {
      id: `temp-user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    get().addMessage(userMessage);

    set({ isLoading: true, error: null });

    try {
      const response = await chatApi.sendMessage(currentSessionId, content, attachments);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response.reply,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      get().addMessage(aiMessage);
    } catch (error: any) {
      get().addMessage({
        id: `error-${Date.now()}`,
        content: `Error: ${error.message || 'Could not get a response.'}`,
        role: 'system',
        timestamp: new Date().toISOString(),
      });
    } finally {
      set({ isLoading: false });
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

  setChatHistory: (messages: Message[]) => {
    set({ chatHistory: messages });
  },

  clearChatHistory: () => {
    set({ chatHistory: [] });
  },

  submitFeedback: async (messageId: string, rating: number, feedback?: string) => {
    const { currentSessionId } = get();
    if (!currentSessionId) {
      set({ error: 'No session selected for feedback' });
      return;
    }
    try {
      await chatApi.submitFeedback(currentSessionId, messageId, rating, feedback);
    } catch (error: any) {
      set({ error: error.message || 'Failed to submit feedback' });
    }
  },

  uploadFile: async (file: File): Promise<string> => {
    set({ isLoading: true, error: null });
    try {
      const response = await chatApi.uploadFile(file);
      set({ isLoading: false });
      return response.fileId;
    } catch (error: any) {
      set({ error: error.message || 'Failed to upload file', isLoading: false });
      throw error;
    }
  }
}));