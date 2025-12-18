'use client';

import React, { useState } from 'react';
import { Check, Info, Zap, Shield, Crown, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Basic legal guidance for individuals.",
      price: isAnnual ? "0" : "0",
      features: [
        "1 Free detailed AI consultation/mo",
        "Access to basic legal resources",
        "Public anonymous community access",
        "Standard response time",
      ],
      cta: "Get Started",
      variant: "outline",
      icon: Star,
    },
    {
      name: "Advocate Pro",
      description: "Priority support and detailed analysis.",
      price: isAnnual ? "19" : "29",
      features: [
        "Unlimited AI consultations",
        "Priority 24/7 lawyer booking",
        "Custom legal document templates",
        "Unlimited case tracking",
        "Certified legal reports",
        "Detailed background checks",
      ],
      cta: "Go Pro Now",
      variant: "default",
      popular: true,
      icon: Zap,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for NGOs & Businesses.",
      price: "Custom",
      features: [
        "Dedicated legal account manager",
        "API access for case integration",
        "Bulk document verification",
        "White-label lawyer interface",
        "Custom jurisdictional presets",
        "Direct Bar association links",
      ],
      cta: "Contact Sales",
      variant: "outline",
      icon: Crown,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">Simple, Transparent Pricing</Badge>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Plans for every <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Legal need.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Choose the level of protection and expertise that fits your situation. 
            No hidden fees, cancel anytime.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm font-semibold ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Yearly</span>
            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[10px] ml-1">Save 35%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 lg:p-10 rounded-[2.5rem] border transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2
                ${plan.popular 
                  ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-900 shadow-xl scale-105 z-10' 
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center 
                  ${plan.popular ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >
                  <plan.icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                    {plan.price !== "Custom" && "$"}
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-slate-500 font-medium">/mo</span>
                  )}
                </div>

                <Link href={plan.cta === "Contact Sales" ? "/contact" : "/signup"}>
                    <Button 
                        size="lg" 
                        variant={plan.variant as any} 
                        className={`w-full py-7 rounded-2xl text-lg font-black transition-all
                            ${plan.variant === 'default' 
                                ? 'bg-blue-600 hover:bg-blue-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white shadow-lg shadow-blue-500/20' 
                                : 'border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white'
                            }`}
                    >
                        {plan.cta}
                    </Button>
                </Link>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Included Features</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-blue-600 dark:text-teal-400" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ - Quick Section */}
        <section className="bg-white dark:bg-slate-900/50 rounded-[3rem] p-12 lg:p-20 shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Pricing FAQ</h2>
            <p className="text-slate-500">Everything you need to know about our plans and billing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { q: "Can I upgrade or downgrade later?", a: "Absolutely. You can change your plan at any time from your dashboard settings. If you upgrade mid-month, we'll pro-rate the difference." },
              { q: "What payment methods do you accept?", a: "We support major credit cards, PayPal, and local African payment methods including M-Pesa, MTN Mobile Money, and Flutterwave." },
              { q: "Is there a long-term commitment?", a: "No. Our monthly plans are pay-as-you-go. Yearly plans are billed upfront but offer much deeper discounts for serious advocacy." },
              { q: "Do you offer NGO discounts?", a: "Yes! We have a special 'Social Impact' program with 75% discounts for registered non-profits across Africa. Contact us for verification." }
            ].map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" /> {faq.q}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mt-24 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Still have questions?</h2>
          <Link href="/support">
            <Button variant="ghost" className="text-blue-600 dark:text-teal-400 font-black flex items-center gap-2 mx-auto">
              Visit our Knowledge Base <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Simple Badge Component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-black transition-colors ${className}`}>
    {children}
  </span>
);
