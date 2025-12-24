'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-[20%] w-64 h-64 bg-teal-300 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6 leading-tight animate-fade-in">
          Start Getting Legal Answers Today
        </h2>

        <p className="text-lg md:text-xl text-blue-50 dark:text-teal-50 max-w-2xl mx-auto mb-12 leading-relaxed opacity-90 animate-fade-in [animation-delay:200ms]">
          Join 50,000+ Africans who&apos;ve found clarity and confidence. Your first question is completely free.
          No payment required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:400ms]">
          <Link
            href="/chat"
            className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 dark:text-teal-700 font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            Ask Your Question Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>

          <Link
            href="/lawyers"
            className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Browse Lawyers
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-white/70 uppercase tracking-widest animate-fade-in [animation-delay:600ms]">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg">
              <Check size={14} className="text-white" />
            </div>
            <span>100% Private & Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg">
              <Check size={14} className="text-white" />
            </div>
            <span>Across West Africa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg">
              <Check size={14} className="text-white" />
            </div>
            <span>Verified Experts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
