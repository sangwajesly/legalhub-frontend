'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Subtle background illustration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Legal Guidance,
              </span>
              <br />
              <span className="text-gray-900">Instantly.</span>
              <br />
              <span className="text-gray-600">No Lawyer Fees Upfront.</span>
            </h1>

            {/* Trust Proof Line */}
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full"></span>
              Trusted by 50,000+ Citizens & Business Owners | 99.8% Query Resolution
            </p>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed max-w-lg">
              Get AI-powered legal answers in seconds, or connect with verified lawyers when you need expert representation. LegalHub makes legal help accessible, affordable, and stress-free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Legal Query
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/lawyers"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300"
              >
                Find a Lawyer
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span>45 Second Avg Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
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
                    <p className="text-gray-900 font-semibold text-sm">Priya Sharma</p>
                    <p className="text-gray-600 text-xs">Property Law Expert</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-amber-400">★</span>
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
