'use client';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: '💬',
      title: 'Ask Your Question',
      description: 'Type any legal question in plain English. No jargon. No sign-up required for first question.',
    },
    {
      number: '2',
      icon: '⚡',
      title: 'Get Instant Guidance',
      description: 'Our AI legal advisor provides clear, actionable answers within seconds.',
    },
    {
      number: '3',
      icon: '✅',
      title: 'Take Action',
      description: 'Find and book a verified lawyer for deeper support. No obligation.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get legal answers in three simple steps. Start with a question, get instant guidance, and take action when you're ready.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Arrow */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-teal-200 to-transparent dark:from-teal-800 dark:via-emerald-800 dark:to-transparent transform -translate-y-1/2 z-0"></div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="group">
                {/* Card */}
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-teal-500 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-600 dark:from-teal-600 dark:to-emerald-600 text-white text-2xl font-bold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden text-center text-2xl text-gray-400 dark:text-slate-600 my-4">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline/Process Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-teal-400 mb-2">45s</div>
            <p className="text-gray-600 dark:text-slate-400">Average Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-600 dark:text-emerald-400 mb-2">0</div>
            <p className="text-gray-600 dark:text-slate-400">Hidden Fees or Surprises</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-500 mb-2">∞</div>
            <p className="text-gray-600 dark:text-slate-400">Questions You Can Ask</p>
          </div>
        </div>
      </div>
    </section>
  );
}
