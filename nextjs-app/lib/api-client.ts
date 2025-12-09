import axios, { AxiosInstance } from 'axios';
import {
  Message,
  ChatSession,
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
} from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important for cookies/sessions if used
    });

    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.headers);
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        // Optional: specific handling for 401 Unauthorized -> redirect to login
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          // window.location.href = '/login';
        }
        return Promise.reject(error.response?.data?.message || error.message);
      }
    );
  }

  // ============ CHAT ENDPOINTS ============

  async sendMessage(sessionId: string, content: string): Promise<Message> {
    const response = await this.client.post<Message>(`/chat/${sessionId}/messages`, { content });
    return response.data;
  }

  async getChatHistory(sessionId: string): Promise<Message[]> {
    const response = await this.client.get<Message[]>(`/chat/${sessionId}/messages`);
    return response.data;
  }

  async getChatSessions(): Promise<ChatSession[]> {
    const response = await this.client.get<ChatSession[]>('/chat');
    return response.data;
  }

  async createChatSession(): Promise<ChatSession> {
    const response = await this.client.post<ChatSession>('/chat');
    return response.data;
  }

  async deleteChatSession(sessionId: string): Promise<void> {
    await this.client.delete(`/chat/${sessionId}`);
  }

  async submitFeedback(
    sessionId: string,
    messageId: string,
    rating: number,
    feedback?: string
  ): Promise<void> {
    await this.client.post(`/chat/${sessionId}/messages/${messageId}/feedback`, { rating, feedback });
  }

  // ============ LAWYER ENDPOINTS ============

  async getLawyers(filters?: LawyerFilter, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Lawyer>> {
    const response = await this.client.get<PaginatedResponse<Lawyer>>('/lawyers', {
      params: { ...filters, page, limit }
    });
    return response.data;
  }

  async getLawyerById(id: string): Promise<Lawyer> {
    const response = await this.client.get<Lawyer>(`/lawyers/${id}`);
    return response.data;
  }

  async searchLawyers(query: string): Promise<Lawyer[]> {
    const response = await this.client.get<Lawyer[]>('/lawyers/search', {
      params: { q: query }
    });
    return response.data;
  }

  // ============ BOOKING ENDPOINTS ============

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const response = await this.client.post<Booking>('/bookings', booking);
    return response.data;
  }

  async getUserBookings(userId: string, page: number = 1): Promise<PaginatedResponse<Booking>> {
    // Assuming endpoint is /bookings/user/:userId OR just /bookings/my if using token
    // Going with explicit route based on function signature, or better yet, filtered /bookings
    const response = await this.client.get<PaginatedResponse<Booking>>('/bookings', {
      params: { userId, page }
    });
    return response.data;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const response = await this.client.patch<Booking>(`/bookings/${id}`, updates);
    return response.data;
  }

  async cancelBooking(id: string): Promise<void> {
    await this.client.post(`/bookings/${id}/cancel`);
  }

  // ============ ARTICLE ENDPOINTS ============

  async getArticles(filters?: ArticleFilter, page: number = 1): Promise<PaginatedResponse<Article>> {
    const response = await this.client.get<PaginatedResponse<Article>>('/articles', {
      params: { ...filters, page }
    });
    return response.data;
  }

  async getArticleById(id: string): Promise<Article> {
    const response = await this.client.get<Article>(`/articles/${id}`);
    return response.data;
  }

  async createArticle(article: Omit<Article, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    const response = await this.client.post<Article>('/articles', article);
    return response.data;
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const response = await this.client.patch<Article>(`/articles/${id}`, updates);
    return response.data;
  }

  async deleteArticle(id: string): Promise<void> {
    await this.client.delete(`/articles/${id}`);
  }

  async likeArticle(id: string): Promise<void> {
    await this.client.post(`/articles/${id}/like`);
  }

  async addComment(id: string, comment: string): Promise<void> {
    await this.client.post(`/articles/${id}/comments`, { content: comment });
  }

  // ============ CASE ENDPOINTS ============

  async submitCase(caseData: CaseSubmission): Promise<Case> {
    const response = await this.client.post<Case>('/cases', caseData);
    return response.data;
  }

  async getCases(filters?: Record<string, any>, page: number = 1): Promise<PaginatedResponse<Case>> {
    const response = await this.client.get<PaginatedResponse<Case>>('/cases', {
      params: { ...filters, page }
    });
    return response.data;
  }

  async getCaseById(id: string): Promise<Case> {
    const response = await this.client.get<Case>(`/cases/${id}`);
    return response.data;
  }

  async getUserCases(userId: string, page: number = 1): Promise<PaginatedResponse<Case>> {
    const response = await this.client.get<PaginatedResponse<Case>>('/cases', {
      params: { userId, page }
    });
    return response.data;
  }

  async updateCaseStatus(id: string, status: Case['status']): Promise<Case> {
    const response = await this.client.patch<Case>(`/cases/${id}/status`, { status });
    return response.data;
  }

  async uploadCaseAttachment(caseId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post<{ url: string }>(`/cases/${caseId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  }

  // ============ ANALYTICS ENDPOINTS ============

  async getAnalyticsOverview(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/analytics/overview');
    return response.data;
  }

  async getAnalyticsCases(filters?: Record<string, any>): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/analytics/cases', { params: filters });
    return response.data;
  }

  async getAnalyticsTrends(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/analytics/trends');
    return response.data;
  }

  async getAnalyticsGeographic(): Promise<AnalyticsData> {
    const response = await this.client.get<AnalyticsData>('/analytics/geographic');
    return response.data;
  }

  async getAnalyticsReport(format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await this.client.get('/analytics/report', {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  }

  async exportAnalyticsData(): Promise<Blob> {
    const response = await this.client.get('/analytics/export', { responseType: 'blob' });
    return response.data;
  }

  // ============ AUTH ENDPOINTS ============

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/google', { idToken });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async refreshToken(token: string): Promise<{ token: string }> {
    const response = await this.client.post<{ token: string }>('/auth/refresh-token', { token });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.client.get<User>('/auth/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.client.patch<User>('/auth/profile', data);
    return response.data;
  }

  // ============ REVIEW ENDPOINTS ============

  async submitReview(lawyerId: string, rating: number, comment: string): Promise<void> {
    await this.client.post('/reviews', { lawyerId, rating, comment });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
