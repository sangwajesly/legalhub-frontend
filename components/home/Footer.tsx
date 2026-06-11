'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Scale, ArrowRight, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121315] text-stone-300 border-t border-[#E5E2DC]/10 dark:border-stone-850">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-light font-display text-[#FAF9F5] mb-4">
                Legal<span className="text-[#B89868] italic font-normal">Hub</span>
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed max-w-xs font-sans font-medium font-medium">
                Democratizing structured access to justice across West Africa. Obtain immediate automated clarity or establish verified attorney representation.
              </p>
            </div>

            <div className="flex gap-3 mb-8">
              {[
                { icon: <Facebook size={16} />, label: 'Facebook' },
                { icon: <Twitter size={16} />, label: 'Twitter' },
                { icon: <Linkedin size={16} />, label: 'LinkedIn' },
                { icon: <Instagram size={16} />, label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 border border-stone-800/80 bg-[#1C1B19]/30 flex items-center justify-center text-stone-400 hover:text-[#FAF9F5] hover:border-[#B89868]/60 rounded-xl transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="bg-[#1C1B19]/20 border border-stone-800/80 p-6 rounded-2xl max-w-sm">
              <p className="text-[10px] font-bold text-[#FAF9F5] mb-4 uppercase tracking-widest">Subscribe to Insights</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={14} />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#121315]/50 border border-stone-850 text-white text-xs rounded-xl focus:outline-none focus:border-[#B89868]/60 transition-colors placeholder-stone-550"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#B89868] text-[#FAF9F5] text-[10px] font-bold rounded-xl hover:bg-[#A38355] uppercase tracking-widest transition-colors duration-300"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links Sections */}
          {[
            {
              title: 'Services',
              links: [
                { label: 'AI Advisory', href: '/chat' },
                { label: 'Advocate Registry', href: '/lawyers' },
                { label: 'Case Analysis', href: '#' },
                { label: 'Statutory Library', href: '#' },
              ],
            },
            {
              title: 'Support',
              links: [
                { label: 'Help Registry', href: '#' },
                { label: 'Operational Steps', href: '#' },
                { label: 'Fee Transparency', href: '/pricing' },
                { label: 'Direct Contact', href: '#' },
              ],
            },
            {
              title: 'Institution',
              links: [
                { label: 'Our Mission', href: '/about' },
                { label: 'Authority Panel', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Privacy Protocol', href: '#' },
              ],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="text-[10px] font-bold text-[#FAF9F5] mb-8 uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-stone-400 hover:text-white text-xs font-sans font-medium transition-colors flex items-center group">
                       <ArrowRight size={10} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B89868]" />
                       {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className="bg-[#1C1B19]/10 border border-stone-850 p-8 rounded-2xl mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-stone-800/10 group-hover:text-stone-800/20 transition-colors pointer-events-none">
            <Scale size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-10 h-10 border border-[#B89868]/30 bg-stone-900/50 flex items-center justify-center text-[#B89868] flex-shrink-0 rounded-xl">
               <Scale size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-[#FAF9F5] mb-2 uppercase tracking-widest flex items-center gap-2">
                 A Quick Note from Our Team
              </h5>
              <p className="text-xs text-stone-400 leading-relaxed max-w-4xl font-sans font-medium">
                We built LegalHub to give everyone clear, simple legal information. However, please remember that our AI guide is here to help you learn about your rights, not to stand in court as a certified lawyer. For official court cases or formal disputes, we always encourage you to talk directly with one of our friendly, verified local lawyers. 
                <Link href="#" className="text-[#B89868] hover:underline inline-flex items-center ml-1 font-bold">
                  Read full notice <ArrowRight size={12} className="ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone-850 text-[9px] font-bold text-stone-500 uppercase tracking-widest">
          <div>
            © {currentYear} LegalHub. Crafted for regional access and integrity.
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[#FAF9F5] transition-colors">Security</Link>
            <Link href="#" className="hover:text-[#FAF9F5] transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-[#FAF9F5] transition-colors">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
