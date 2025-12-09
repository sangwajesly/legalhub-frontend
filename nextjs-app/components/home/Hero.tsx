'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-24 pb-20 lg:pt-28 lg:pb-24">
      {/* Subtle background illustration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-teal-100 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-4">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Legal Help,
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Across Africa.</span>
              <br />
              <span className="text-gray-600 dark:text-slate-400">Affordable. Accessible.</span>
            </h1>

            {/* Trust Proof Line */}
            <p className="text-sm md:text-base text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-amber-400 dark:bg-amber-500 rounded-full"></span>
              Serving 50,000+ Africans | Available in Cameroon, Nigeria, Ghana, Burkina Faso & Guinea
            </p>

            {/* Description */}
            <p className="text-gray-700 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
              Get AI-powered legal answers in seconds, or connect with verified lawyers across West Africa.
              LegalHub makes legal help accessible and affordable for every African.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary CTA */}
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-teal-600 dark:to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Ask Your Legal Question
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/lawyers"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300"
              >
                Find a Lawyer
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span>45 Second Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square max-h-[500px]">
              {/* Card 1: Chat Interface Preview */}
              <div className="absolute top-8 left-0 w-72 lg:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-5 lg:p-6 border border-gray-100 dark:border-slate-700 transform hover:scale-105 transition-transform duration-300">
                <div className="flex gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 dark:bg-teal-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-300 dark:bg-teal-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-200 dark:bg-teal-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-white text-sm font-medium mb-2">What are my tenant rights in Lagos?</p>
                <p className="text-gray-600 dark:text-slate-300 text-xs leading-relaxed">
                  As a tenant in Lagos, you have the right to peaceful enjoyment of your rental property...
                </p>
              </div>

              {/* Card 2: Lawyer Profile Preview */}
              <div className="absolute bottom-12 lg:bottom-16 right-0 w-64 lg:w-72 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl shadow-2xl p-5 lg:p-6 border border-teal-100 dark:border-teal-800 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 dark:from-teal-500 dark:to-emerald-600 rounded-full"></div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">Amina Nkrumah</p>
                    <p className="text-gray-600 dark:text-slate-300 text-xs">Property Law Expert</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-amber-400 dark:text-amber-500">★</span>
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
