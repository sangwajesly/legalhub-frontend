"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthStore } from '../store/auth-store';

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
            if (user) {
                console.log('[AuthContext] User detected:', user.uid);
                const token = await user.getIdToken();
                setCurrentUser(user);
                setIdToken(token);
                
                // Sync with Zustand store
                const zustandUser = useAuthStore.getState().user;
                if (!zustandUser || zustandUser.uid !== user.uid) {
                    console.log('[AuthContext] Syncing token and auth status to Zustand store.');
                    setZustandState({ 
                        token, 
                        isAuthenticated: true, 
                    });
                } else {
                     setZustandState({ token, isAuthenticated: true });
                }

            } else {
                console.log('[AuthContext] No user detected (signed out).');
                setCurrentUser(null);
                setIdToken(null);
                // Sync with Zustand store
                setZustandState({ user: null, token: null, isAuthenticated: false });
            }
            setLoading(false);
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
