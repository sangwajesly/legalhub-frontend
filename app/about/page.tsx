'use client';

import React from 'react';
import { Scale, Users, Shield, Globe, Award, Heart, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-6">Our Mission</Badge>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Bridging the Gap to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Legal Justice</span> in Africa.
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            LegalHub is more than a platform; it's a movement to make legal guidance accessible, affordable, and instant for every citizen across the continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 dark:bg-teal-600 hover:bg-blue-700 dark:hover:bg-teal-700 text-white px-8 h-14 rounded-xl text-lg font-bold shadow-xl shadow-blue-500/20">
              Join the Movement
            </Button>
            <Button size="lg" variant="outline" className="text-white border-slate-700 hover:bg-white/5 h-14 px-8 rounded-xl text-lg font-bold">
              Our Vision
            </Button>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Built on Foundation of Trust</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We operate at the intersection of traditional advocacy and modern technology.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Scale, 
              title: "Equality & Access", 
              desc: "Every citizen deserves to understand their rights, regardless of their background or bank balance.",
              color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            },
            { 
              icon: Shield, 
              title: "Absolute Privacy", 
              desc: "Legal matters are sensitive. We employ military-grade encryption to protect your conversations.",
              color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
            },
            { 
              icon: Globe, 
              title: "Pan-African Focus", 
              desc: "Tailored to the unique legal landscapes of African nations, from Common Law to Civil Law systems.",
              color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Queries Solved", value: "500k+", icon: MessageSquare },
            { label: "Verified Lawyers", value: "2,500+", icon: Users },
            { label: "Countries Active", value: "18", icon: Globe },
            { label: "Awards Won", value: "12", icon: Award }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="h-12 w-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <stat.icon className="h-5 w-5 text-blue-600 dark:text-teal-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Leadership Placeholder */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-600/10 dark:bg-teal-600/10 rounded-full blur-[80px]"></div>
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
              alt="Leadership" 
              className="relative z-10 w-full rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">The Visionary Team</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Driven by experts in Law, Tech, and Human Rights.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Our team consists of former bar association members, cloud architects, and civil rights activists who believe that technology is the ultimate equalizer in the pursuit of justice.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <Heart className="h-5 w-5 text-red-500" /> Passionate Advocacy
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <Zap className="h-5 w-5 text-amber-500" /> Agile Development
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black max-w-3xl mx-auto leading-tight">Ready to join the Hub and revolutionize your legal experience?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 px-10 h-16 rounded-2xl text-xl font-black">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 h-16 px-10 rounded-2xl text-xl font-black">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple Badge Component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${className}`}>
    {children}
  </span>
);
