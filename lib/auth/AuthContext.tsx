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
        console.log('[AuthContext] Firebase Auth Provider Mounted.');
        
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
            {!loading && children}
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
