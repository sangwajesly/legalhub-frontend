import { create } from 'zustand';
import { Lawyer, Booking, LawyerFilter } from '@/types';
import { apiClient } from '@/lib/api-client';
import { DUMMY_LAWYERS, DUMMY_BOOKINGS } from '@/lib/mock-data';

// ---------------------------------------------------------------------------
// Client-side filter helper — applied when API falls back to dummy data
// ---------------------------------------------------------------------------
function applyFiltersLocally(
  lawyers: Lawyer[],
  filters: LawyerFilter = {},
  query = ''
): Lawyer[] {
  return lawyers.filter((l) => {
    if (query) {
      const q = query.toLowerCase();
      const match =
        l.name.toLowerCase().includes(q) ||
        l.specialization.some((s) => s.toLowerCase().includes(q)) ||
        l.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (
      filters.specialization &&
      !l.specialization.some((s) =>
        s.toLowerCase().includes(filters.specialization!.toLowerCase())
      )
    )
      return false;
    if (
      filters.location &&
      !l.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    if (filters.minRating && l.rating < filters.minRating) return false;
    if (filters.maxPrice && l.hourlyRate > filters.maxPrice) return false;
    if (
      filters.availability !== undefined &&
      l.availability !== filters.availability
    )
      return false;
    return true;
  });
}

interface LawyerStore {
  lawyers: Lawyer[];
  allLawyers: Lawyer[]; // unfiltered source for client-side filtering
  selectedLawyer: Lawyer | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: LawyerFilter;
  searchQuery: string;

  fetchLawyers: (filters?: LawyerFilter, page?: number) => Promise<void>;
  selectLawyer: (lawyerId: string) => Promise<void>;
  clearSelection: () => void;
  setFilters: (filters: LawyerFilter) => Promise<void>;
  searchLawyers: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;

  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>;
  fetchUserBookings: (userId: string) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;

  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useLawyerStore = create<LawyerStore>((set, get) => ({
  lawyers: [],
  allLawyers: [],
  selectedLawyer: null,
  bookings: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {},
  searchQuery: '',

  fetchLawyers: async (filters?: LawyerFilter, page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.getLawyers(filters, page);
      if (response.data && response.data.length > 0) {
        set({
          lawyers: response.data,
          allLawyers: response.data,
          currentPage: response.pagination.page,
          totalPages: response.pagination.totalPages,
          filters: filters || {},
          isLoading: false,
        });
      } else {
        // API returned empty — fall back to dummy data with client-side filtering
        const filtered = applyFiltersLocally(DUMMY_LAWYERS, filters);
        set({
          lawyers: filtered,
          allLawyers: DUMMY_LAWYERS,
          currentPage: 1,
          totalPages: 1,
          filters: filters || {},
          isLoading: false,
        });
      }
    } catch {
      // API failed — fall back to dummy data with client-side filtering
      const filtered = applyFiltersLocally(DUMMY_LAWYERS, filters, get().searchQuery);
      set({
        lawyers: filtered,
        allLawyers: DUMMY_LAWYERS,
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        error: null,
      });
    }
  },

  selectLawyer: async (lawyerId: string) => {
    try {
      set({ isLoading: true, error: null });
      const cached = get().lawyers.find((l) => l.id === lawyerId);
      if (cached) {
        set({ selectedLawyer: cached, isLoading: false });
        return;
      }
      const lawyer = await apiClient.getLawyerById(lawyerId);
      set({ selectedLawyer: lawyer, isLoading: false });
    } catch {
      const dummy = DUMMY_LAWYERS.find((l) => l.id === lawyerId);
      set({
        selectedLawyer: dummy ?? null,
        isLoading: false,
        error: dummy ? null : 'Failed to load lawyer profile',
      });
    }
  },

  clearSelection: () => set({ selectedLawyer: null }),

  setFilters: async (filters: LawyerFilter) => {
    set({ filters });
    await get().fetchLawyers(filters, 1);
  },

  setSearchQuery: (query: string) => {
    const { filters, allLawyers } = get();
    const source = allLawyers.length > 0 ? allLawyers : DUMMY_LAWYERS;
    const filtered = applyFiltersLocally(source, filters, query);
    set({ searchQuery: query, lawyers: filtered });
  },

  searchLawyers: async (query: string) => {
    try {
      set({ isLoading: true, error: null, searchQuery: query });
      const results = await apiClient.searchLawyers(query);
      if (results && results.length > 0) {
        set({ lawyers: results, isLoading: false });
      } else {
        const filtered = applyFiltersLocally(DUMMY_LAWYERS, get().filters, query);
        set({ lawyers: filtered, isLoading: false });
      }
    } catch {
      const filtered = applyFiltersLocally(DUMMY_LAWYERS, get().filters, query);
      set({ lawyers: filtered, isLoading: false, error: null });
    }
  },

  createBooking: async (booking) => {
    try {
      set({ isLoading: true, error: null });
      const result = await apiClient.createBooking(booking);
      set((state) => ({ bookings: [...state.bookings, result], isLoading: false }));
      return result;
    } catch (err: any) {
      set({ isLoading: false, error: err.detail || err.message || 'Failed to create booking' });
      throw err;
    }
  },

  fetchUserBookings: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiClient.getUserBookings(userId);
      set({ bookings: response.data, isLoading: false });
    } catch {
      set({ bookings: DUMMY_BOOKINGS, isLoading: false, error: null });
    }
  },

  updateBooking: async (id, updates) => {
    try {
      const result = await apiClient.updateBooking(id, updates);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? result : b)),
      }));
    } catch {
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      }));
    }
  },

  cancelBooking: async (id) => {
    try {
      await apiClient.cancelBooking(id);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
      }));
    } catch {
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
      }));
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
