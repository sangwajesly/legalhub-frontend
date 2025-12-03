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
  ApiResponse,
  PaginatedResponse,
} from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // ============ CHAT ENDPOINTS ============

  async sendMessage(sessionId: string, content: string): Promise<Message> {
    const response = await this.client.post<ApiResponse<Message>>(
      '/chat/message',
      { sessionId, content }
    );
    return response.data.data!;
  }

  async getChatHistory(sessionId: string): Promise<Message[]> {
    const response = await this.client.get<ApiResponse<Message[]>>(
      `/chat/history?sessionId=${sessionId}`
    );
    return response.data.data || [];
  }

  async getChatSessions(): Promise<ChatSession[]> {
    const response = await this.client.get<ApiResponse<ChatSession[]>>('/chat/sessions');
    return response.data.data || [];
  }

  async createChatSession(): Promise<ChatSession> {
    const response = await this.client.post<ApiResponse<ChatSession>>('/chat/session');
    return response.data.data!;
  }

  async deleteChatSession(sessionId: string): Promise<void> {
    await this.client.delete(`/chat/session/${sessionId}`);
  }

  async submitFeedback(
    sessionId: string,
    messageId: string,
    rating: number,
    feedback?: string
  ): Promise<void> {
    await this.client.post('/chat/feedback', {
      sessionId,
      messageId,
      rating,
      feedback,
    });
  }

  // ============ LAWYER ENDPOINTS ============

  async getLawyers(filters?: LawyerFilter, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Lawyer>> {
    const response = await this.client.get<PaginatedResponse<Lawyer>>('/lawyers', {
      params: { ...filters, page, limit },
    });
    return response.data;
  }

  async getLawyerById(id: string): Promise<Lawyer> {
    const response = await this.client.get<ApiResponse<Lawyer>>(`/lawyers/${id}`);
    return response.data.data!;
  }

  async searchLawyers(query: string): Promise<Lawyer[]> {
    const response = await this.client.get<ApiResponse<Lawyer[]>>('/lawyers/search', {
      params: { query },
    });
    return response.data.data || [];
  }

  // ============ BOOKING ENDPOINTS ============

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const response = await this.client.post<ApiResponse<Booking>>('/bookings', booking);
    return response.data.data!;
  }

  async getUserBookings(userId: string, page: number = 1): Promise<PaginatedResponse<Booking>> {
    const response = await this.client.get<PaginatedResponse<Booking>>(
      `/bookings/user/${userId}?page=${page}`
    );
    return response.data;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const response = await this.client.put<ApiResponse<Booking>>(`/bookings/${id}`, updates);
    return response.data.data!;
  }

  async cancelBooking(id: string): Promise<void> {
    await this.client.delete(`/bookings/${id}`);
  }

  // ============ ARTICLE ENDPOINTS ============

  async getArticles(filters?: ArticleFilter, page: number = 1): Promise<PaginatedResponse<Article>> {
    const response = await this.client.get<PaginatedResponse<Article>>('/articles', {
      params: { ...filters, page },
    });
    return response.data;
  }

  async getArticleById(id: string): Promise<Article> {
    const response = await this.client.get<ApiResponse<Article>>(`/articles/${id}`);
    return response.data.data!;
  }

  async createArticle(article: Omit<Article, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    const response = await this.client.post<ApiResponse<Article>>('/articles', article);
    return response.data.data!;
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const response = await this.client.put<ApiResponse<Article>>(`/articles/${id}`, updates);
    return response.data.data!;
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
    const formData = new FormData();
    formData.append('title', caseData.title);
    formData.append('description', caseData.description);
    formData.append('caseType', caseData.caseType);
    formData.append('severity', caseData.severity);
    formData.append('location', caseData.location);
    formData.append('jurisdiction', caseData.jurisdiction);
    formData.append('isAnonymous', String(caseData.isAnonymous));

    if (caseData.attachments) {
      caseData.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await this.client.post<ApiResponse<Case>>('/cases', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data!;
  }

  async getCaseById(id: string): Promise<Case> {
    const response = await this.client.get<ApiResponse<Case>>(`/cases/${id}`);
    return response.data.data!;
  }

  async getUserCases(userId: string, page: number = 1): Promise<PaginatedResponse<Case>> {
    const response = await this.client.get<PaginatedResponse<Case>>(
      `/cases/user/${userId}?page=${page}`
    );
    return response.data;
  }

  async updateCaseStatus(id: string, status: Case['status']): Promise<Case> {
    const response = await this.client.put<ApiResponse<Case>>(`/cases/${id}/status`, { status });
    return response.data.data!;
  }

  async uploadCaseAttachment(caseId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<ApiResponse<{ url: string }>>(
      `/cases/${caseId}/attachments`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data!.url;
  }

  // ============ ANALYTICS ENDPOINTS ============

  async getAnalytics(filters?: Record<string, any>): Promise<AnalyticsData> {
    const response = await this.client.get<ApiResponse<AnalyticsData>>('/analytics', {
      params: filters,
    });
    return response.data.data!;
  }

  async getAnalyticsReport(format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await this.client.get('/analytics/report', {
      params: { format },
      responseType: 'blob',
    });
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
