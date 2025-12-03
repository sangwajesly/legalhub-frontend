'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ServiceSegmentation() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Two Ways to Get Legal Help
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for quick guidance or expert representation, LegalHub has you covered. 
            Choose the path that fits your needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
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
          <div className="group bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-10 border-2 border-teal-200 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform">
                👨‍⚖️
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Find & Book a Lawyer</h3>
            </div>

            <p className="text-xl font-semibold text-teal-900 mb-6">
              Connect with Verified Lawyers
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold mt-1">•</span>
                <span className="text-gray-700">500+ verified legal professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Filter by specialty & hourly rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Instant video/in-person consultations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold mt-1">•</span>
                <span className="text-gray-700">Transparent pricing, no hidden fees</span>
              </li>
            </ul>

            <div className="space-y-3 mb-8 pt-6 border-t border-teal-300">
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Check credentials & reviews</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Book immediate or scheduled slots</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Secure payment & protected messaging</span>
              </p>
            </div>

            <Link
              href="/lawyers"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors duration-300 group/btn"
            >
              Find a Lawyer
              <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
