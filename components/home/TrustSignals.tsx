'use client';

import { Scale, Globe, Building2, Briefcase, Users, Building, BarChart3, CheckCircle, Gavel, Clock, User, Star } from 'lucide-react';

export function TrustSignals() {
  const logoPartners = [
    { name: 'Legal Aid Association', icon: <Scale size={20} /> },
    { name: 'ECOWAS Justice', icon: <Globe size={20} /> },
    { name: 'African Bar Forum', icon: <Building2 size={20} /> },
    { name: 'Regional Tech Alliance', icon: <Briefcase size={20} /> },
    { name: 'Human Rights Coalition', icon: <Users size={20} /> },
    { name: 'Federal Chambers', icon: <Building size={20} /> },
  ];

  const stats = [
    { number: '50,000+', label: 'Citizens Helped', icon: <BarChart3 size={20} /> },
    { number: '99%', label: 'Clarity & Care', icon: <CheckCircle size={20} /> },
    { number: '500+', label: 'Verified Local Lawyers', icon: <Gavel size={20} /> },
    { number: '24/7', label: 'Always Available', icon: <Clock size={20} /> },
  ];

  const testimonials = [
    {
      author: 'Kwame A.',
      role: 'Shop Owner, Accra',
      quote: 'I was worried about a new trade fee and didn\'t know if it was legal. The AI explained the local rules to me in simple terms in less than a minute. When I wanted to make sure, they connected me to a local lawyer who double-checked everything for a very fair fee. It saved my shop a lot of stress!',
      avatar: <User size={18} className="text-[#B89868]" />,
    },
    {
      author: 'Aisha M.',
      role: 'School Teacher, Lagos',
      quote: 'My landlord suddenly tried to increase my rent double without warning. I asked LegalHub and found out this violated local laws. The system matched me with a nearby lawyer who wrote a polite, official letter that settled the issue right away. Highly recommended for every citizen!',
      avatar: <User size={18} className="text-[#B89868]" />,
    },
  ];

  return (
    <section className="py-24 bg-[#FDFCF9] dark:bg-[#16171B] border-t border-b border-[#E5E2DC] dark:border-stone-800/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Partner Logos */}
        <div className="mb-24">
          <p className="text-center text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-10">Trusted Across West Africa</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center opacity-40 grayscale hover:opacity-75 dark:opacity-30 dark:hover:opacity-60 transition-all duration-500">
            {logoPartners.map((partner) => (
              <div 
                key={partner.name} 
                className="flex items-center justify-center gap-2 border border-[#E5E2DC]/60 dark:border-stone-800/40 px-4 py-3 rounded-xl bg-stone-50/40 dark:bg-transparent"
              >
                <div className="text-stone-700 dark:text-stone-300 flex-shrink-0">{partner.icon}</div>
                <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400 tracking-wider uppercase">{partner.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9F5]/40 dark:bg-stone-900/10 rounded-2xl p-8 border border-[#E5E2DC] dark:border-stone-800 transition-all duration-300"
            >
              <div className="text-[#B89868] dark:text-[#C5A880] mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-light font-display text-stone-900 dark:text-stone-100 mb-2">{stat.number}</div>
              <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9F5] dark:bg-stone-900/10 rounded-2xl p-10 border border-[#E5E2DC] dark:border-stone-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={11} className="fill-[#B89868] text-[#B89868]" />
                  ))}
                </div>

                <blockquote className="text-stone-700 dark:text-stone-300 italic text-sm leading-relaxed mb-8 font-serif">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-[#E5E2DC]/80 dark:border-stone-800/80">
                <div className="w-9 h-9 bg-stone-100 dark:bg-stone-850 rounded-full flex items-center justify-center border border-[#E5E2DC] dark:border-stone-800">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider">{testimonial.author}</h4>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium tracking-tight">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

