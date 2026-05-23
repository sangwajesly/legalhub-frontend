'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Gavel, Check } from 'lucide-react';

export function ServiceSegmentation() {
  return (
    <section className="py-24 bg-[#FAF9F5] dark:bg-[#121315] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Intro */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-light font-display text-stone-900 dark:text-stone-50 mb-6">
            How We Can Help You
          </h2>
          <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Whether you want a quick free answer to a worry or need a trusted local lawyer to stand by your side, we have you covered.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: AI Chat */}
          <div className="bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl p-10 border border-[#E5E2DC] dark:border-stone-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 border border-[#B89868]/30 bg-stone-50 dark:bg-stone-850 rounded-xl flex items-center justify-center text-[#B89868]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">Free AI Legal Guide</h3>
                  <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest">100% Free & Private</p>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {[
                  'Get quick answers on landlord issues, work troubles, or business questions',
                  'Clear answers in simple, everyday words in under forty-five seconds',
                  'Totally private — you don\'t even need to create an account',
                  'Ready to help you day or night, twenty-four hours a day, seven days a week'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-[#B89868] mt-1 flex-shrink-0" />
                    <span className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed font-sans font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/chat"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] hover:bg-[#32312E] dark:hover:bg-[#EAE8E2] border border-[#1C1B19] dark:border-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 group shadow-sm"
            >
              Ask a Free Question
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Lawyer Booking */}
          <div className="bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl p-10 border border-[#E5E2DC] dark:border-stone-800 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 border border-[#B89868]/30 bg-stone-50 dark:bg-stone-850 rounded-xl flex items-center justify-center text-[#B89868]">
                  <Gavel size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">Hire a Trusted Lawyer</h3>
                  <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest">Accredited & Local Experts</p>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {[
                  'Connect with friendly, qualified lawyers in your own country',
                  'Choose the right expert based on pricing, reviews, and location',
                  'Talk securely over the phone, video, or scheduled in-person meetings',
                  'Clear upfront prices with easy, secure local mobile payments'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-[#B89868] mt-1 flex-shrink-0" />
                    <span className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed font-sans font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/lawyers"
              className="w-full inline-flex items-center justify-center px-6 py-4 border border-stone-800 dark:border-stone-200 bg-transparent text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 group"
            >
              Find a Lawyer Near You
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

