'use client';

import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: 'Is my consultation with the AI assistant confidential?',
      answer: 'Yes, fully. AI assistant queries are stateless and private. No user name, email, or telephone details are required to chat as a guest. Your queries are never saved or used to train public models.',
    },
    {
      question: 'How do I pay for lawyer consultations?',
      answer: 'Consultation fees are paid directly to your chosen advocate. LegalHub does not charge markups or processing fees for matching. payment channels include secure local mobile money (MTN Mobile Money, Orange Money) or cash, as coordinated with the advocate.',
    },
    {
      question: 'What is the difference between statutory and customary law on the platform?',
      answer: 'Our AI assistant indexes statutory laws (such as the Cameroonian Penal Code, Labour Code, and OHADA business regulations) as well as customary practices. The lawyer directory lists advocates specializing in both statutory court litigations and local customary tribunals.',
    },
    {
      question: 'Is LegalHub a law firm?',
      answer: 'No. LegalHub is an educational legal assistance directory and information tool. We do not provide formal legal advice or act as a law firm. Formal representation agreements are signed directly between you and your chosen licensed advocate.',
    },
    {
      question: 'How are lawyers verified on the platform?',
      answer: 'Every legal professional listed on LegalHub undergoes rigorous manual verification. We confirm their active licensing status, enrollment with the Cameroon Bar Association, and years of practice before granting them a "Verified" badge.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF9F5] dark:bg-[#121315] border-t border-[#E5E2DC] dark:border-stone-850 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-3">Frequently Asked Questions</p>
          <h2 className="text-3xl md:text-5xl font-light font-display text-stone-900 dark:text-stone-50 mb-6">
            Clear Answers to Your <span className="font-serif italic text-[#B89868]">Doubts</span>
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about how LegalHub works, privacy, or finding representation? Here are the answers.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-[#FDFCF9] dark:bg-stone-900/10 border border-[#E5E2DC] dark:border-stone-800 rounded-2xl p-6 md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-[#E5E2DC]/60 dark:border-stone-800/60 pb-2">
                <AccordionTrigger className="text-xs md:text-sm font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider hover:text-[#B89868] hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans font-medium mt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
