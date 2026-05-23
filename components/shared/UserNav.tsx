'use client';

import Link from 'next/link';
import { Bell, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/lib/store/auth-store';

export function UserNav() {
    const { user, isAuthenticated, logout } = useAuthStore();

    console.log('[UserNav] Rendered. Auth state:', { isAuthenticated, user });

    if (!isAuthenticated) {
        return (
            <Link href="/login">
                <Button variant="outline" className="border-[#E5E2DC] dark:border-stone-800 text-stone-700 dark:text-stone-300 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-850">
                    <LogIn className="mr-2 h-4 w-4 text-[#B89868]" />
                    Login
                </Button>
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-stone-500 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-[#B89868] rounded-full border-2 border-[#FAF9F5] dark:border-[#121315]"></span>
            </Button>

            <div className="h-6 w-[1px] bg-[#E5E2DC] dark:bg-stone-800 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || 'Guest'}</p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-[#FAF9F5] dark:bg-[#121315] flex items-center justify-center border border-[#E5E2DC] dark:border-stone-800 shadow-sm p-0 overflow-hidden hover:bg-stone-100 dark:hover:bg-stone-850 focus:ring-2 focus:ring-[#B89868]/20">
                            {/* TODO: Add Avatar component with user?.avatarUrl */}
                            <User className="h-5 w-5 text-[#B89868]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 dark:bg-slate-900 dark:border-slate-800">
                        <DropdownMenuLabel className="dark:text-slate-100">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="dark:bg-slate-800" />
                        <Link href="/profile">
                            <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-white">
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/settings">
                            <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-white">
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="cursor-pointer dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-white">
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="dark:bg-slate-800" />
                        <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 dark:focus:bg-red-950/20" onClick={() => logout()}>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
