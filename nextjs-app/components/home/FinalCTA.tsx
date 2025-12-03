'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Background glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl opacity-10 transform -translate-x-1/2"></div>
        </div>

        <div className="relative z-10">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Getting Legal Answers Today
          </h2>

          {/* Subheading */}
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join 50,000+ citizens who've found clarity and confidence. Your first question is completely free. 
            No credit card required. No obligations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
            <Link
              href="/chat"
              className="group inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ask a Legal Question Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/lawyers"
              className="group inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Browse Lawyers Instead
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </Link>
          </div>

          {/* Trust Line */}
          <p className="mt-10 text-blue-100">
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
