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
    const isAboutPage = pathname === "/about";
    const isPricingPage = pathname === "/pricing";

    // Exclude sidebar/header/footer from auth pages
    const isAuthPage =
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/signup") ||
        pathname?.startsWith("/forgot-password") ||
        pathname?.startsWith("/reset-password");

    const isCallPage = pathname?.startsWith("/call");

    const showLayout = !isHomePage && !isChatPage && !isAuthPage && !isAboutPage && !isPricingPage && !isCallPage;

    // Protect routes (Temporarily disabled for Public Demo / Presentation mode)
    useEffect(() => {
        // Redirection is disabled to keep all pages publicly accessible
        console.log('[AppLayout] Auth-protection redirect disabled.');
    }, [isAuthenticated, isLoading, pathname, isAuthPage, isHomePage, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] dark:bg-[#121315]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89868]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315]">
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
