import axios, { AxiosInstance } from 'axios';
import {
  Message,
  Session, // Changed from ChatSession
  Lawyer,
  LawyerFilter,
  Booking,
  Article,
  ArticleFilter,
  Case,
  CaseSubmission,
  AnalyticsData,
  PaginatedResponse,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  SessionSummary,
  SendMessageResponse,
  UploadFileResponse,
} from '@/types';

import { auth } from './firebase'; // Import Firebase auth instance

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    // All requests will be relative to the current domain, pointing to the Next.js API proxy
    this.baseURL = '';

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor - add auth token
    this.client.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Firebase ID token attached to request.');
        } catch (error) {
          console.error('Error getting Firebase ID token:', error);
          // Optionally handle the error, e.g., by logging out the user
        }
      } else {
        // Fallback for non-Firebase auth or initial load
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          if (state && state.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
            console.log('Fallback token from localStorage attached.');
          }
        }
      }

      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);

        // Handle 401 Unauthorized - redirect to login
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          // More robust logout logic can be centralized here
          // For now, just remove local token and redirect
          localStorage.removeItem('auth_token'); // Also clear legacy token if present
          // Consider using a more integrated auth state management logout function
          if (!window.location.pathname.includes('/login')) {
            // window.location.href = '/login';
            console.warn('Redirect to login commented out for debugging.');
          }
        }

        return Promise.reject(error.response?.data || error);
      }
    );
  }

  // Helper to normalize user object (handling _id vs id)
  private normalizeUser(userData: any): User {
      if (!userData) return userData;
      if (userData._id && !userData.id) {
          userData.id = userData._id;
      }
      return userData as User;
  }

  // ============ AUTH ENDPOINTS ============
  // Auth endpoints use /api/auth (no version prefix)

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post('/api/v1/auth/login', credentials);

    // Handle nested response structure from backend
    const data = response.data;
    const authData: AuthResponse = {
      user: this.normalizeUser(data.user),
      token: data.tokens?.access_token || data.token,
      refreshToken: data.tokens?.refresh_token || data.refreshToken
    };

    if (authData.token) {
      localStorage.setItem('auth_token', authData.token);
    }

    return authData;
  }

  async verifyToken(idToken: string): Promise<AuthResponse> {
    const response = await this.client.post('/api/v1/auth/verify-token', { idToken });

    const data = response.data;
    const authData: AuthResponse = {
      user: this.normalizeUser(data.user),
      token: data.tokens?.access_token || data.token,
      refreshToken: data.tokens?.refresh_token || data.refreshToken
    };

    if (authData.token) {
      localStorage.setItem('auth_token', authData.token);
    }

    return authData;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.client.post('/api/v1/auth/register', data);

    const authData: AuthResponse = {
      user: this.normalizeUser(response.data.user),
      token: response.data.tokens?.access_token || response.data.token,
      refreshToken: response.data.tokens?.refresh_token || response.data.refreshToken
    };

    if (authData.token) {
      localStorage.setItem('auth_token', authData.token);
    }

    return authData;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/api/v1/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    // FIX: Changed from /auth/refresh-token to /auth/refresh
    const response = await this.client.post('/api/v1/auth/refresh', {
      refresh_token: refreshToken
    });

    const token = response.data.access_token || response.data.token;
    if (token) {
      localStorage.setItem('auth_token', token);
    }

    return { token };
  }

  async getProfile(): Promise<User> {
    // FIX: Changed from /auth/profile to /auth/me
    const response = await this.client.get<any>('/api/v1/auth/me');
    return this.normalizeUser(response.data);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    // Using users endpoint for profile updates
    const response = await this.client.patch<User>('/api/v1/users/profile', data);
    return this.normalizeUser(response.data);
  }

  async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await this.client.post<{ url: string }>('/api/v1/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getUserStats(userId: string): Promise<any> {
    const response = await this.client.get(`/api/v1/users/${userId}/stats`);
    return response.data;
  }

  // ============ LAWYER ENDPOINTS ============
  // All use /api/v1/ prefix

  async getLawyers(filters?: LawyerFilter, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Lawyer>> {
    const response = await this.client.get<PaginatedResponse<Lawyer>>('/api/v1/lawyers', {
      params: { ...filters, page, limit }
    });
    return response.data;
  }

  async getLawyerById(id: string): Promise<Lawyer> {
    const response = await this.client.get<Lawyer>(`/api/v1/lawyers/${id}`);
    return response.data;
  }

  async searchLawyers(query: string): Promise<Lawyer[]> {
    // FIX: Use regular lawyers endpoint with query params instead of /search
    const response = await this.client.get<PaginatedResponse<Lawyer>>('/api/v1/lawyers', {
      params: { q: query, page: 1, limit: 20 }
    });
    return response.data.data || [];
  }

  // ============ BOOKING ENDPOINTS ============

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const response = await this.client.post<Booking>('/api/v1/bookings', booking);
    return response.data;
  }

  async getUserBookings(userId: string, page: number = 1): Promise<PaginatedResponse<Booking>> {
    // FIX: Updated endpoint structure to match backend
    const response = await this.client.get<PaginatedResponse<Booking>>(`/api/v1/bookings/user/${userId}`, {
      params: { page }
    });
    return response.data;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    // FIX: Changed from PATCH to PUT to match backend
    const response = await this.client.put<Booking>(`/api/v1/bookings/${id}`, updates);
    return response.data;
  }

  async cancelBooking(id: string, reason?: string): Promise<void> {
    // FIX: Changed from POST to PUT to match backend
    await this.client.put(`/api/v1/bookings/${id}/cancel`, { reason });
  }

  // ============ ARTICLE ENDPOINTS ============

  async getArticles(filters?: ArticleFilter, page: number = 1): Promise<PaginatedResponse<Article>> {
    const response = await this.client.get<PaginatedResponse<Article>>('/api/v1/articles', {
      params: { ...filters, page }
    });
    return response.data;
  }

  async getArticleById(id: string): Promise<Article> {
    const response = await this.client.get<Article>(`/api/v1/articles/${id}`);
    return response.data;
  }

  async createArticle(article: Omit<Article, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    const response = await this.client.post<Article>('/api/v1/articles', article);
    return response.data;
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const response = await this.client.patch<Article>(`/api/v1/articles/${id}`, updates);
    return response.data;
  }

  async deleteArticle(id: string): Promise<void> {
    await this.client.delete(`/api/v1/articles/${id}`);
  }

  async likeArticle(id: string): Promise<void> {
    await this.client.post(`/api/v1/articles/${id}/like`);
  }

  async addComment(id: string, comment: string): Promise<void> {
    await this.client.post(`/api/v1/articles/${id}/comments`, { content: comment });
  }

  // ============ CASE ENDPOINTS ============

  async submitCase(caseData: CaseSubmission): Promise<Case> {
    const response = await this.client.post<Case>('/api/v1/cases', caseData);
    return response.data;
  }

  async getCases(filters?: Record<string, any>, page: number = 1): Promise<PaginatedResponse<Case>> {
    const response = await this.client.get<PaginatedResponse<Case>>('/api/v1/cases', {
      params: { ...filters, page }
    });
    return response.data;
  }

  async getCaseById(id: string): Promise<Case> {
    const response = await this.client.get<Case>(`/api/v1/cases/${id}`);
    return response.data;
  }

  async getUserCases(userId: string, page: number = 1): Promise<PaginatedResponse<Case>> {
    // FIX: Updated to match backend structure
    const response = await this.client.get<PaginatedResponse<Case>>(`/api/v1/cases/user/${userId}`, {
      params: { page }
    });
    return response.data;
  }

  async updateCaseStatus(id: string, status: Case['status']): Promise<Case> {
    const response = await this.client.patch<Case>(`/api/v1/cases/${id}/status`, { status });
    return response.data;
  }

  async uploadCaseAttachment(caseId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post<{ url: string }>(`/api/v1/cases/${caseId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  }

  // ============ CHAT ENDPOINTS ============
  // FIX: Updated all chat endpoints to use /sessions/ structure

  async createSession(sessionData: Partial<Session>, userId: string): Promise<Session> {
    const response = await this.client.post<Session>('/api/v1/chat/sessions', { ...sessionData, user_id: userId });
    return response.data;
  }

  async sendMessage(sessionId: string, content: string, attachments: string[] = [], history: any[] = []): Promise<SendMessageResponse> {
    const response = await this.client.post<SendMessageResponse>(`/api/v1/chat/sessions/${sessionId}/messages`, {
      message: content, // Changed from content to message to match backend schema preference observed in conflicts
      attachments,
      history
    });
    return response.data;
  }

  async getChatHistory(sessionId: string): Promise<Message[]> {
    const response = await this.client.get<Message[]>(`/api/v1/chat/sessions/${sessionId}/messages`);
    return response.data;
  }

  async getSessions(): Promise<SessionSummary[]> {
    const response = await this.client.get<SessionSummary[]>('/api/v1/chat/sessions');
    return response.data;
  }

  async deleteChatSession(sessionId: string): Promise<void> {
    await this.client.delete(`/api/v1/chat/sessions/${sessionId}`);
  }

  async submitFeedback(
    sessionId: string,
    messageId: string,
    rating: number,
    feedback?: string
  ): Promise<void> {
    await this.client.post(`/api/v1/chat/sessions/${sessionId}/messages/${messageId}/feedback`, {
      rating,
      feedback
    });
  }

  async uploadFile(file: File): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post<UploadFileResponse>('/api/v1/chat/upload', formData);
    return response.data;
  }

  // ============ ANALYTICS ENDPOINTS ============

  async getAnalyticsOverview(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/api/v1/analytics/overview');
    return response.data;
  }

  async getAnalyticsCases(filters?: Record<string, any>): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/api/v1/analytics/cases', {
      params: filters
    });
    return response.data;
  }

  async getAnalyticsTrends(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/api/v1/analytics/trends');
    return response.data;
  }

  async getAnalyticsGeographic(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/api/v1/analytics/geographic');
    return response.data;
  }

  async getAnalyticsReport(format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await this.client.get('/api/v1/analytics/report', {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }

  async exportAnalyticsData(): Promise<Blob> {
    const response = await this.client.get('/api/v1/analytics/export', {
      responseType: 'blob'
    });
    return response.data;
  }

  // ============ REVIEW ENDPOINTS ============

  async submitReview(lawyerId: string, rating: number, comment: string): Promise<void> {
    await this.client.post('/api/v1/reviews', { lawyerId, rating, comment });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
