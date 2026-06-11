'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, CircleDollarSign } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-[#FAF9F5] dark:bg-[#121315] min-h-[90vh] flex items-center transition-colors duration-300">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E5E2DC] dark:bg-stone-800/60 transform -translate-x-1/2"></div>
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-[#E5E2DC] dark:bg-stone-800/60"></div>
        <div className="absolute top-[75%] left-0 right-0 h-[1px] bg-[#E5E2DC] dark:bg-stone-800/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B89868]/30 bg-[#FAF9F5] dark:bg-[#18191C] text-[#B89868] text-[10px] font-bold uppercase tracking-widest mb-8 rounded-full animate-fade-in">
          <span>Simple, Trusted Legal Help</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light font-display text-stone-900 dark:text-stone-50 mb-8 leading-[1.08] tracking-tight max-w-4xl mx-auto animate-fade-in [animation-delay:100ms]">
          Legal assistance, <br />
          made <span className="font-serif italic text-[#B89868]">clear</span> and <span className="font-serif italic text-[#B89868]">accessible</span>.
        </h1>

        <p className="text-sm md:text-base lg:text-lg text-stone-600 dark:text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed font-sans font-medium tracking-tight animate-fade-in [animation-delay:200ms]">
          Get instant, clear answers to your everyday legal questions for free. No complicated jargon, no sign-ups, and complete privacy. Connect with a friendly local lawyer when you are ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in [animation-delay:300ms]">
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] hover:bg-[#32312E] dark:hover:bg-[#EAE8E2] border border-[#1C1B19] dark:border-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 group shadow-md"
          >
            Ask a Free Question
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/lawyers"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-[#E5E2DC] dark:border-stone-800 bg-[#FAF9F5] dark:bg-[#121315] text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300"
          >
            Find a Lawyer Near You
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-[10px] md:text-xs text-stone-500 dark:text-stone-400 pt-10 border-t border-[#E5E2DC] dark:border-stone-800 max-w-4xl mx-auto animate-fade-in [animation-delay:400ms]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#B89868]" />
            <span className="font-bold tracking-widest uppercase">100% PRIVATE & SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#B89868]" />
            <span className="font-bold tracking-widest uppercase">FREE AI ANSWERS</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign size={16} className="text-[#B89868]" />
            <span className="font-bold tracking-widest uppercase">NO SURPRISE FEES</span>
          </div>
        </div>
      </div>
    </section>
  );
}

