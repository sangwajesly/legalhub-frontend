import { Message, Session, SessionSummary, SendMessageResponse, UploadFileResponse } from '@/types';
import apiClient from '@/lib/api-client'; // Import apiClient

export interface GetSessionsResponse {
  sessions: SessionSummary[];
}

export interface GetMessagesResponse {
  messages: Message[];
}

// Function to handle API errors consistently
const handleApiError = (error: any, defaultMessage: string) => {
  console.error('API Error:', error);
  throw new Error(error.response?.data?.message || error.message || defaultMessage);
};

export const chatApi = {
  // 1. POST /sessions - Create a New Chat Session
  createSession: async (
    sessionData: Partial<Session>,
    userId: string
  ): Promise<Session> => {
    try {
      const response = await apiClient.createSession(sessionData, userId);
      return response;
    } catch (error) {
      handleApiError(error, 'Failed to create new chat session.');
      throw error; // Re-throw to propagate the error
    }
  },

  // 2. GET /sessions - Fetch All Chat Sessions
  getSessions: async (): Promise<GetSessionsResponse> => {
    try {
      const response = await apiClient.getSessions(); // apiClient.getSessions() already returns SessionSummary[]
      return { sessions: response };
    } catch (error) {
      handleApiError(error, 'Failed to fetch chat sessions.');
      throw error;
    }
  },

  // 3. DELETE /sessions/{sessionId} - Delete a Chat Session
  deleteChatSession: async (sessionId: string): Promise<{ ok: boolean }> => {
    try {
      await apiClient.deleteChatSession(sessionId); // Use apiClient method
      return { ok: true };
    } catch (error) {
      handleApiError(error, `Failed to delete chat session ${sessionId}.`);
      throw error;
    }
  },

  // 4. POST /sessions/{sessionId}/messages - Send Message & Get Reply
  sendMessage: async (sessionId: string, message: string, attachments: string[] = []): Promise<SendMessageResponse> => {
    try {
      const response = await apiClient.sendMessage(sessionId, message, attachments); // Use apiClient method
      return response;
    } catch (error) {
      handleApiError(error, `Failed to send message in session ${sessionId}.`);
      throw error;
    }
  },

  // 5. GET /sessions/{sessionId}/messages - Get Message History
  getChatHistory: async (sessionId: string): Promise<GetMessagesResponse> => {
    try {
      const response = await apiClient.getChatHistory(sessionId); // Use apiClient method
      return { messages: response };
    } catch (error) {
      handleApiError(error, `Failed to fetch chat history for session ${sessionId}.`);
      throw error;
    }
  },

  // 6. POST /sessions/{sessionId}/messages/{messageId}/feedback - Submit Feedback
  submitFeedback: async (sessionId: string, messageId: string, rating: number, feedback?: string): Promise<{ ok: boolean }> => {
    try {
      await apiClient.submitFeedback(sessionId, messageId, rating, feedback); // Use apiClient method
      return { ok: true };
    } catch (error) {
      handleApiError(error, `Failed to submit feedback for message ${messageId} in session ${sessionId}.`);
      throw error;
    }
  },

  // 7. POST /upload - Upload File
  uploadFile: async (file: File): Promise<UploadFileResponse> => {
    try {
      const response = await apiClient.uploadFile(file); // Use apiClient method
      return response;
    } catch (error) {
      handleApiError(error, 'Failed to upload file.');
      throw error;
    }
  },
};
