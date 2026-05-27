import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/types';
import apiClient from '@/lib/api-client';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });
                try {
                    console.log('[AuthStore] Bypassing login with mock credentials');
                    
                    let response;
                    let profile;
                    
                    try {
                        response = await apiClient.verifyToken("mock_firebase_id_token", {
                            email: credentials.email
                        });
                        profile = await apiClient.getProfile();
                    } catch (e) {
                        console.warn('[AuthStore] Backend auth endpoints unreachable, using local mock profile:', e);
                        response = { token: "mock_access_token_demo" };
                        profile = {
                            id: "mock_citizen_demo_uid",
                            email: credentials.email || "demo@legalhub.com",
                            name: "Demo User",
                            role: "citizen" as const,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        };
                    }

                    set({
                        user: profile,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.message || 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            loginWithGoogle: async () => {
                set({ isLoading: true, error: null });
                try {
                    console.log('[AuthStore] Bypassing Google login with mock credentials');
                    
                    let response;
                    let profile;
                    
                    try {
                        response = await apiClient.verifyToken("mock_firebase_id_token");
                        profile = await apiClient.getProfile();
                    } catch (e) {
                        console.warn('[AuthStore] Backend auth endpoints unreachable, using local mock profile:', e);
                        response = { token: "mock_access_token_demo" };
                        profile = {
                            id: "mock_citizen_demo_uid",
                            email: "demo@legalhub.com",
                            name: "Demo User",
                            role: "citizen" as const,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        };
                    }
                    
                    set({
                        user: profile,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                } catch (error: any) {
                    console.error('[AuthStore] Error during Google login:', error);
                    set({
                        error: error.message || 'Google Login failed',
                        isLoading: false
                    });
                    throw error;
                }
            },

            register: async (data: RegisterData) => {
                set({ isLoading: true, error: null });
                try {
                    console.log('[AuthStore] Bypassing registration with mock credentials');
                    
                    let response;
                    let profile;
                    
                    try {
                        response = await apiClient.verifyToken("mock_firebase_id_token", {
                            name: data.name,
                            role: data.role,
                            email: data.email
                        }); 
                        profile = await apiClient.getProfile();
                    } catch (e) {
                        console.warn('[AuthStore] Backend registration endpoints unreachable, using local mock profile:', e);
                        response = { token: "mock_access_token_demo" };
                        profile = {
                            id: "mock_citizen_demo_uid",
                            email: data.email || "demo@legalhub.com",
                            name: data.name || "Demo User",
                            role: (data.role || "citizen") as any,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        };
                    }

                    set({
                        user: profile,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.message || 'Registration failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await apiClient.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            updateProfile: async (data: Partial<User>) => {
                set({ isLoading: true, error: null });
                try {
                     const updatedUser = await apiClient.updateProfile(data);
                     set({ user: updatedUser, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.message || 'Profile update failed',
                        isLoading: false
                    });
                    throw error;
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
