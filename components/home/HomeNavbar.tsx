'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale } from 'lucide-react';

export function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F5]/85 dark:bg-[#121315]/85 backdrop-blur-md border-b border-[#E5E2DC] dark:border-stone-800/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Scale className="h-5 w-5 text-[#B89868] group-hover:rotate-6 transition-transform duration-300" />
          <span className="text-xl font-semibold font-display tracking-tight text-stone-900 dark:text-stone-50">
            Legal<span className="text-[#B89868] font-normal italic font-serif">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/chat" 
            className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors"
          >
            Ask AI (Free)
          </Link>
          <Link 
            href="/lawyers" 
            className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors"
          >
            Find a Lawyer
          </Link>
          <Link 
            href="/articles" 
            className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors"
          >
            Help Guides
          </Link>
          <Link 
            href="/about" 
            className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors"
          >
            About
          </Link>
          <Link 
            href="/pricing" 
            className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-[#B89868] dark:hover:text-[#C5A880] transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-transparent"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] hover:bg-[#32312E] dark:hover:bg-[#EAE8E2] border border-[#1C1B19] dark:border-[#FAF9F5] rounded-xl px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

