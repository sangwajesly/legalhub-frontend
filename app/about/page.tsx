'use client';

import React from 'react';
import { Scale, Users, Shield, Globe, Award, Heart, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomeNavbar, Footer } from '@/components/home';

export default function AboutPage() {
  return (
    <div className="w-full">
      <HomeNavbar />
      <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315] py-20 lg:py-32 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#121315] border border-[#E5E2DC]/10 dark:border-stone-850 rounded-3xl mx-6 shadow-sm text-white mb-24">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B89868]/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C5A880]/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-6 text-center">
            <Badge className="bg-[#B89868]/15 text-[#B89868] dark:text-[#C5A880] border-[#B89868]/30 mb-6 uppercase tracking-widest text-[10px]">Our Mission</Badge>
            <h1 className="text-4xl lg:text-6xl font-light font-display text-[#FAF9F5] mb-6 tracking-tight leading-tight">
              Bridging the Gap to <br />
              <span className="font-serif italic text-[#B89868]">Legal Justice</span> in Cameroon.
            </h1>
            <p className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              LegalHub is more than a platform; it is a movement to make legal guidance accessible, understandable, and instant for every citizen, from Douala to Yaoundé and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-[#B89868] hover:bg-[#A38253] text-[#FAF9F5] px-8 h-12 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md">
                  Join the Hub
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="text-stone-200 border-stone-700 hover:bg-white/5 h-12 px-8 rounded-xl text-xs font-bold uppercase tracking-widest">
                  Ask AI a Question
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[10px] text-[#B89868] font-bold uppercase tracking-widest mb-1">Our Core Values</p>
            <h2 className="text-3xl lg:text-5xl font-light font-display text-stone-900 dark:text-stone-50 tracking-tight">
              Built on a Foundation of <span className="font-serif italic text-[#B89868]">Trust</span>
            </h2>
            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
              We operate at the intersection of traditional advocacy and modern technology, ensuring fairness and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Scale, 
                title: "Equality & Access", 
                desc: "Every citizen deserves to understand their rights, regardless of their background, language, or bank balance.",
                color: "bg-[#B89868]/10 text-[#B89868]"
              },
              { 
                icon: Shield, 
                title: "Absolute Privacy", 
                desc: "Legal matters are sensitive. We employ stateless, anonymous queries to guarantee your absolute privacy.",
                color: "bg-[#B89868]/10 text-[#B89868]"
              },
              { 
                icon: Globe, 
                title: "Localized Focus", 
                desc: "Tailored to the unique legal landscapes of Cameroon, from statutory Penal Codes to local customary tribunals.",
                color: "bg-[#B89868]/10 text-[#B89868]"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-[#E5E2DC] dark:border-stone-800 bg-white dark:bg-stone-900/10 hover:shadow-md hover:border-[#B89868]/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-4">{item.title}</h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-[#FAF9F5] dark:bg-stone-900/5 border-t border-b border-[#E5E2DC] dark:border-stone-850 mb-24 transition-colors">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Citizens Helped", value: "50,000+", icon: MessageSquare },
              { label: "Verified Lawyers", value: "500+", icon: Users },
              { label: "AI Availability", value: "24/7", icon: Shield },
              { label: "Surprise Fees", value: "Zero", icon: Award }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="h-10 h-10 w-10 bg-white dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  <stat.icon className="h-4.5 w-4.5 text-[#B89868]" />
                </div>
                <div className="text-2xl md:text-3xl font-light font-display text-stone-900 dark:text-stone-100 mb-1">{stat.value}</div>
                <div className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Origins / The Creator */}
        <section className="py-12 max-w-6xl mx-auto px-6 mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute inset-0 bg-[#B89868]/5 rounded-full blur-[80px]"></div>
              <img 
                src="/founder.jpg" 
                alt="The Creator" 
                className="relative z-10 w-full rounded-2xl shadow-md grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="lg:w-1/2 space-y-6 text-left">
              <Badge className="bg-[#B89868]/10 text-[#B89868] dark:text-[#C5A880] border-[#B89868]/20 uppercase tracking-widest text-[9px]">Our Origins</Badge>
              <h2 className="text-3xl md:text-4xl font-light font-display text-stone-900 dark:text-white tracking-tight leading-tight">
                Built by a Student Committed to <span className="font-serif italic text-[#B89868]">Access</span>.
              </h2>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans font-medium">
                LegalHub was created by a student who believes that understanding your basic legal rights shouldn&apos;t be rocket science. Driven by a passion for civic technology, the platform aims to demystify complex statutes and establish straightforward connections to verified advocates across Cameroon.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-widest text-[10px]">
                  <Heart className="h-4 w-4 text-[#B89868]" /> Passionate Advocacy
                </div>
                <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-widest text-[10px]">
                  <Zap className="h-4 w-4 text-[#B89868]" /> Secure Tech Stack
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto bg-[#121315] border border-[#B89868]/30 rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B89868]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-light font-display leading-tight text-[#FAF9F5]">
                Ready to Join the Hub and <br />
                <span className="font-serif italic text-[#B89868]">Revolutionize</span> Your Legal Experience?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-[#FAF9F5] hover:bg-[#EAE8E2] text-[#121315] px-8 h-12 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-[#FAF9F5] border-stone-700 hover:bg-white/10 h-12 px-8 rounded-xl text-xs font-bold uppercase tracking-widest">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
