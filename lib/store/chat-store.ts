import { create } from 'zustand';
import { Message, Session, SessionSummary } from '@/types';
import apiClient from '@/lib/api-client';
import { useAuthStore } from './auth-store';

interface ChatStore {
  allSessions: SessionSummary[];
  currentSessionId: string | null;
  chatHistory: Message[];
  isLoading: boolean;
  error: string | null;
  suggestedFollowUps: string[];

  // Session management
  fetchAllSessions: () => Promise<void>;
  createSession: (sessionData: Partial<Session>) => Promise<void>;
  setCurrentSession: (sessionId: string | null) => void;
  deleteChatSession: (sessionId: string) => Promise<void>;

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

export const useChatStore = create<ChatStore>()((set, get) => ({
  allSessions: [],
  currentSessionId: null,
  chatHistory: [],
  isLoading: false,
  error: null,
  suggestedFollowUps: [],

  fetchAllSessions: async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ allSessions: [], isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const sessions = await apiClient.getSessions();
      // Handle different possible response structures
      const validSessions = Array.isArray(sessions) 
        ? sessions 
        : (sessions as any).data || (sessions as any).sessions || [];
      
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

  createSession: async (sessionData: Partial<Session>) => {
    set({ isLoading: true, error: null, suggestedFollowUps: [] });
    const user = useAuthStore.getState().user;
    const userId = user?.id;
    
    if (!userId) {
      set({ error: 'User session not initialized', isLoading: false });
      return;
    }

    try {
      const remoteSession = await apiClient.createSession(sessionData, userId);
      const sessionId = remoteSession.id;
      
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
      set({ currentSessionId: sessionId, suggestedFollowUps: [], isLoading: true, chatHistory: [] });
      try {
        const messages = await apiClient.getChatHistory(sessionId);
        // Normalize messages if needed
        const normalizedMessages = (Array.isArray(messages) ? messages : (messages as any).messages || []).map((m: any) => ({
            id: m.id || m._id || String(Math.random()),
            content: m.content || m.text || m.message || '',
            role: m.role || 'assistant',
            timestamp: m.timestamp || m.createdAt || new Date().toISOString()
        }));
        set({ chatHistory: normalizedMessages, isLoading: false });
      } catch (error: any) {
        console.error('Failed to fetch chat history:', error);
        set({ error: 'Failed to load chat history', isLoading: false });
      }
    } else {
      set({ currentSessionId: null, chatHistory: [], suggestedFollowUps: [] });
    }
  },

  deleteChatSession: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteChatSession(sessionId);
      set((state) => ({
        allSessions: state.allSessions.filter((s) => s.id !== sessionId),
        currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId,
        chatHistory: state.currentSessionId === sessionId ? [] : state.chatHistory,
        isLoading: false
      }));
    } catch (error: any) {
      console.error('Delete session error:', error);
      set({ error: 'Failed to delete session', isLoading: false });
    }
  },

  sendMessage: async (content: string, attachments: string[] = []) => {
    const { currentSessionId, chatHistory } = get();
    if (!currentSessionId) {
      set({ error: 'No active session' });
      return;
    }
    
    set({ suggestedFollowUps: [] });

    // Format history for backend as expected: { role, text }
    const history = chatHistory.map(m => ({
        role: m.role,
        text: m.content
    }));

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    set({ 
      chatHistory: [...chatHistory, userMessage],
      isLoading: true, 
      error: null 
    });

    try {
      const response = await apiClient.sendMessage(currentSessionId, content, attachments, history);
      
      let botContent = response.reply;
      
      // Extract suggested follow-ups if they exist in the reply text
      const followUpRegex = /### Suggested Follow-ups\s*\n((?:\s*-\s*.+\n?)+)/i;
      const match = botContent.match(followUpRegex);

      if (match && match[1]) {
        const followUps = match[1].split('\n').map(q => q.replace(/-\s*/, '').trim()).filter(Boolean);
        botContent = botContent.replace(followUpRegex, '').trim();
        set({ suggestedFollowUps: followUps });
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botContent,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      set((state) => ({
        chatHistory: [...state.chatHistory, botMessage],
        isLoading: false
      }));

      // Update the session's last message in the sidebar
      set((state) => ({
        allSessions: state.allSessions.map(s => 
          s.id === currentSessionId 
            ? { ...s, lastMessage: content, timestamp: new Date().toISOString() } 
            : s
        )
      }));
      
    } catch (error: any) {
      console.error('Send message error:', error);
      set({
        error: error.message || 'Failed to send message',
        isLoading: false
      });
    }
  },

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  setChatHistory: (chatHistory: Message[]) => set({ chatHistory }),
  clearChatHistory: () => set({ chatHistory: [] }),
  setSuggestedFollowUps: (suggestedFollowUps: string[]) => set({ suggestedFollowUps }),

  submitFeedback: async (messageId: string, rating: number, feedback?: string) => {
    const { currentSessionId } = get();
    if (!currentSessionId) return;
    try {
      await apiClient.submitFeedback(currentSessionId, messageId, rating, feedback);
    } catch (error) {
      console.error('Feedback error:', error);
    }
  },

  uploadFile: async (file: File) => {
    try {
      const response = await apiClient.uploadFile(file);
      return response.fileId; // Adjust based on your backend response
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error;
    }
  },
}));
