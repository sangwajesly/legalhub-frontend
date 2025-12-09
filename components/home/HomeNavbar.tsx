'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale } from 'lucide-react';

export function HomeNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
                        <Scale className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">LegalHub</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/chat" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                        AI Chatbot
                    </Link>
                    <Link href="/lawyers" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                        Find Lawyers
                    </Link>
                    <Link href="/articles" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                        Articles
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:inline-flex text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 text-white hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
