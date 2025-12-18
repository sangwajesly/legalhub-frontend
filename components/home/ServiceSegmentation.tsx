'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Gavel, Check } from 'lucide-react';

export function ServiceSegmentation() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">
            Two Ways to Get Legal Help
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you need quick guidance or expert representation, LegalHub connects you with the right solution.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Card 1: AI Chat */}
          <div className="group bg-blue-50/50 dark:bg-blue-900/10 rounded-[2.5rem] p-10 border border-blue-100 dark:border-blue-800 hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-blue-600 dark:bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Bot size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI Legal Assistant</h3>
                <p className="text-blue-600 dark:text-teal-400 font-semibold text-sm">Instant & Free Assistance</p>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Ask any legal question in English or French',
                'Get AI-powered answers in seconds',
                'Covers: land rights, tenancy, business, family law & more',
                '100% confidential & free'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-blue-600 dark:text-teal-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/chat"
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 dark:bg-teal-600 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-teal-700 transition-all duration-300 shadow-lg group/btn"
            >
              Start Free Chat
              <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {/* Card 2: Lawyer Booking */}
          <div className="group bg-teal-50/50 dark:bg-teal-900/10 rounded-[2.5rem] p-10 border border-teal-100 dark:border-teal-800 hover:border-teal-400 dark:hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-teal-600 dark:bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Gavel size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Expert Representation</h3>
                <p className="text-teal-600 dark:text-emerald-400 font-semibold text-sm">Verified Legal Professionals</p>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                '500+ verified lawyers across West Africa',
                'Filter by country, specialty & hourly rate',
                'Video, phone, or in-person consultations',
                'Transparent pricing in local currency'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-teal-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/lawyers"
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-teal-600 dark:bg-emerald-600 text-white font-bold rounded-xl hover:bg-teal-700 dark:hover:bg-emerald-700 transition-all duration-300 shadow-lg group/btn"
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
