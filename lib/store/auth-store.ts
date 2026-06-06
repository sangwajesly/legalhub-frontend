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
                    const { signInWithEmailAndPassword } = await import('firebase/auth');
                    const { auth } = await import('@/lib/firebase');
                    
                    // 1. Sign in via Firebase Auth SDK
                    const userCredential = await signInWithEmailAndPassword(
                        auth, 
                        credentials.email, 
                        credentials.password
                    );
                    const user = userCredential.user;
                    const idToken = await user.getIdToken();
                    
                    // 2. Sync session with backend API
                    const response = await apiClient.verifyToken(idToken);
                    
                    // 3. Retrieve combined User + UserProfile from backend
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
                    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
                    const { auth } = await import('@/lib/firebase');
                    
                    // 1. Authenticate with Google Provider Popup
                    const provider = new GoogleAuthProvider();
                    const userCredential = await signInWithPopup(auth, provider);
                    const user = userCredential.user;
                    const idToken = await user.getIdToken();
                    
                    // 2. Sync session with backend
                    const response = await apiClient.verifyToken(idToken);
                    
                    // 3. Fetch user profile
                    const profile = await apiClient.getProfile();
                    
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
                    const { createUserWithEmailAndPassword, updateProfile: updateFirebaseProfile } = await import('firebase/auth');
                    const { auth } = await import('@/lib/firebase');
                    
                    // 1. Create user in Firebase Auth
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        data.email,
                        data.password
                    );
                    const user = userCredential.user;
                    
                    // Update display name in Firebase Auth profile
                    if (data.name) {
                        await updateFirebaseProfile(user, { displayName: data.name });
                    }
                    
                    const idToken = await user.getIdToken();
                    
                    // 2. Sync/create user in Backend Firestore
                    const response = await apiClient.verifyToken(idToken, {
                        name: data.name,
                        role: data.role || 'citizen',
                        email: data.email
                    });
                    
                    // 3. Fetch user profile
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
                    const { signOut } = await import('firebase/auth');
                    const { auth } = await import('@/lib/firebase');
                    
                    // Sign out from Firebase
                    await signOut(auth);
                    
                    // Call backend logout
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
