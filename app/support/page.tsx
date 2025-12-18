'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  CreditCard, 
  Shield, 
  Search, 
  Scale, 
  HelpCircle, 
  MessageSquare, 
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

export default function SupportPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      links: ["How LegalHub works", "Creating an account", "Asking your first question"]
    },
    {
      title: "Billing & Plans",
      icon: CreditCard,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-100 dark:bg-teal-900/30",
      links: ["Pricing overview", "Payment methods", "Refund policy"]
    },
    {
      title: "Safety & Privacy",
      icon: Shield,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      links: ["Data encryption", "Anonymous browsing", "Terms of service"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Search Hero Section */}
      <section className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center space-y-8">
           <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 font-black">SUPPORT CENTER</Badge>
           <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">How can we help you?</h1>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Search our comprehensive knowledge base or browse common topics below.
           </p>
           
           <div className="max-w-2xl mx-auto relative pt-4 group">
             <div className="absolute inset-x-0 bottom-0 top-4 bg-white/5 rounded-[2rem] blur-xl group-hover:bg-white/10 transition-all"></div>
             <div className="relative flex items-center">
                <Search className="h-6 w-6 absolute left-6 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Describe your issue (e.g., how to book a lawyer)" 
                  className="h-16 pl-16 pr-10 text-lg rounded-[2rem] bg-white/10 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/20 focus:ring-blue-500/50 shadow-2xl transition-all"
                />
             </div>
           </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Card key={idx} className="rounded-[2.5rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <div className={`h-14 w-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                   <cat.icon className={`h-7 w-7 ${cat.color}`} />
                </div>
                <CardTitle className="text-xl font-black dark:text-white">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                 <ul className="space-y-4">
                    {cat.links.map((link, lidx) => (
                       <li key={lidx} className="flex items-center justify-between group/link cursor-pointer">
                          <span className="text-slate-600 dark:text-slate-400 font-medium group-hover/link:text-blue-600 dark:group-hover/link:text-teal-400 transition-colors">{link}</span>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover/link:translate-x-1 transition-all" />
                       </li>
                    ))}
                 </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-24">
         <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-24">
               <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-black">RESOURCES</Badge>
               <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Frequently Asked Questions</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Can't find what you're looking for? Our automated documentation is updated daily with common queries.
               </p>
               <Button className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                  <LifeBuoy className="h-5 w-5" /> Open Wiki
               </Button>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { q: "Is the first consultation really free?", a: "Yes, our first AI-powered analysis is 100% free to help every citizen understand their basic legal rights instantly." },
                 { q: "Are the lawyers on the platform verified?", a: "Every lawyer undergoes a rigorous background check involving Bar Association verification and character screening." },
                 { q: "Can I manage everything from mobile?", a: "Absolutely. Our progressive web app allows you to report cases, chat, and book lawyers directly from your smartphone." },
                 { q: "Is my data truly encrypted?", a: "We use AES-256 military-grade encryption for all communications and legal file storage." },
                 { q: "What if I can't afford a lawyer?", a: "LegalHub partners with several NGOs that provide pro-bono support for eligible cases reported on our platform." },
                 { q: "Do you operate in my country?", a: "We currently cover 18 African jurisdictions and are expanding rapidly across the continent." }
               ].map((faq, idx) => (
                  <div key={idx} className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                     <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                        <HelpCircle className="h-5 w-5 text-blue-600 dark:text-teal-400" />
                     </div>
                     <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{faq.q}</h4>
                     <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Support CTA */}
      <section className="container mx-auto px-6 pt-10">
         <div className="rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
               <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">Couldn't find an answer?</h2>
               <p className="text-white/80 font-medium">Our team of human support specialists and case managers are ready to assist you personally.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 px-10 h-16 rounded-2xl text-xl font-black shadow-xl shadow-black/10">
                     Chat to Support
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 px-10 h-16 rounded-2xl text-xl font-black">
                     Email our Team
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
