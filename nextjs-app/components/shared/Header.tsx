'use client';

import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/shared/UserNav';

interface HeaderProps {
    onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between lg:ml-64 transition-all duration-300">
            {/* Left: Mobile Toggle & Title/Search */}
            <div className="flex items-center gap-3 w-full max-w-xl">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-600 dark:text-slate-300"
                    onClick={onOpenSidebar}
                >
                    <Menu className="h-6 w-6" />
                </Button>

                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg w-full max-w-md border border-transparent focus-within:border-blue-500 dark:focus-within:border-teal-500 transition-all">
                    <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for lawyers, articles, or cases..."
                        className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-500"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="ml-auto">
                <UserNav />
            </div>
        </header>
    );
}
