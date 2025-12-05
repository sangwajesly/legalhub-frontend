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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-4 sm:mb-6 leading-tight">
            Why Choose LegalHub?
          </h2>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Built with transparency, security, and your peace of mind in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-4xl sm:text-5xl mb-5 sm:mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3 sm:mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-secondary text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div className="h-0.5 w-12 bg-primary rounded-full group-hover:w-16 transition-all duration-200"></div>
            </div>
          ))}
        </div>

        {/* Supporting Stats */}
        <div className="mt-12 sm:mt-16 bg-primary rounded-xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Trusted by Thousands</h3>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Join a community of citizens and business owners who've found clarity, confidence, and expert legal support through LegalHub.
          </p>
          <div className="inline-block">
            <p className="text-4xl sm:text-5xl font-semibold mb-2">50,000+</p>
            <p className="text-white/80 text-sm sm:text-base">Legal Queries Resolved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
