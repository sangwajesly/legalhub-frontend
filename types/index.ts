// Chat types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  isStreaming?: boolean;
}

export interface Session {
  id: string;
  title: string;
  user_id: string; // Link to the user
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionSummary {
  id:string;
  title: string;
  lastMessage: string;
  timestamp: string;
  status?: 'online' | 'offline';
}

// Lawyer types
export interface Lawyer {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  location: string;
  rating: number;
  reviewCount: number;
  yearsOfExperience: number;
  hourlyRate: number;
  avatar?: string;
  bio: string;
  verified: boolean;
  availability: boolean;
}

export interface LawyerFilter {
  specialization?: string;
  location?: string;
  minRating?: number;
  minExperience?: number;
  maxPrice?: number;
}

// Booking types
export interface Booking {
  id: string;
  lawyerId: string;
  userId: string;
  scheduledAt: string;
  duration: number; // in minutes
  type: 'video' | 'in-person';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

// Article types
export interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isLawyer: boolean;
  };
  category: string;
  tags: string[];
  likes: number;
  commentCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

export interface ArticleFilter {
  category?: string;
  search?: string;
  tags?: string[];
  sortBy?: 'recent' | 'popular' | 'trending';
}

// Case types
export interface Case {
  id: string;
  title: string;
  description: string;
  caseType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  jurisdiction: string;
  status: 'submitted' | 'under-review' | 'resolved';
  attachments: string[];
  isAnonymous: boolean;
  submittedBy?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface CaseSubmission {
  title: string;
  description: string;
  caseType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  jurisdiction: string;
  isAnonymous: boolean;
  attachments?: File[];
}

// Analytics types
export interface AnalyticsData {
  totalCases: number;
  casesByCategory: Record<string, number>;
  casesByLocation: Record<string, number>;
  casesBySeverity: Record<string, number>;
  resolutionRate: number;
  averageResolutionTime: number;
  trends: TrendData[];
}

export interface TrendData {
  date: string;
  count: number;
  category: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'citizen' | 'lawyer' | 'ngo' | 'government';
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  preferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile extends User {
  stats?: {
    totalBookings: number;
    totalCases: number;
    articlesRead: number;
    articlesWritten: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'citizen' | 'lawyer' | 'ngo' | 'government';
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface SendMessageResponse {
  reply: string;
  sessionId: string;
}

export interface UploadFileResponse {
  fileId: string;
}
