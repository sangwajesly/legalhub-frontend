'use client';

import { MessageSquare, Zap, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <MessageSquare size={20} />,
      title: 'Ask in Your Own Words',
      description: 'Type your question or worry just like you would tell a friend. No legal terms needed, and it\'s completely private.',
    },
    {
      number: '02',
      icon: <Zap size={20} />,
      title: 'Get Easy-to-Read Answers',
      description: 'Our AI guide reads local laws and gives you a clear, simple answer in under forty-five seconds.',
    },
    {
      number: '03',
      icon: <CheckCircle size={20} />,
      title: 'Decide What\'s Next',
      description: 'Read your options. If you want, we can connect you to a friendly, verified lawyer nearby. Otherwise, you\'re all set!',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF9F5] dark:bg-[#121315] border-t border-[#E5E2DC] dark:border-stone-850 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-3">Three Simple Steps</p>
          <h2 className="text-3xl md:text-5xl font-light font-display text-stone-900 dark:text-stone-50 mb-6">
            Getting Help is Simple
          </h2>
          <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            You don&apos;t need to be a lawyer to understand your rights. Get clear answers and connect with legal support in three easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/10 rounded-2xl overflow-hidden">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`p-10 flex flex-col justify-between h-full ${
                idx < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#E5E2DC] dark:border-stone-800' : ''
              }`}
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 border border-[#B89868]/30 bg-stone-50 dark:bg-stone-850/50 flex items-center justify-center text-[#B89868] rounded-xl">
                    {step.icon}
                  </div>
                  <span className="font-display font-light italic text-2xl text-[#B89868]">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs font-sans font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
