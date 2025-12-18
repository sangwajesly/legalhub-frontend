'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950 min-h-[85vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/images/hero-bg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-slate-950/60 dark:via-slate-950/80 dark:to-slate-950"></div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-slate-900 dark:text-white mb-5 leading-[1.1] tracking-tight animate-fade-in">
            Legal Assistance <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-teal-400 dark:to-emerald-400">
              Made Simple
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
            LegalHub democratizes access to justice using AI. Get instant guidance or connect with verified lawyers in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:400ms] mb-12">
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 dark:bg-teal-600 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-teal-500/25 group"
            >
              Ask Your Question
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/lawyers"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              Browse Lawyers
            </Link>
          </div>

          {/* Trust Badges - More compact */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 text-xs md:text-sm text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-100 dark:border-slate-800 animate-fade-in [animation-delay:600ms]">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-500 dark:text-teal-400" />
              <span className="font-semibold tracking-tight uppercase">100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-blue-500 dark:text-teal-400" />
              <span className="font-semibold tracking-tight uppercase">Instant Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-500 dark:text-teal-400" />
              <span className="font-semibold tracking-tight uppercase">Free Entry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
