'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ServiceSegmentation() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-4 sm:mb-6 leading-tight">
            Two Ways to Get Legal Help
          </h2>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for quick guidance or expert representation, LegalHub has you covered. 
            Choose the path that fits your needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Card 1: AI Chat */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI Legal Assistant</h3>
            </div>

            <p className="text-xl font-semibold text-blue-900 mb-6">
              Get Instant Legal Guidance
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span className="text-gray-700">Ask any legal question in plain English</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span className="text-gray-700">Get AI-powered answers in seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span className="text-gray-700">Covers: property, family, work law & more</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-1">•</span>
                <span className="text-gray-700">100% confidential & free</span>
              </li>
            </ul>

            <div className="space-y-3 mb-8 pt-6 border-t border-blue-300">
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>No credit card required</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Plain language explanations</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Multi-language support (coming soon)</span>
              </p>
            </div>

            <Link
              href="/chat"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 group/btn"
            >
              Ask a Question
              <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {/* Card 2: Lawyer Booking */}
          <div className="group bg-white rounded-xl border border-border hover:border-primary/20 p-6 sm:p-8 lg:p-10 transition-all duration-200 hover:shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl flex-shrink-0">
                👨‍⚖️
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">Find & Book a Lawyer</h3>
            </div>

            <p className="text-lg sm:text-xl font-medium text-primary mb-5 sm:mb-6">
              Connect with Verified Lawyers
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary font-medium mt-0.5 flex-shrink-0">•</span>
                <span className="text-secondary text-sm sm:text-base leading-relaxed">500+ verified legal professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-medium mt-0.5 flex-shrink-0">•</span>
                <span className="text-secondary text-sm sm:text-base leading-relaxed">Filter by specialty & hourly rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-medium mt-0.5 flex-shrink-0">•</span>
                <span className="text-secondary text-sm sm:text-base leading-relaxed">Instant video/in-person consultations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-medium mt-0.5 flex-shrink-0">•</span>
                <span className="text-secondary text-sm sm:text-base leading-relaxed">Transparent pricing, no hidden fees</span>
              </li>
            </ul>

            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 pt-5 sm:pt-6 border-t border-border">
              <p className="flex items-center gap-2 text-secondary text-sm sm:text-base">
                <span className="text-primary">✓</span>
                <span>Check credentials & reviews</span>
              </p>
              <p className="flex items-center gap-2 text-secondary text-sm sm:text-base">
                <span className="text-primary">✓</span>
                <span>Book immediate or scheduled slots</span>
              </p>
              <p className="flex items-center gap-2 text-secondary text-sm sm:text-base">
                <span className="text-primary">✓</span>
                <span>Secure payment & protected messaging</span>
              </p>
            </div>

            <Link
              href="/lawyers"
              className="w-full inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              Find a Lawyer
              <ArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
