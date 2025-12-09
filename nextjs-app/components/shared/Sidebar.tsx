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
                "fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Mobile Close Button */}
                <div className="absolute top-4 right-4 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Logo */}
                <div className="flex-none flex items-center justify-center h-16 border-b border-slate-200 dark:border-slate-800">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                        LegalHub
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
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group mb-1",
                                    isActive
                                        ? "bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-teal-900/20"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                )}>
                                    <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white")} />
                                    <span className="font-medium">{item.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="flex-none p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <Link href="/settings" onClick={onClose}>
                        <span className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mb-2 cursor-pointer">
                            <Settings className="h-5 w-5" />
                            <span className="font-medium">Settings</span>
                        </span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-300 rounded-lg transition-colors">
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
