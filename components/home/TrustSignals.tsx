'use client';

import { BarChart3, CheckCircle, Gavel, Clock, User, Star } from 'lucide-react';

export function TrustSignals() {
  const logoPartners = [
    {
      name: 'Bar Council',
      icon: (
        <svg className="h-5 w-5 text-stone-700 dark:text-stone-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeDasharray="1 1" />
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v10M8 11h8M7 14l2-3-2-3M15 14l2-3-2-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Minjustice',
      icon: (
        <svg className="h-5 w-5 text-stone-700 dark:text-stone-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
          <path d="M12 8v8M9 11h6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Legal Alliance',
      icon: (
        <svg className="h-5 w-5 text-stone-700 dark:text-stone-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l7 5-7 5-7-5 7-5zM12 11l7 5-7 5-7-5 7-5z" strokeLinejoin="round" />
          <circle cx="12" cy="3" r="1" fill="currentColor" />
          <circle cx="19" cy="8" r="1" fill="currentColor" />
          <circle cx="5" cy="8" r="1" fill="currentColor" />
          <circle cx="12" cy="13" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'Legal Aid',
      icon: (
        <svg className="h-5 w-5 text-stone-700 dark:text-stone-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12a9 9 0 0 1 15-6.7M21 12a9 9 0 0 1-15 6.7" strokeLinecap="round" />
          <path d="M9 10h6M12 7v7" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Citizens Helped', icon: <BarChart3 size={20} /> },
    { number: '99%', label: 'Clarity & Care', icon: <CheckCircle size={20} /> },
    { number: '500+', label: 'Verified Local Lawyers', icon: <Gavel size={20} /> },
    { number: '24/7', label: 'Always Available', icon: <Clock size={20} /> },
  ];

  const testimonials = [
    {
      author: 'Mbongih Noel',
      role: 'Shop Owner, Douala',
      quote: "I was confused about a new municipal tax notice for my shop. The AI assistant explained the regulations in plain French in seconds. When I needed a formal verification, it connected me with a local advocate who reviewed it and saved me from an unlawful fee.",
      date: '3 days ago',
      avatar: <User size={18} className="text-[#B89868]" />,
    },
    {
      author: 'Fouda Marie',
      role: 'Secondary School Teacher, Yaoundé',
      quote: "My landlord suddenly tried to double my rent without notice. I used LegalHub and learned it violated tenancy laws. The platform matched me with a lawyer who quickly drafted a formal reply to settle the dispute. Very grateful for this service!",
      date: '2 weeks ago',
      avatar: <User size={18} className="text-[#B89868]" />,
    },
  ];

  return (
    <section className="py-24 bg-[#FDFCF9] dark:bg-[#16171B] border-t border-b border-[#E5E2DC] dark:border-stone-800/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Partner Logos */}
        <div className="mb-24">
          <p className="text-center text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-10">Trusted Across Cameroon</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-40 grayscale hover:opacity-75 dark:opacity-30 dark:hover:opacity-60 transition-all duration-500 max-w-4xl mx-auto">
            {logoPartners.map((partner) => (
              <div 
                key={partner.name} 
                className="flex items-center justify-center gap-2 border border-[#E5E2DC]/60 dark:border-stone-800/40 px-4 py-3 rounded-xl bg-stone-50/40 dark:bg-transparent"
              >
                <div className="flex-shrink-0">{partner.icon}</div>
                <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400 tracking-wider uppercase">{partner.name}</span>
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
              className="bg-[#FAF9F5] dark:bg-stone-900/10 rounded-2xl p-10 border border-[#E5E2DC] dark:border-stone-800 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={11} className="fill-[#B89868] text-[#B89868]" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    {testimonial.date}
                  </span>
                </div>

                <blockquote className="text-stone-700 dark:text-stone-350 italic text-sm leading-relaxed mb-8 font-serif">
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

