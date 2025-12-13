'use client';

export function TrustSignals() {
  const logoPartners = [
    { name: 'Legal Aid', icon: '⚖️' },
    { name: 'ECOWAS', icon: '🌍' },
    { name: 'African Bar', icon: '🏛️' },
    { name: 'Tech Hubs', icon: '💼' },
    { name: 'NGO Network', icon: '🤝' },
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
      author: 'Kwame A.',
      role: 'Business Owner, Accra',
      quote: 'LegalHub helped me register my startup in Ghana within days. The AI answered all my questions, and I found an excellent lawyer for the paperwork.',
      avatar: '👨',
    },
    {
      author: 'Aisha M.',
      role: 'Tenant, Lagos',
      quote: 'I was facing eviction without proper notice. LegalHub connected me with a lawyer who protected my rights. Forever grateful!',
      avatar: '👩',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900 border-t border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Partner Logos */}
            <div className="mb-16">
              <p className="text-center text-gray-600 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-8">
                Trusted Across West Africa
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                {logoPartners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="text-3xl">{partner.icon}</div>
                    <span className="text-gray-600 dark:text-slate-400 text-sm font-medium text-center">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-slate-700"
                >
                  <div className="text-4xl mb-4 text-center">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-teal-400 mb-2">{stat.number}</div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
    
            {/* Testimonials */}
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border-l-4 border-amber-400 dark:border-amber-500 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-amber-400 dark:text-amber-500 text-base">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
}
