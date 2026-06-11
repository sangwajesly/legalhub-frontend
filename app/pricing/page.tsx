'use client';

import React, { useState } from 'react';
import { Check, Info, Bot, Gavel, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { HomeNavbar, Footer } from '@/components/home';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Citizen Tier",
      description: "Immediate guidance for everyday citizens.",
      price: "0",
      period: "forever",
      badge: "Free Legal Help",
      features: [
        "Stateless, private AI consultations",
        "Custom search across statutory penal codes",
        "General customary law guides",
        "Completely anonymous — no sign-up required",
      ],
      cta: "Start Chatting Free",
      href: "/chat",
      variant: "outline",
      icon: Bot,
    },
    {
      name: "Lawyer Bookings",
      description: "Accredited, direct legal representation.",
      price: "Direct",
      period: "per session",
      badge: "Pay-As-You-Go",
      features: [
        "1-on-1 virtual consultation rooms",
        "Direct Mobile Money payments (Orange/MTN)",
        "Flat hourly rate set directly by your lawyer",
        "10% platform commission fee to support free AI features",
        "Secure in-app file and document sharing",
      ],
      cta: "Find a Lawyer Now",
      href: "/lawyers",
      variant: "outline",
      icon: Gavel,
    },
    {
      name: "Advocate Premium",
      description: "Advanced tools for verified lawyers.",
      price: isAnnual ? "19,000" : "29,000",
      period: isAnnual ? "FCFA/mo" : "FCFA/mo",
      badge: "For Professionals",
      features: [
        "Verified Advocate Profile Badge",
        "Top directory listing placements",
        "Virtual video/audio call room hosting",
        "Advanced calendar booking & scheduling sync",
        "Secure client case files dashboard",
        "Detailed profile analytics & revenue tracking",
      ],
      cta: isAnnual ? "Get Premium (Save 35%)" : "Go Premium",
      href: "/signup?role=lawyer",
      variant: "default",
      popular: true,
      icon: Sparkles,
    }
  ];

  return (
    <div className="w-full">
      <HomeNavbar />
      <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315] py-20 lg:py-32 transition-colors duration-300">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
            <Badge className="bg-[#B89868]/15 text-[#B89868] dark:text-[#C5A880] border-[#B89868]/30 uppercase tracking-widest text-[10px]">Transparent Structure</Badge>
            <h1 className="text-4xl lg:text-6xl font-light font-display text-stone-900 dark:text-stone-550 tracking-tight leading-tight">
              Plans for Every <br /> 
              <span className="font-serif italic text-[#B89868]">Legal Journey.</span>
            </h1>
            <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Whether you want a quick free answer to a worry or you are an advocate looking to expand your practice, we have simple paths for you.
            </p>
   
            {/* Billing Switch for Lawyer Tier */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${!isAnnual ? 'text-stone-900 dark:text-[#FAF9F5]' : 'text-stone-400'}`}>Monthly Billing</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-[#B89868]" />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isAnnual ? 'text-stone-900 dark:text-[#FAF9F5]' : 'text-stone-400'}`}>Yearly Billing</span>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[9px] uppercase tracking-widest ml-1 font-bold">Save 35%</Badge>
            </div>
          </div>
   
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative p-8 lg:p-10 rounded-2xl border transition-all duration-300 group hover:shadow-md
                  ${plan.popular 
                    ? 'bg-white dark:bg-stone-900/15 border-[#B89868]/40 dark:border-[#B89868]/60 shadow-sm scale-105 z-10' 
                    : 'bg-white/50 dark:bg-stone-900/5 border-[#E5E2DC] dark:border-stone-850'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#B89868] text-white px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
                    RECOMMENDED FOR LAWYERS
                  </div>
                )}
   
                <div className="space-y-6">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center 
                    ${plan.popular ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-[#FAF9F5] dark:text-[#121315] shadow-sm' : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400'}`}
                  >
                    <plan.icon className="h-5 w-5" />
                  </div>
   
                  <div>
                    <Badge className="bg-[#B89868]/10 text-[#B89868] border-[#B89868]/20 uppercase tracking-widest text-[8px] mb-3">{plan.badge}</Badge>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 uppercase tracking-wide">{plan.name}</h3>
                    <p className="text-stone-550 dark:text-stone-400 text-xs leading-relaxed font-sans font-medium">{plan.description}</p>
                  </div>
   
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Direct" && plan.price !== "0" && (
                      <span className="text-3xl font-light font-display text-stone-900 dark:text-stone-50">~</span>
                    )}
                    <span className="text-3xl lg:text-4xl font-light font-display text-stone-900 dark:text-stone-50">
                      {plan.price !== "Direct" && plan.price !== "0" ? `${plan.price}` : plan.price}
                    </span>
                    <span className="text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-wider ml-1">
                      / {plan.period}
                    </span>
                  </div>
   
                  <Link href={plan.href}>
                    <Button 
                      size="lg" 
                      variant={plan.variant as any} 
                      className={`w-full py-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer mt-4
                        ${plan.variant === 'default' 
                          ? 'bg-[#B89868] hover:bg-[#a58151] text-white shadow-sm' 
                          : 'border-[#E5E2DC] dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-855 text-stone-700 dark:text-stone-300'
                        }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
   
                  <div className="space-y-4 pt-6 border-t border-[#E5E2DC] dark:border-stone-850">
                    <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Included Features</p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          <div className="mt-0.5 h-4 w-4 rounded-full bg-[#B89868]/10 dark:bg-[#B89868]/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-[#B89868] dark:text-[#C5A880]" strokeWidth={3} />
                          </div>
                          <span className="text-xs font-medium text-stone-600 dark:text-stone-400 leading-relaxed font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
   
          {/* FAQ - Quick Section */}
          <section className="bg-white dark:bg-stone-900/10 rounded-2xl p-10 md:p-16 shadow-sm border border-[#E5E2DC] dark:border-stone-800/60 max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-2xl md:text-3xl font-light font-display text-stone-900 dark:text-white tracking-tight">Pricing & Payment FAQ</h2>
              <p className="text-stone-550 dark:text-stone-400 text-xs font-sans font-medium">Everything you need to know about consult fees and mobile money transactions.</p>
            </div>
   
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { q: "Is the AI assistant really free?", a: "Yes. All AI assistant consultations, legal guide indexing, and general answers are 100% free with no limits." },
                { q: "How do lawyer payments work?", a: "Lawyers set their own rates per session. When you book a video or physical call, the lawyer's hourly fee is transparently locked in. Payment is made directly to the lawyer via Orange Money, MTN MoMo, or direct bank transfer." },
                { q: "Does LegalHub take a cut of bookings?", a: "Yes. LegalHub takes a transparent 10% platform fee on all bookings to help support the application hosting, video room infrastructure, and unlimited free AI helper features for citizens." },
                { q: "How do I upgrade as a lawyer?", a: "Advocates can sign up for a Premium Advocate profile during registration. If you are already signed up, you can upgrade from your Professional Dashboard under Settings." }
              ].map((faq, idx) => (
                <div key={idx} className="space-y-2 text-left">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#B89868] dark:text-[#C5A880] flex-shrink-0" /> {faq.q}
                  </h4>
                  <p className="text-stone-550 dark:text-stone-450 leading-relaxed text-xs font-medium font-sans">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
   
          {/* Final CTA */}
          <div className="text-center mt-20 space-y-6">
            <h2 className="text-xl font-light font-display text-stone-900 dark:text-white">Still have questions about booking or listings?</h2>
            <Link href="/contact">
              <Button variant="ghost" className="text-[#B89868] dark:text-[#C5A880] font-bold flex items-center gap-2 mx-auto uppercase tracking-widest text-xs hover:bg-transparent">
                Contact our support team <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Simple Badge Component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${className}`}>
    {children}
  </span>
);
