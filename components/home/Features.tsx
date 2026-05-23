'use client';

import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <ShieldCheck size={20} />,
      title: '100% Private & Safe',
      description: 'Your chats are personal. We protect your conversations with bank-level security—nothing is ever shared or sold.',
    },
    {
      icon: <CreditCard size={20} />,
      title: 'Honest, Fair Pricing',
      description: 'No surprise fees. AI help is always free. If you hire a lawyer, you see the exact cost before you pay a single coin.',
    },
    {
      icon: <Zap size={20} />,
      title: 'Real, Verified Lawyers',
      description: 'We only partner with accredited, active lawyers who are licensed and ready to stand by you.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF9F5] dark:bg-[#121315] border-t border-[#E5E2DC] dark:border-stone-850 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-3">Designed to Protect You</p>
          <h2 className="text-3xl md:text-5xl font-light font-display text-stone-900 dark:text-stone-50 mb-6">
            Why You Can Trust LegalHub
          </h2>
          <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            We believe legal protection should be clear, honest, and accessible to everyone. Here is how we stand by you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#FDFCF9] dark:bg-stone-900/10 p-10 border border-[#E5E2DC] dark:border-stone-800 rounded-2xl flex flex-col justify-between group transition-colors duration-300 hover:border-[#B89868]/40"
            >
              <div>
                <div className="w-12 h-12 border border-[#B89868]/30 bg-stone-50 dark:bg-stone-850 rounded-xl flex items-center justify-center text-[#B89868] mb-8">
                  {feature.icon}
                </div>

                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
                  {feature.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs font-sans font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Stats/Premium Banner */}
        <div className="mt-24 bg-[#1C1B19] dark:bg-stone-900/40 border border-[#B89868]/30 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-4 block">Our Community</span>
            <h3 className="text-2xl md:text-4xl font-light font-display text-[#FAF9F5] mb-12">
              Empowering everyday people with <span className="italic">dignified</span>, stress-free legal support.
            </h3>
            
            <div className="grid grid-cols-3 gap-6 border-t border-stone-800 pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-light font-display text-[#B89868] mb-2">50,000+</div>
                <div className="text-stone-450 text-[10px] uppercase tracking-widest font-bold">Citizens Helped</div>
              </div>
              <div className="text-center border-l border-r border-stone-800">
                <div className="text-3xl md:text-4xl font-light font-display text-[#B89868] mb-2">99%</div>
                <div className="text-stone-450 text-[10px] uppercase tracking-widest font-bold">Clarity Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-light font-display text-[#B89868] mb-2">500+</div>
                <div className="text-stone-450 text-[10px] uppercase tracking-widest font-bold">Friendly Local Lawyers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
