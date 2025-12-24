"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { useAuthStore } from "@/lib/store/auth-store";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isAuthenticated, isLoading } = useAuthStore();

    // Determine if we are on a page that should show the layout
    const isHomePage = pathname === "/";
    const isChatPage = pathname === "/chat";

    // Exclude sidebar/header/footer from auth pages
    const isAuthPage =
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/signup") ||
        pathname?.startsWith("/forgot-password") ||
        pathname?.startsWith("/reset-password");

    const showLayout = !isHomePage && !isChatPage && !isAuthPage;

    // Protect routes
    useEffect(() => {
        if (!isLoading && !isAuthenticated && !isAuthPage && !isHomePage) {
            // If not authenticated and not on a public page, redirect to login
            // const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/contact', '/support'];
            // Simplified check: if it requires layout (dashboard, lawyers, etc) OR is chat page, it's protected.
            // Actually, Home page is public. Auth pages are public. Everything else is private?
            // Let's protect everything except public pages.

            // This logic needs to be robust. 
            // Public: / (home), /login, /signup, /forgot*, /reset*, /contact, /about, /support, /privacy, /terms

            const isPublic =
                pathname === "/" ||
                pathname?.startsWith("/login") ||
                pathname?.startsWith("/signup") ||
                pathname?.startsWith("/forgot-password") ||
                pathname?.startsWith("/reset-password") ||
                pathname?.startsWith("/contact") ||
                pathname?.startsWith("/support") ||
                pathname?.startsWith("/privacy") ||
                pathname?.startsWith("/terms");

            if (!isPublic) {
                router.push('/login');
            }
        }
    }, [isAuthenticated, isLoading, pathname, isAuthPage, isHomePage, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-teal-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {showLayout && (
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}

            {showLayout && (
                <Header
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />
            )}

            <main className={showLayout ? "flex-1 lg:ml-64 p-6 transition-all duration-300 min-h-screen pt-20" : "flex-1"}>
                {children}
            </main>

            {showLayout && <Footer className="lg:ml-64" />}
        </div>
    );
}
