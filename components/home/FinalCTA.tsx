'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-28 bg-[#FAF9F5] dark:bg-[#121315] border-t border-[#E5E2DC] dark:border-stone-850 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#121315] dark:bg-stone-900/40 border border-[#B89868]/30 rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-4 block">Here for You</span>
            
            <h2 className="text-3xl md:text-5xl font-light font-display text-[#FAF9F5] mb-6 leading-tight">
              Take the Stress Out of <span className="italic">Legal Questions</span>
            </h2>

            <p className="text-sm md:text-base text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed font-sans font-medium">
              Ask our free AI helper today, or browse our list of friendly local lawyers who can stand by you. Your first question is completely free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat"
                className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 bg-[#FAF9F5] text-[#121315] font-bold rounded-xl hover:bg-[#EAE8E2] border border-[#FAF9F5] text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Ask a Free Question
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
              </Link>

              <Link
                href="/lawyers"
                className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 border border-stone-850 text-[#FAF9F5] font-bold rounded-xl hover:border-stone-500 hover:bg-stone-900/50 text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Find a Local Lawyer
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#B89868]" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#B89868]" />
                <span>Serving West Africa</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#B89868]" />
                <span>Free to Use Always</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
