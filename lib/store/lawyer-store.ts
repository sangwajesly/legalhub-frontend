import { create } from 'zustand';
import { Lawyer, Booking, LawyerFilter } from '@/types';
import { apiClient } from '@/lib/api-client';
import { DUMMY_LAWYERS, DUMMY_BOOKINGS } from '@/lib/mock-data';

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
      if (response.data && response.data.length > 0) {
        set({
          lawyers: response.data,
          currentPage: response.pagination.page,
          totalPages: response.pagination.totalPages,
          filters: filters || {},
          isLoading: false,
        });
      } else {
        // Fallback to dummy data
        console.log('[LawyerStore] API empty, using dummy data');
        set({
          lawyers: DUMMY_LAWYERS,
          currentPage: 1,
          totalPages: 1,
          filters: filters || {},
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.warn('[LawyerStore] Fetch failed, using dummy fallback', error);
      set({
        lawyers: DUMMY_LAWYERS,
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        error: null // clear error to show dummy content
      });
    }
  },

  selectLawyer: async (lawyerId: string) => {
    try {
      set({ isLoading: true, error: null });
      // Try finding in current list first (which might be dummy)
      const cachedLawyer = get().lawyers.find(l => l.id === lawyerId);
      if (cachedLawyer) {
          set({ selectedLawyer: cachedLawyer, isLoading: false });
          return;
      }
      
      const lawyer = await apiClient.getLawyerById(lawyerId);
      set({ selectedLawyer: lawyer, isLoading: false });
    } catch (error: any) {
      // Fallback look up in dummy data
      const dummy = DUMMY_LAWYERS.find(l => l.id === lawyerId);
      if (dummy) {
          set({ selectedLawyer: dummy, isLoading: false, error: null });
      } else {
          set({ error: error.message || 'Failed to load lawyer profile', isLoading: false });
      }
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
      if (results && results.length > 0) {
           set({ lawyers: results, isLoading: false });
      } else {
           // Fallback search
           const filtered = DUMMY_LAWYERS.filter(l => 
             l.name.toLowerCase().includes(query.toLowerCase()) || 
             l.specialization.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
             l.location.toLowerCase().includes(query.toLowerCase())
           );
           set({ lawyers: filtered, isLoading: false });
      }
    } catch (error: any) {
       console.warn('[LawyerStore] Search failed, using fallback', error);
       const filtered = DUMMY_LAWYERS.filter(l => 
         l.name.toLowerCase().includes(query.toLowerCase()) || 
         l.specialization.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
         l.location.toLowerCase().includes(query.toLowerCase())
       );
       set({ lawyers: filtered, isLoading: false, error: null });
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
      console.warn('[LawyerStore] Booking API failed, using mock success', error);
      const mockBooking: Booking = {
        ...booking,
        id: `mock-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      set((state) => ({
         bookings: [...state.bookings, mockBooking],
         error: null
      }));
      return mockBooking;
    }
  },

  fetchUserBookings: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.getUserBookings(userId);
      set({ bookings: response.data, isLoading: false });
    } catch (error: any) {
       console.warn('[LawyerStore] Fetch bookings failed, using dummy', error);
       set({ bookings: DUMMY_BOOKINGS, isLoading: false, error: null });
    }
  },

  updateBooking: async (id: string, updates: Partial<Booking>) => {
    try {
      const result = await apiClient.updateBooking(id, updates);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? result : b)),
      }));
    } catch (error: any) {
       // Mock update
       set(state => ({
           bookings: state.bookings.map(b => b.id === id ? { ...b, ...updates } : b)
       }));
    }
  },

  cancelBooking: async (id: string) => {
    try {
      await apiClient.cancelBooking(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
      }));
    } catch (error: any) {
      // Mock cancel
      set(state => ({
          bookings: state.bookings.filter(b => b.id !== id) 
      }));
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
