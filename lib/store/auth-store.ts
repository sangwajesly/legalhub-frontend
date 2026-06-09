import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/types';
import apiClient from '@/lib/api-client';

const getErrorMessage = (error: any, fallback: string): string => {
    if (!error) return fallback;
    if (typeof error === 'string') return error;
    if (error.message && typeof error.message === 'string') return error.message;
    if (error.detail) {
        if (Array.isArray(error.detail)) {
            return error.detail.map((err: any) => {
                const field = err.loc && err.loc.length > 1 ? err.loc.slice(1).join('.') : '';
                const prefix = field ? `${field}: ` : '';
                return `${prefix}${err.msg || err.message || JSON.stringify(err)}`;
            }).join(', ');
        }
        if (typeof error.detail === 'string') return error.detail;
        return JSON.stringify(error.detail);
    }
    return error.error || JSON.stringify(error) || fallback;
};

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
                    // Direct local login fallback when local database mode is active
                    if (process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true') {
                        throw new Error('LOCAL_DB_MODE');
                    }

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
                    const isFirebaseError = error.code?.startsWith('auth/') || error.message?.includes('firebase');
                    const isNetworkOrFallback = !isFirebaseError || error.code === 'auth/network-request-failed' || error.message === 'LOCAL_DB_MODE';

                    if (isNetworkOrFallback || process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true') {
                        console.warn('[AuthStore] Firebase login failed or skipped. Falling back to local backend login.', error.message);
                        try {
                            const response = await apiClient.login(credentials.email, credentials.password);
                            
                            set({
                                user: response.user,
                                token: response.token,
                                isAuthenticated: true,
                                isLoading: false,
                            });
                            return;
                        } catch (localError: any) {
                            set({
                                error: getErrorMessage(localError, 'Local login failed'),
                                isLoading: false,
                            });
                            throw localError;
                        }
                    }

                    set({
                        error: getErrorMessage(error, 'Login failed'),
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
                        error: getErrorMessage(error, 'Google Login failed'),
                        isLoading: false
                    });
                    throw error;
                }
            },

            register: async (data: RegisterData) => {
                set({ isLoading: true, error: null });
                try {
                    // Direct local registration fallback when local database mode is active
                    if (process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true') {
                        throw new Error('LOCAL_DB_MODE');
                    }

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
                    const isFirebaseError = error.code?.startsWith('auth/') || error.message?.includes('firebase');
                    const isNetworkOrFallback = !isFirebaseError || error.code === 'auth/network-request-failed' || error.message === 'LOCAL_DB_MODE';

                    if (isNetworkOrFallback || process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true') {
                        console.warn('[AuthStore] Firebase signup failed or skipped. Falling back to local backend signup.', error.message);
                        try {
                            const response = await apiClient.register(data);
                            
                            set({
                                user: response.user,
                                token: response.token,
                                isAuthenticated: true,
                                isLoading: false,
                            });
                            return;
                        } catch (localError: any) {
                            set({
                                error: getErrorMessage(localError, 'Local signup failed'),
                                isLoading: false,
                            });
                            throw localError;
                        }
                    }

                    set({
                        error: getErrorMessage(error, 'Registration failed'),
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    if (process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE !== 'true') {
                        const { signOut } = await import('firebase/auth');
                        const { auth } = await import('@/lib/firebase');
                        await signOut(auth);
                    }
                } catch (error) {
                    console.error('Firebase signout error:', error);
                } finally {
                    // Best-effort backend session invalidation
                    try {
                        await apiClient.logout();
                    } catch (error) {
                        console.error('Backend logout error:', error);
                    }
                    // Clear all persisted auth data from localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth-storage');
                    }
                    // Reset Zustand state
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                    // Hard redirect to login — clears all React component state
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }
            },


            updateProfile: async (data: Partial<User>) => {
                set({ isLoading: true, error: null });
                try {
                     const updatedUser = await apiClient.updateProfile(data);
                     set({ user: updatedUser, isLoading: false });
                } catch (error: any) {
                    set({
                        error: getErrorMessage(error, 'Profile update failed'),
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
