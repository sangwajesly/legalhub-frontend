"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthStore } from '../store/auth-store';
import apiClient from '../api-client';

interface AuthContextType {
    currentUser: FirebaseUser | null;
    idToken: string | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_USE_LOCAL_DATABASE === 'true') {
            console.log('[AuthContext] Local Database Mode active. Skipping Firebase Auth synchronization.');
            
            const initLocalAuth = async () => {
                const store = useAuthStore.getState();
                if (store.token && store.isAuthenticated) {
                    // Trust the persisted state. The user object and token are already
                    // in the Zustand store from login. No network call needed here —
                    // getProfile() on mount was causing 401s that wiped the session.
                    console.log('[AuthContext] Local session found. Trusting persisted state.');
                    useAuthStore.setState({ isLoading: false });
                } else {
                    // No persisted session — resolve loading immediately
                    console.log('[AuthContext] No local session found.');
                    useAuthStore.setState({ isLoading: false });
                }
                setLoading(false);
            };
            
            initLocalAuth();
            return;
        }

        console.log('[AuthContext] Firebase Auth Provider Mounted.');
        
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            const store = useAuthStore.getState();
            
            // If store is actively loading (indicates a login/register action in progress), let the store handle it
            if (store.isLoading) {
                console.log('[AuthContext] Store is actively loading. Letting auth-store handle session sync.');
                if (firebaseUser) {
                    setCurrentUser(firebaseUser);
                    try {
                        const token = await firebaseUser.getIdToken();
                        setIdToken(token);
                    } catch {}
                }
                setLoading(false);
                return;
            }

            setLoading(true);
            if (firebaseUser) {
                try {
                    console.log(`[AuthContext] Firebase user detected: ${firebaseUser.email}`);
                    const token = await firebaseUser.getIdToken();
                    
                    // Sync session with backend
                    const authResponse = await apiClient.verifyToken(token);
                    
                    // Fetch full profile from backend
                    const profile = await apiClient.getProfile();
                    
                    // Sync state to Zustand store
                    useAuthStore.setState({
                        user: profile,
                        token: authResponse.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                    
                    setCurrentUser(firebaseUser);
                    setIdToken(token);
                } catch (error: any) {
                    console.error('[AuthContext] Error syncing user with backend:', error);
                    // Reset auth state on sync failure
                    useAuthStore.setState({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: error.message || 'Authentication synchronization failed'
                    });
                    setCurrentUser(null);
                    setIdToken(null);
                }
            } else {
                console.log('[AuthContext] No active Firebase session found.');
                // Clear store state
                useAuthStore.setState({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null
                });
                setCurrentUser(null);
                setIdToken(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        currentUser,
        idToken,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
