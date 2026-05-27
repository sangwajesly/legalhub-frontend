"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
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

    useEffect(() => {
        console.log('[AuthContext] Bypassed Auth Provider Mounted.');
        
        // Force authentication if not already logged in (globally disables auth gates)
        const currentState = useAuthStore.getState();
        if (!currentState.isAuthenticated || !currentState.user) {
            console.log('[AuthContext] Force-initializing authenticated mock citizen session.');
            useAuthStore.setState({
                isAuthenticated: true,
                user: {
                    id: "mock_citizen_demo_uid",
                    uid: "mock_citizen_demo_uid",
                    email: "demo@legalhub.com",
                    displayName: "Demo User",
                    name: "Demo User",
                    role: "citizen",
                    phoneNumber: "+237123456789",
                    emailVerified: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } as any,
                token: "mock_access_token_demo",
                isLoading: false
            });
        }

        // Synchronize state based on Zustand store value
        const syncState = (state: any) => {
            if (state.isAuthenticated && state.user) {
                const mockUser: any = {
                    uid: state.user.uid || state.user.id || 'mock_citizen_demo_uid',
                    email: state.user.email || 'demo@legalhub.com',
                    displayName: state.user.displayName || state.user.display_name || 'Demo User',
                    emailVerified: true,
                    getIdToken: async () => state.token || 'mock_access_token_demo',
                };
                setCurrentUser(mockUser);
                setIdToken(state.token || 'mock_access_token_demo');
            } else {
                setCurrentUser(null);
                setIdToken(null);
            }
        };

        // Sync initially
        syncState(useAuthStore.getState());

        // Listen to Zustand store changes
        const unsubscribe = useAuthStore.subscribe((state) => {
            syncState(state);
        });

        setLoading(false);

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
