'use client';

import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-teal-400" />,
      title: 'Private & Secure',
      description: 'End-to-end encrypted conversations with bank-level security. Your data is never shared.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600 dark:text-teal-400" />,
      title: 'Affordable & Transparent',
      description: 'No hidden fees or surprise charges. Clear pricing upfront. Free AI guidance always available.',
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600 dark:text-teal-400" />,
      title: 'Fast & Reliable',
      description: '99.8% uptime guarantee. 45-second average response time. Available 24/7.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">
            Why Choose LegalHub?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We're redefining legal support with accessibility, transparency, and cutting-edge security at our core.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-teal-500/10 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Supporting Stats/Premium Banner */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 rounded-[2.5rem] p-10 md:p-16 text-white text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 opacity-10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold font-display mb-6">Trusted by Thousands Across Africa</h3>
            <div className="flex flex-wrap justify-center gap-12 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50k+</div>
                <div className="text-blue-100 text-sm opacity-80 uppercase tracking-widest font-semibold">Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">45s</div>
                <div className="text-blue-100 text-sm opacity-80 uppercase tracking-widest font-semibold">Response</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100 text-sm opacity-80 uppercase tracking-widest font-semibold">Lawyers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
