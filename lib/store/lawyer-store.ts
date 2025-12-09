import { create } from 'zustand';
import { Lawyer, Booking, LawyerFilter } from '@/types';
import { apiClient } from '@/lib/api-client';

interface LawyerStore {
  lawyers: Lawyer[];
  selectedLawyer: Lawyer | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: LawyerFilter;

  // Lawyer management
  fetchLawyers: (filters?: LawyerFilter, page?: number) => Promise<void>;
  selectLawyer: (lawyerId: string) => Promise<void>;
  clearSelection: () => void;
  setFilters: (filters: LawyerFilter) => Promise<void>;
  searchLawyers: (query: string) => Promise<void>;

  // Booking management
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>;
  fetchUserBookings: (userId: string) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;

  // State management
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useLawyerStore = create<LawyerStore>((set, get) => ({
  lawyers: [],
  selectedLawyer: null,
  bookings: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {},

  fetchLawyers: async (filters?: LawyerFilter, page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.getLawyers(filters, page);
      set({
        lawyers: response.data,
        currentPage: response.pagination.page,
        totalPages: response.pagination.totalPages,
        filters: filters || {},
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch lawyers', isLoading: false });
    }
  },

  selectLawyer: async (lawyerId: string) => {
    try {
      set({ isLoading: true, error: null });
      const lawyer = await apiClient.getLawyerById(lawyerId);
      set({ selectedLawyer: lawyer, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load lawyer profile', isLoading: false });
    }
  },

  clearSelection: () => {
    set({ selectedLawyer: null });
  },

  setFilters: async (filters: LawyerFilter) => {
    const state = get();
    set({ filters });
    await state.fetchLawyers(filters, 1);
  },

  searchLawyers: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      const results = await apiClient.searchLawyers(query);
      set({ lawyers: results, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Search failed', isLoading: false });
    }
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const result = await apiClient.createBooking(booking);
      set((state) => ({
        bookings: [...state.bookings, result],
      }));
      return result;
    } catch (error: any) {
      set({ error: error.message || 'Failed to create booking' });
      throw error;
    }
  },

  fetchUserBookings: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.getUserBookings(userId);
      set({ bookings: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch bookings', isLoading: false });
    }
  },

  updateBooking: async (id: string, updates: Partial<Booking>) => {
    try {
      const result = await apiClient.updateBooking(id, updates);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? result : b)),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to update booking' });
    }
  },

  cancelBooking: async (id: string) => {
    try {
      await apiClient.cancelBooking(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to cancel booking' });
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
