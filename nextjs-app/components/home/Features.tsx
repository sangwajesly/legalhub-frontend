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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose LegalHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with transparency, security, and your peace of mind in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 border border-gray-200 hover:border-blue-400 hover:shadow-xl hover:from-blue-50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>

              {/* Accent Line */}
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Supporting Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Trusted by Thousands</h3>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Join a community of citizens and business owners who've found clarity, confidence, and expert legal support through LegalHub.
          </p>
          <div className="inline-block">
            <p className="text-5xl font-bold mb-2">50,000+</p>
            <p className="text-blue-100">Legal Queries Resolved</p>
          </div>
        </div>
      </div>
    </section>
  );
}
