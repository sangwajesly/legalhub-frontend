'use client';

export function Features() {
  const features = [
    {
      icon: '🔒',
      title: 'Private & Secure',
      description: 'End-to-end encrypted conversations with bank-level security. Your data is never shared.',
    },
    {
      icon: '💰',
      title: 'Affordable & Transparent',
      description: 'No hidden fees or surprise charges. Clear pricing upfront. Free AI guidance always available.',
    },
    {
      icon: '⚡',
      title: 'Fast & Reliable',
      description: '99.8% uptime guarantee. 45-second average response time. Available 24/7.',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose LegalHub?
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Built with transparency, security, and your peace of mind in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-xl hover:from-blue-50 dark:hover:from-teal-900/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-teal-500 dark:to-emerald-500 rounded-full group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Supporting Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 rounded-3xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Trusted by Thousands</h3>
          <p className="text-base text-blue-100 dark:text-teal-100 max-w-2xl mx-auto mb-8">
            Join a community of citizens and business owners who've found clarity, confidence, and expert legal support through LegalHub.
          </p>
          <div className="inline-block">
            <p className="text-4xl font-bold mb-2">50,000+</p>
            <p className="text-sm text-blue-100 dark:text-teal-100">Legal Queries Resolved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
