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
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <p className="text-center text-muted text-xs font-medium uppercase tracking-wider mb-6 sm:mb-8">
            Featured & Trusted By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
            {logoPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <div className="text-2xl sm:text-3xl">{partner.icon}</div>
                <span className="text-secondary text-xs font-medium text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 sm:p-6 text-center border border-border hover:border-primary/20 transition-all duration-200"
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-1 sm:mb-1.5">{stat.number}</div>
              <p className="text-secondary text-xs sm:text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border-l-2 border-primary hover:border-primary/60 transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="text-2xl sm:text-3xl flex-shrink-0">{testimonial.avatar}</div>
                <div>
                  <p className="font-medium text-primary text-sm sm:text-base">{testimonial.author}</p>
                  <p className="text-secondary text-xs sm:text-sm mt-0.5">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-primary text-xs">★</span>
                ))}
              </div>
              <p className="text-secondary text-sm sm:text-base italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
