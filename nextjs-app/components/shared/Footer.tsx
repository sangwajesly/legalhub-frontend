'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">LegalHub</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Democratizing access to legal services through AI technology and professional connections.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Dashboard</Link></li>
                            <li><Link href="/lawyers" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Find Lawyers</Link></li>
                            <li><Link href="/chat" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">AI Assistant</Link></li>
                            <li><Link href="/articles" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Articles</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/help" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">support@legalhub.com</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">+1 (555) 123-4567</p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://twitter.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-teal-900/30 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                                <span>X</span>
                            </a>
                            <a href="https://facebook.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-teal-900/30 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                                <span>FB</span>
                            </a>
                            <a href="https://instagram.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-teal-900/30 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                                <span>IG</span>
                            </a>
                            <a href="https://tiktok.com/@legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-teal-900/30 hover:text-blue-600 dark:hover:text-teal-400 transition-colors">
                                <span>TT</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                        © {currentYear} LegalHub. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        LegalHub is not a law firm and does not provide legal advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}
