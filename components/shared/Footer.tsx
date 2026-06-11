'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("bg-[#FDFCF9] dark:bg-[#121315]/60 border-t border-[#E5E2DC] dark:border-stone-850 py-8 mt-auto transition-colors duration-300", className)}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-light font-display text-stone-900 dark:text-white mb-4">Legal<span className="text-[#B89868] italic font-serif font-normal">Hub</span></h4>
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                            Democratizing access to legal services through AI technology and professional connections.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-655 dark:text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Dashboard</Link></li>
                            <li><Link href="/lawyers" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Find Lawyers</Link></li>
                            <li><Link href="/chat" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">AI Assistant</Link></li>
                            <li><Link href="/articles" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Articles</Link></li>
                            <li><Link href="/about" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">About Us</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Pricing Tiers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-slate-650 dark:text-slate-400">
                            <li><Link href="/help" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
                        <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">support@legalhub.com</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">+237 677 12 34 56</p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://twitter.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FAF9F5]/40 dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-[#B89868]/40 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors" aria-label="Twitter">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="https://facebook.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FAF9F5]/40 dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-[#B89868]/40 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors" aria-label="Facebook">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="https://instagram.com/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FAF9F5]/40 dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-[#B89868]/40 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors" aria-label="Instagram">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="https://linkedin.com/company/legalhub" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FAF9F5]/40 dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-850 rounded-xl flex items-center justify-center text-stone-500 dark:text-stone-400 hover:border-[#B89868]/40 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#E5E2DC]/60 dark:border-stone-850 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-stone-500 dark:text-stone-500">
                        © {currentYear} LegalHub. All rights reserved.
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-500">
                        LegalHub is not a law firm and does not provide legal advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}
