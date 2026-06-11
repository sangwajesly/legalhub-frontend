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
      let token: string | null = null;

      const isLocalMode = process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true';

      // 1. Try to get token from Firebase if user is logged in (only if NOT in local database mode)
      if (!isLocalMode) {
        const user = auth.currentUser;
        if (user) {
          try {
            token = await user.getIdToken();
            console.log('Firebase ID token retrieved.');
          } catch (error) {
            console.error('Error getting Firebase ID token:', error);
          }
        }
      }

      // 2. Fallback to Zustand store/localStorage if Firebase not ready or user not in Firebase
      if (!token) {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          try {
            const { state } = JSON.parse(authStorage);
            if (state && state.token) {
              token = state.token;
              console.log('Token from auth-storage retrieved.');
            }
          } catch (e) {
            console.error('Error parsing auth-storage:', e);
          }
        }
      }

      // 3. Last fallback to legacy auth_token
      if (!token) {
          token = localStorage.getItem('auth_token');
          if (token) console.log('Token from legacy localStorage retrieved.');
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        console.error(`API Error [${status}]:`, error.response?.data || error.message);

        // Handle 401 Unauthorized - clear state and redirect to login
        if (status === 401 && typeof window !== 'undefined') {
          console.warn('401 Unauthorized detected.');

          const requestUrl: string = error.config?.url || '';
          // Don't hard-redirect for auth-check endpoints — these are background
          // session hydration calls. A failure here should just clear state, not navigate.
          const isAuthCheck =
            requestUrl.includes('/auth/me') ||
            requestUrl.includes('/auth/verify-token') ||
            requestUrl.includes('/auth/profile');

          // Always clear tokens so the next request won't send a stale one
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');

          if (!isAuthCheck) {
            // Only wipe persisted Zustand state and redirect when it's a "real"
            // protected resource being denied (i.e. not a background auth-check).
            localStorage.removeItem('auth-storage');

            if (
              !window.location.pathname.includes('/login') &&
              !window.location.pathname.includes('/signup')
            ) {
              window.location.href = '/login';
            }
          }
        }

        return Promise.reject(error.response?.data || error);
      }
    );
  }

  // Helper to normalize user object (handling _id vs id / uid vs id / displayName vs name)
  private normalizeUser(userData: any): User {
      if (!userData) return userData;
      if (userData.uid && !userData.id) {
          userData.id = userData.uid;
      }
      if (userData._id && !userData.id) {
          userData.id = userData._id;
      }
      if (userData.displayName && !userData.name) {
          userData.name = userData.displayName;
      }
      if (userData.display_name && !userData.name) {
          userData.name = userData.display_name;
      }
      return userData as User;
  }

  // Helper to normalize booking object
  private normalizeBooking(b: any): Booking {
    if (!b) return b;
    return {
      id: b.bookingId || b.booking_id || b.id || '',
      lawyerId: b.lawyerId || b.lawyer_id || '',
      userId: b.userId || b.user_id || '',
      scheduledAt: b.scheduledAt || b.scheduled_at || '',
      duration: b.duration || 30,
      type: b.consultationType === 'meeting' || b.consultation_type === 'meeting' ? 'in-person' : 'video',
      status: b.status || 'pending',
      notes: b.notes || '',
      location: b.location || '',
      createdAt: b.createdAt || b.created_at || '',
      clientName: b.clientName || b.client_name || '',
      clientEmail: b.clientEmail || b.client_email || '',
      lawyerName: b.lawyerName || b.lawyer_name || '',
      lawyerEmail: b.lawyerEmail || b.lawyer_email || '',
      lawyerAvatar: b.lawyerAvatar || b.lawyer_avatar || b.lawyerImage || '',
      fee: b.fee !== undefined ? b.fee : 0,
      paymentMethod: b.paymentMethod || b.payment_method || '',
    };
  }

  // Helper to normalize lawyer profile object
  private normalizeLawyer(l: any): Lawyer {
      if (!l) return l;
      return {
          id: l.uid || l.id || '',
          name: l.displayName || l.name || l.display_name || 'Advocate',
          email: l.email || '',
          specialization: l.practiceAreas || l.practice_areas || l.specialization || [],
          location: l.location || 'Unknown',
          rating: l.rating !== undefined && l.rating !== null ? l.rating : 5.0,
          reviewCount: l.numReviews !== undefined && l.numReviews !== null ? l.numReviews : (l.num_reviews !== undefined && l.num_reviews !== null ? l.num_reviews : 0),
          yearsOfExperience: l.yearsExperience !== undefined && l.yearsExperience !== null ? l.yearsExperience : (l.years_experience !== undefined && l.years_experience !== null ? l.years_experience : 0),
          hourlyRate: l.hourlyRate !== undefined && l.hourlyRate !== null ? l.hourlyRate : (l.hourly_rate !== undefined && l.hourly_rate !== null ? l.hourly_rate : 0),
          avatar: l.profilePicture || l.profile_picture || l.avatar || undefined,
          bio: l.bio || '',
          verified: !!l.verified,
          availability: l.availability !== undefined ? l.availability : true,
          licenseNumber: l.licenseNumber || l.license_number || '',
      } as unknown as Lawyer;
  }

  // Helper to normalize article object
  private normalizeArticle(a: any): Article {
      if (!a) return a;
      return {
          id: a.articleId || a.id || '',
          title: a.title || '',
          content: a.content || '',
          author: {
              id: a.authorId || a.author?.id || '',
              name: a.authorName || a.author?.name || 'Advocate',
              avatar: a.authorAvatar || a.author?.avatar || undefined,
              isLawyer: a.author?.isLawyer !== undefined ? a.author.isLawyer : true
          },
          category: a.category || 'General',
          tags: a.tags || [],
          likes: a.likesCount !== undefined ? a.likesCount : (a.likes || 0),
          commentCount: a.commentCount || 0,
          views: a.views || 0,
          createdAt: a.createdAt || a.created_at || new Date().toISOString(),
          updatedAt: a.updatedAt || a.updated_at || new Date().toISOString(),
      };
  }

  // ============ AUTH ENDPOINTS ============

  async verifyToken(idToken: string, extraData?: Partial<RegisterData>): Promise<AuthResponse> {
    const response = await this.client.post('/api/v1/auth/verify-token', { idToken, ...extraData });

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

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.client.post('/api/v1/auth/login', { email, password });
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

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const payload = {
      email: registerData.email,
      password: registerData.password,
      displayName: registerData.name,
      role: registerData.role || 'citizen',
      bio: registerData.bio,
      location: registerData.location,
      licenseNumber: registerData.licenseNumber,
      practiceAreas: registerData.practiceAreas,
      hourlyRate: registerData.hourlyRate,
      yearsExperience: registerData.yearsExperience,
    };
    const response = await this.client.post('/api/v1/auth/register', payload);
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

  async logout(): Promise<void> {
    try {
      await this.client.post('/api/v1/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth-storage');
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
    const payload: any = {
      display_name: data.name,
      bio: data.bio,
      phone_number: data.phone,
      location: data.location,
      profile_picture: data.avatar,
    };

    // Remove undefined values to prevent overwriting values with nulls
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const response = await this.client.patch<User>('/api/v1/users/profile', payload);
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
    const response = await this.client.get<any>('/api/v1/lawyers', {
      params: { ...filters, page, limit }
    });
    const data = response.data;
    const rawLawyers = data.lawyers || [];
    const normalizedLawyers = rawLawyers.map((l: any) => this.normalizeLawyer(l));
    return {
      success: true,
      data: normalizedLawyers,
      pagination: {
        page: data.page || page,
        limit: data.pageSize || limit,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || limit))
      }
    };
  }

  async getPendingLawyers(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Lawyer>> {
    const response = await this.client.get<any>('/api/v1/lawyers/pending', {
      params: { page, limit }
    });
    const data = response.data;
    const rawLawyers = data.lawyers || [];
    const normalizedLawyers = rawLawyers.map((l: any) => this.normalizeLawyer(l));
    return {
      success: true,
      data: normalizedLawyers,
      pagination: {
        page: data.page || page,
        limit: data.pageSize || limit,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || limit))
      }
    };
  }

  async verifyLawyer(lawyerId: string, verified: boolean = true): Promise<Lawyer> {
    const response = await this.client.put<any>(`/api/v1/lawyers/${lawyerId}/verify`, null, {
      params: { verified }
    });
    return this.normalizeLawyer(response.data);
  }

  async getLawyerById(id: string): Promise<Lawyer> {
    const response = await this.client.get<any>(`/api/v1/lawyers/${id}`);
    return this.normalizeLawyer(response.data);
  }

  async updateLawyerProfile(id: string, data: Partial<Lawyer>): Promise<Lawyer> {
    const response = await this.client.put<any>(`/api/v1/lawyers/${id}`, {
      displayName: data.name,
      bio: data.bio,
      location: data.location,
      practiceAreas: data.specialization,
      hourlyRate: data.hourlyRate,
      licenseNumber: data.licenseNumber,
      yearsExperience: data.yearsOfExperience,
    });
    return this.normalizeLawyer(response.data);
  }

  async searchLawyers(query: string): Promise<Lawyer[]> {
    // FIX: Use regular lawyers endpoint with query params instead of /search
    const response = await this.client.get<any>('/api/v1/lawyers', {
      params: { q: query, page: 1, limit: 20 }
    });
    const rawLawyers = response.data.lawyers || [];
    return rawLawyers.map((l: any) => this.normalizeLawyer(l));
  }

  // ============ BOOKING ENDPOINTS ============

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const payload = {
      lawyerId: booking.lawyerId,
      userId: booking.userId,
      scheduledAt: booking.scheduledAt,
      duration: booking.duration,
      consultationType: booking.type === 'video' ? 'video' : 'meeting',
      notes: booking.notes,
      location: booking.location,
      fee: booking.fee,
      paymentMethod: booking.paymentMethod,
    };
    const response = await this.client.post<any>('/api/v1/bookings', payload);
    return this.normalizeBooking(response.data);
  }

  async getBooking(bookingId: string): Promise<Booking> {
    const response = await this.client.get<any>(`/api/v1/bookings/${bookingId}`);
    return this.normalizeBooking(response.data);
  }

  async getUserBookings(userId: string, page: number = 1): Promise<PaginatedResponse<Booking>> {
    // FIX: Updated endpoint structure to match backend
    const response = await this.client.get<any>(`/api/v1/bookings/user/${userId}`, {
      params: { page }
    });
    const data = response.data;
    const rawBookings = data.bookings || [];
    return {
      success: true,
      data: rawBookings.map((b: any) => this.normalizeBooking(b)),
      pagination: {
        page: data.page || page,
        limit: data.pageSize || 20,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || 20))
      }
    };
  }

  async getLawyerBookings(lawyerId: string, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Booking>> {
    const response = await this.client.get<any>(`/api/v1/lawyers/${lawyerId}/bookings`, {
      params: { page, limit }
    });
    const data = response.data;
    const rawBookings = data.bookings || [];
    return {
      success: true,
      data: rawBookings.map((b: any) => this.normalizeBooking(b)),
      pagination: {
        page: data.page || page,
        limit: data.pageSize || limit,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || limit))
      }
    };
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    // FIX: Changed from PATCH to PUT to match backend
    const payload: any = { ...updates };
    if (updates.type !== undefined) {
      payload.consultationType = updates.type === 'video' ? 'video' : 'meeting';
      delete payload.type;
    }
    const response = await this.client.put<any>(`/api/v1/bookings/${id}`, payload);
    return this.normalizeBooking(response.data);
  }

  async updateBookingStatus(bookingId: string, status: string, notes?: string, cancellationReason?: string): Promise<Booking> {
    const response = await this.client.put<any>(`/api/v1/bookings/${bookingId}/status`, {
      status,
      notes,
      cancellationReason
    });
    return this.normalizeBooking(response.data);
  }

  async cancelBooking(id: string, reason?: string): Promise<void> {
    // FIX: Changed from POST to PUT to match backend
    await this.client.put(`/api/v1/bookings/${id}/cancel`, { reason });
  }

  // ============ ARTICLE ENDPOINTS ============

  async getArticles(filters?: ArticleFilter, page: number = 1): Promise<PaginatedResponse<Article>> {
    const response = await this.client.get<any>('/api/v1/articles', {
      params: { ...filters, page }
    });
    const data = response.data;
    const rawArticles = data.articles || [];
    const normalizedArticles = rawArticles.map((a: any) => this.normalizeArticle(a));
    return {
      success: true,
      data: normalizedArticles,
      pagination: {
        page: data.page || page,
        limit: data.pageSize || 20,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || 20))
      }
    };
  }

  async getArticleById(id: string): Promise<Article> {
    const response = await this.client.get<any>(`/api/v1/articles/${id}`);
    return this.normalizeArticle(response.data);
  }

  async createArticle(article: Omit<Article, 'id' | 'likes' | 'createdAt' | 'updatedAt'> & { published?: boolean }): Promise<Article> {
    const payload = {
      title: article.title,
      content: article.content,
      tags: article.tags || [],
      published: article.published ?? true,
      category: article.category || 'General'
    };
    const response = await this.client.post<any>('/api/v1/articles', payload);
    return this.normalizeArticle(response.data);
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const response = await this.client.patch<any>(`/api/v1/articles/${id}`, updates);
    return this.normalizeArticle(response.data);
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

  async claimCase(caseId: string): Promise<Case> {
    const response = await this.client.post<Case>(`/api/v1/cases/${caseId}/claim`);
    return response.data;
  }

  async getCases(filters?: Record<string, any>, page: number = 1): Promise<PaginatedResponse<Case>> {
    const response = await this.client.get<any>('/api/v1/cases', {
      params: { ...filters, page }
    });
    const data = response.data;
    return {
      success: true,
      data: data.cases || [],
      pagination: {
        page: data.page || page,
        limit: data.pageSize || 20,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || 20))
      }
    };
  }

  async getCaseById(id: string): Promise<Case> {
    const response = await this.client.get<Case>(`/api/v1/cases/${id}`);
    return response.data;
  }

  async getUserCases(userId: string, page: number = 1): Promise<PaginatedResponse<Case>> {
    // FIX: Updated to match backend structure
    const response = await this.client.get<any>(`/api/v1/cases/user/${userId}`, {
      params: { page }
    });
    const data = response.data;
    return {
      success: true,
      data: data.cases || [],
      pagination: {
        page: data.page || page,
        limit: data.pageSize || 20,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / (data.pageSize || 20))
      }
    };
  }

  async updateCaseStatus(id: string, status: Case['status'], notes?: string): Promise<Case> {
    const response = await this.client.put<Case>(`/api/v1/cases/${id}/status`, { 
      status,
      notes: notes || 'Status updated by administrator'
    });
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
    const response = await this.client.post<any>('/api/v1/chat/sessions', { ...sessionData, user_id: userId });
    const data = response.data;
    if (data && data.sessionId && !data.id) {
      data.id = data.sessionId;
    }
    return data as Session;
  }

  async sendMessage(sessionId: string, content: string, attachments: string[] = [], history: any[] = []): Promise<SendMessageResponse> {
    const response = await this.client.post<SendMessageResponse>(`/api/v1/chat/sessions/${sessionId}/messages`, {
      message: content,
      attachments,
      history
    });
    return response.data;
  }

  /**
   * Stateless RAG query — used for guest/local sessions that have no server-side session ID.
   * Calls POST /api/v1/chat/query and returns the RAG-augmented reply + source citations.
   */
  async queryRAG(message: string, history: any[] = [], sessionId?: string): Promise<{ reply: string; sessionId: string | null; sources: Array<{ source: string; score: number }> }> {
    const response = await this.client.post('/api/v1/chat/query', {
      message,
      history,
      session_id: sessionId || null,
      use_rag: true,
      top_k: 5,
    });
    return response.data;
  }

  async getChatHistory(sessionId: string): Promise<Message[]> {
    const response = await this.client.get<Message[]>(`/api/v1/chat/sessions/${sessionId}/messages`);
    return response.data;
  }

  async getSessions(): Promise<SessionSummary[]> {
    const response = await this.client.get<any>('/api/v1/chat/sessions');
    const data = response.data;
    const sessionsList = Array.isArray(data) ? data : data.sessions || data.data || [];
    
    return sessionsList.map((s: any) => ({
      id: s.id || s.sessionId || '',
      title: s.title || 'Chat Session',
      lastMessage: s.lastMessage || s.last_message || '',
      timestamp: s.timestamp || s.lastMessageAt || s.createdAt || new Date().toISOString()
    })) as SessionSummary[];
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
