import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/types';
import apiClient from '@/lib/api-client';
import { auth, googleProvider } from '@/lib/firebase';
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

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
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    );
                    const idToken = await userCredential.user.getIdToken();
                    const response = await apiClient.verifyToken(idToken);
                    const profile = await apiClient.getProfile();

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
                    console.log('[AuthStore] Starting Google Popup Sign-in...');
                    const result = await signInWithPopup(auth, googleProvider);
                    const user = result.user;
                    const idToken = await user.getIdToken();

                    console.log('[AuthStore] Google Sign-in successful. Calling backend...');
                    const response = await apiClient.verifyToken(idToken);
                    console.log('[AuthStore] Backend login successful. Fetching profile...');
                    const profile = await apiClient.getProfile();
                    
                    console.log('[AuthStore] Profile fetched. Setting final state in Zustand store.');
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
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        data.email,
                        data.password
                    );
                    const idToken = await userCredential.user.getIdToken();

                    // The verify-token endpoint should also handle user creation on the backend
                    const response = await apiClient.verifyToken(idToken); 
                    
                    // The profile returned here will be from the backend after creation
                    const profile = await apiClient.getProfile();

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
                    await signOut(auth); // Sign out from Firebase
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
