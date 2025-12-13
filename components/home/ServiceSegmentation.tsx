'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ServiceSegmentation() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Two Ways to Get Legal Help
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you need quick guidance or expert representation, LegalHub connects you with the right solution.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: AI Chat */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-500 dark:bg-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Legal Assistant</h3>
            </div>

            <p className="text-lg font-semibold text-blue-900 dark:text-teal-400 mb-6">
              Get Instant Legal Guidance
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-teal-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Ask any legal question in English or French</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-teal-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Get AI-powered answers in seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-teal-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Covers: land rights, tenancy, business, family law & more</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 dark:text-teal-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">100% confidential & free</span>
              </li>
            </ul>

            <div className="space-y-2 mb-6 pt-4 border-t border-blue-300 dark:border-blue-800">
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>No payment required</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>Plain language explanations</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>Available 24/7 across Africa</span>
              </p>
            </div>

            <Link
              href="/chat"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 dark:bg-teal-600 text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-teal-700 transition-colors duration-300 group/btn"
            >
              Ask a Question
              <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {/* Card 2: Lawyer Booking */}
          <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border-2 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-teal-600 dark:bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                👨‍⚖️
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Find & Book a Lawyer</h3>
            </div>

            <p className="text-lg font-semibold text-teal-900 dark:text-emerald-400 mb-6">
              Connect with Verified Lawyers
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-emerald-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">500+ verified lawyers across West Africa</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-emerald-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Filter by country, specialty & hourly rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-emerald-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Video, phone, or in-person consultations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 dark:text-emerald-500 font-bold mt-1">•</span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">Transparent pricing in local currency</span>
              </li>
            </ul>

            <div className="space-y-2 mb-6 pt-4 border-t border-teal-300 dark:border-teal-800">
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>Check credentials & reviews</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>Book immediate or scheduled slots</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 dark:text-emerald-500">✓</span>
                <span>Secure payment & protected messaging</span>
              </p>
            </div>

            <Link
              href="/lawyers"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-teal-600 dark:bg-emerald-600 text-white font-semibold rounded-xl hover:bg-teal-700 dark:hover:bg-emerald-700 transition-colors duration-300 group/btn"
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
