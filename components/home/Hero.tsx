'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-6 sm:space-y-8 max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
              <span className="text-primary block">
                Legal Guidance,
              </span>
              <span className="text-primary block">Instantly.</span>
              <span className="text-secondary font-normal block mt-2">No Lawyer Fees Upfront.</span>
            </h1>

            {/* Trust Proof Line */}
            <p className="text-sm sm:text-base text-muted flex items-center gap-2 leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
              <span>Trusted by 50,000+ Citizens & Business Owners | 99.8% Query Resolution</span>
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-xl">
              Get AI-powered legal answers in seconds, or connect with verified lawyers when you need expert representation. LegalHub makes legal help accessible, affordable, and stress-free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Primary CTA */}
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Start Your Free Legal Query
                <ArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" size={18} />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/lawyers"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-medium rounded-lg hover:bg-light transition-colors text-sm sm:text-base"
              >
                Find a Lawyer
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-muted pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base">🔒</span>
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base">⚡</span>
                <span>45 Second Avg Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base">✨</span>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square">
              {/* Card 1: Chat Interface Preview */}
              <div className="absolute top-8 left-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                </div>
                <p className="text-gray-700 text-sm font-medium mb-2">What are my rights as a tenant?</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  As a tenant, you have the right to peaceful enjoyment of your rental property...
                </p>
              </div>

              {/* Card 2: Lawyer Profile Preview */}
              <div className="absolute bottom-16 right-0 w-72 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-2xl p-6 border border-teal-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-primary font-medium text-sm">Priya Sharma</p>
                    <p className="text-secondary text-xs">Property Law Expert</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-primary text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
