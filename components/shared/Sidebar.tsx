'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Calendar,
    FileText,
    Briefcase,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'Chat Assistant', href: '/chat' },
    { icon: Users, label: 'Find Lawyers', href: '/lawyers' },
    { icon: Calendar, label: 'My Bookings', href: '/bookings' },
    { icon: FileText, label: 'Legal Articles', href: '/articles' },
    { icon: Briefcase, label: 'My Cases', href: '/cases' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Sidebar Container */}
            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-[#FDFCF9] dark:bg-[#121315] border-r border-[#E5E2DC] dark:border-stone-850 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Mobile Close Button */}
                <div className="absolute top-4 right-4 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Logo */}
                <div className="flex-none flex items-center justify-center h-16 border-b border-[#E5E2DC] dark:border-[#E5E2DC]/10">
                    <Link href="/" className="text-xl font-light font-display text-stone-900 dark:text-stone-50">
                        Legal<span className="text-[#B89868] italic font-serif font-normal">Hub</span>
                    </Link>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose} // Close sidebar on mobile when link is clicked
                            >
                                <span className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1 border border-transparent",
                                    isActive
                                        ? "bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] shadow-sm font-semibold"
                                        : "text-stone-600 dark:text-stone-400 hover:bg-[#FAF9F5] dark:hover:bg-stone-900/40 hover:text-stone-900 dark:hover:text-[#FAF9F5] hover:border-[#E5E2DC] dark:hover:border-stone-850"
                                )}>
                                    <Icon className={cn("h-5 w-5", isActive ? "text-[#B89868]" : "text-stone-500 dark:text-stone-400 group-hover:text-[#B89868] dark:group-hover:text-[#C5A880]")} />
                                    <span className="font-medium">{item.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="flex-none p-4 border-t border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5]/40 dark:bg-stone-900/10">
                    <Link href="/settings" onClick={onClose}>
                        <span className="flex items-center gap-3 px-4 py-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-[#FAF9F5] hover:bg-[#FDFCF9] dark:hover:bg-stone-900/20 border border-transparent hover:border-[#E5E2DC] dark:hover:border-stone-800 rounded-xl transition-colors mb-2 cursor-pointer">
                            <Settings className="h-5 w-5 text-stone-500 dark:text-stone-400 group-hover:text-[#B89868]" />
                            <span className="font-medium">Settings</span>
                        </span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/10 hover:text-red-700 dark:hover:text-red-300 rounded-xl border border-transparent transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
