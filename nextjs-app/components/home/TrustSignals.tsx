'use client';

export function TrustSignals() {
  const logoPartners = [
    { name: 'Legal Aid', icon: '⚖️' },
    { name: 'Tech Alliance', icon: '💼' },
    { name: 'BBC', icon: '📺' },
    { name: 'Reuters', icon: '📰' },
    { name: 'Justice Dept', icon: '🏛️' },
    { name: 'Law Firms', icon: '🏢' },
  ];

  const stats = [
    { number: '50,000+', label: 'Legal Queries Answered', icon: '📊' },
    { number: '99.8%', label: 'Resolution Rate', icon: '✅' },
    { number: '500+', label: 'Verified Lawyers', icon: '👨‍⚖️' },
    { number: '24/7', label: 'Support Available', icon: '🕐' },
  ];

  const testimonials = [
    {
      author: 'Rajesh K.',
      role: 'Property Owner, Delhi',
      quote: 'I was worried about tenant disputes. The AI explained my rights clearly. Saved me months of stress.',
      avatar: '👨',
    },
    {
      author: 'Neha S.',
      role: 'E-commerce Business Owner',
      quote: 'Found a contract lawyer in 10 minutes. Professional, affordable, exactly what my startup needed.',
      avatar: '👩',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-20">
          <p className="text-center text-gray-600 text-sm font-semibold uppercase tracking-wider mb-8">
            Featured & Trusted By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {logoPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="text-4xl">{partner.icon}</div>
                <span className="text-gray-600 text-sm font-medium text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-4 text-center">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border-l-4 border-amber-400 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
