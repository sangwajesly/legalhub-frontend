'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-primary relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="relative z-10">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 leading-tight">
            Start Getting Legal Answers Today
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join 50,000+ citizens who've found clarity and confidence. Your first question is completely free. 
            No credit card required. No obligations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
            {/* Primary CTA */}
            <Link
              href="/chat"
              className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors text-sm sm:text-base"
            >
              Ask a Legal Question Now
              <ArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" size={18} />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/lawyers"
              className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Browse Lawyers Instead
              <ArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" size={18} />
            </Link>
          </div>

          {/* Trust Line */}
          <p className="text-sm sm:text-base text-white/70">
            <span className="inline-block mr-2">✓</span>
            100% Private & Secure  |  
            <span className="inline-block mx-2">✓</span>
            45 Second Average Response
          </p>
        </div>
      </div>
    </section>
  );
}
