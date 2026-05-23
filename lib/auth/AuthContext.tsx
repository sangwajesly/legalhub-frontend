"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User as FirebaseUser } from 'firebase/auth';
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
    const setZustandState = useAuthStore.setState;

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            console.log('[AuthContext] Firebase onIdTokenChanged fired.');
            try {
                if (user) {
                    console.log('[AuthContext] User detected:', user.uid);
                    const token = await user.getIdToken();
                    setCurrentUser(user);
                    setIdToken(token);
                    
                    // Sync with Zustand store and fetch profile if needed
                    const currentZustandUser = useAuthStore.getState().user;
                    
                    if (!currentZustandUser || currentZustandUser.id !== user.uid) {
                        console.log('[AuthContext] Fetching/Syncing profile to Zustand store.');
                        try {
                            // Verify token with backend to ensure user exists and get backend token
                            const authResponse = await apiClient.verifyToken(token);
                            // Fetch full profile from backend
                            const profile = await apiClient.getProfile();
                            
                            setZustandState({ 
                                user: profile,
                                token: authResponse.token, 
                                isAuthenticated: true,
                                isLoading: false
                            });
                        } catch (profileError) {
                            console.error('[AuthContext] Error fetching profile:', profileError);
                            // If profile fetch fails, we might still be authenticated but limited
                            setZustandState({ 
                                token, 
                                isAuthenticated: true,
                                isLoading: false
                            });
                        }
                    } else {
                        // Profile is already correct, just update token and status
                        setZustandState({ 
                            token, 
                            isAuthenticated: true,
                            isLoading: false
                        });
                    }

                } else {
                    console.log('[AuthContext] No user detected (signed out).');
                    setCurrentUser(null);
                    setIdToken(null);
                    // Sync with Zustand store
                    setZustandState({ 
                        user: null, 
                        token: null, 
                        isAuthenticated: false,
                        isLoading: false
                    });
                }
            } catch (error) {
                console.error('[AuthContext] error in onIdTokenChanged:', error);
                setZustandState({ isLoading: false });
            } finally {
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [setZustandState]);

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
