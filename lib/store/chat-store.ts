import { create } from 'zustand';
import { Message, Session, SessionSummary } from '@/types';
import apiClient from '@/lib/api-client';
import { useAuthStore } from './auth-store';

import { persist } from 'zustand/middleware';

interface ChatStore {
  allSessions: SessionSummary[];
  currentSessionId: string | null;
  chatHistory: Message[];
  isLoading: boolean;
  error: string | null;
  suggestedFollowUps: string[];

  // Session management
  fetchAllSessions: () => Promise<void>;
  setAllSessions: (sessions: SessionSummary[]) => void;
  createSession: (sessionData: Partial<Session>) => Promise<void>;
  setCurrentSession: (sessionId: string | null) => void;
  deleteChatSession: (sessionId: string) => Promise<void>;
  removeSession: (sessionId: string) => void;

  // Message management
  sendMessage: (content: string, attachments?: string[]) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setChatHistory: (messages: Message[]) => void;
  clearChatHistory: () => void;
  setSuggestedFollowUps: (questions: string[]) => void;

  // Conversation actions
  submitFeedback: (messageId: string, rating: number, feedback?: string) => Promise<void>;
  uploadFile: (file: File) => Promise<string>;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      allSessions: [],
      currentSessionId: null,
      chatHistory: [],
      isLoading: false,
      error: null,
      suggestedFollowUps: [],

      // ... (fetchAllSessions, setAllSessions)

      fetchAllSessions: async () => {
        const token = useAuthStore.getState().token;
        if (!token) {
          set({ allSessions: [], isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.getSessions();
          let sessions: SessionSummary[] = [];
          
          if (Array.isArray(response)) {
            sessions = response;
          } else if (response && Array.isArray((response as any).sessions)) {
            sessions = (response as any).sessions;
          } else if (response && (response as any).data && Array.isArray((response as any).data.sessions)) {
            sessions = (response as any).data.sessions;
          } else if (typeof response === 'object' && response !== null) {
            const possibleArray = Object.values(response).find(val => Array.isArray(val));
            if (possibleArray) sessions = possibleArray as SessionSummary[];
          }
          
          const validSessions = sessions.filter(s => s && s.id);
          set({ allSessions: validSessions, isLoading: false });
        } catch (error: any) {
          if (error?.response?.status === 401 || error?.status === 401) {
            set({ isLoading: false });
            return;
          }
          console.error('Fetch sessions error:', error);
          set({ error: error.message || 'Failed to fetch sessions', isLoading: false });
        }
      },

      setAllSessions: (sessions: SessionSummary[]) => {
        set({ allSessions: sessions });
      },

      createSession: async (sessionData: Partial<Session>) => {
        set({ isLoading: true, error: null, suggestedFollowUps: [] });
        const user = useAuthStore.getState().user as any;
        const userId = user?.uid || user?.id || user?._id;
        
        if (!userId) {
          set({ error: 'User not authenticated (ID missing)', isLoading: false });
          return;
        }

        try {
          const localId = crypto.randomUUID();
          let remoteSession;
          try {
             remoteSession = await apiClient.createSession(sessionData, userId);
          } catch (e) {
             console.warn('Failed to create remote session, using local ID', e);
             remoteSession = { id: localId, title: sessionData.title || 'New Chat' };
          }
          
          const sessionId = remoteSession.id || (remoteSession as any)._id || localId;
          
          const newSessionSummary: SessionSummary = {
            id: sessionId,
            title: remoteSession.title || 'New Chat',
            lastMessage: '',
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            allSessions: [newSessionSummary, ...state.allSessions],
            currentSessionId: sessionId,
            chatHistory: [],
            isLoading: false,
          }));
        } catch (error: any) {
          console.error('Create session error:', error);
          set({ error: `Failed to create session: ${error.message || 'Unknown error'}`, isLoading: false });
        }
      },

      setCurrentSession: async (sessionId: string | null) => {
        if (sessionId) {
          set({ currentSessionId: sessionId, suggestedFollowUps: [] });
          set({ isLoading: true });
          try {
            const messages = await apiClient.getChatHistory(sessionId);
            set({ chatHistory: messages, isLoading: false });
          } catch (error: any) {
            console.warn('Failed to sync history from cloud, keeping local state', error);
            set({ isLoading: false });
          }
        } else {
          set({ currentSessionId: null, chatHistory: [], suggestedFollowUps: [] });
        }
      },

      deleteChatSession: async (sessionId: string) => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.deleteChatSession(sessionId);
          get().removeSession(sessionId);
          if (get().currentSessionId === sessionId) {
            get().setCurrentSession(null);
          }
          set({ isLoading: false });
        } catch (error: any) {
          console.warn('Failed to delete on backend, removing locally', error);
          get().removeSession(sessionId);
          set({ isLoading: false });
        }
      },

      removeSession: (sessionId: string) => {
        set((state) => ({
          allSessions: state.allSessions.filter((session) => session.id !== sessionId),
        }));
      },

      sendMessage: async (content: string, attachments: string[] = []) => {
        const { currentSessionId, chatHistory } = get();
        if (!currentSessionId) {
          set({ error: 'No session selected to send message' });
          return;
        }
        
        set({ suggestedFollowUps: [] });

        const history = chatHistory.map(m => ({
            role: m.role,
            text: m.content
        }));

        const optimisticMessage: Message = {
          id: `temp-${Date.now()}`,
          content,
          role: 'user',
          timestamp: new Date().toISOString(),
        };
        
        set({ 
          chatHistory: [...chatHistory, optimisticMessage],
          isLoading: true, 
          error: null 
        });

        try {
          const response = await apiClient.sendMessage(currentSessionId, content, attachments, history);
          
          let botContent = response.reply;
          const followUpRegex = /### Suggested Follow-ups\s*\n((?:\s*-\s*.+\n?)+)/i;
          const match = botContent.match(followUpRegex);

          let followUps: string[] = [];
          if (match && match[1]) {
            followUps = match[1].split('\n').map(q => q.replace(/-\s*/, '').trim()).filter(Boolean);
            botContent = botContent.replace(followUpRegex, '').trim();
            get().setSuggestedFollowUps(followUps);
          }

          const botMessage: Message = {
            id: `bot-${Date.now()}`,
            content: botContent,
            role: 'assistant',
            timestamp: new Date().toISOString()
          };

          set((state) => ({
            chatHistory: state.chatHistory.map(m => m.id === optimisticMessage.id ? { ...m, id: `user-${Date.now()}` } : m).concat(botMessage),
            isLoading: false
          }));
          
        } catch (error: any) {
          set((state) => ({
            error: error.message || 'Could not send message.',
            isLoading: false
          }));
        }
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
      
      setSuggestedFollowUps: (questions: string[]) => {
        set({ suggestedFollowUps: questions });
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

      // ... (submitFeedback, uploadFile)

    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        allSessions: state.allSessions,
        currentSessionId: state.currentSessionId,
        chatHistory: state.chatHistory,
        suggestedFollowUps: state.suggestedFollowUps,
      }),
    }
  )
);