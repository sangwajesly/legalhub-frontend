'use client';

import { Scale, Globe, Building2, Briefcase, Users, Building, BarChart3, CheckCircle, Gavel, Clock, User, Star } from 'lucide-react';

export function TrustSignals() {
  const logoPartners = [
    { name: 'Legal Aid', icon: <Scale size={28} /> },
    { name: 'ECOWAS', icon: <Globe size={28} /> },
    { name: 'African Bar', icon: <Building2 size={28} /> },
    { name: 'Tech Hubs', icon: <Briefcase size={28} /> },
    { name: 'NGO Network', icon: <Users size={28} /> },
    { name: 'Law Firms', icon: <Building size={28} /> },
  ];

  const stats = [
    { number: '50,000+', label: 'Legal Queries Answered', icon: <BarChart3 size={32} /> },
    { number: '99.8%', label: 'Resolution Rate', icon: <CheckCircle size={32} /> },
    { number: '500+', label: 'Verified Lawyers', icon: <Gavel size={32} /> },
    { number: '24/7', label: 'Support Available', icon: <Clock size={32} /> },
  ];

  const testimonials = [
    {
      author: 'Kwame A.',
      role: 'Business Owner, Accra',
      quote: 'LegalHub helped me register my startup in Ghana within days. The AI answered all my questions, and I found an excellent lawyer for the paperwork.',
      avatar: <User size={24} className="text-slate-400" />,
    },
    {
      author: 'Aisha M.',
      role: 'Teacher, Lagos',
      quote: 'I was facing eviction without proper notice. LegalHub connected me with a lawyer who protected my rights. Forever grateful!',
      avatar: <User size={24} className="text-slate-400" />,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-24">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Trusted by leading organizations</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {logoPartners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-3">
                <div className="text-slate-600 dark:text-slate-400">{partner.icon}</div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center text-blue-600 dark:text-teal-400 mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.number}</div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 shadow-sm relative group"
            >
              <div className="absolute top-8 right-8 text-blue-100 dark:text-blue-900/20 pointer-events-none">
                 <Scale size={64} />
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{testimonial.author}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10">
                "                &quot;{testimonial.quote}&quot;
"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
