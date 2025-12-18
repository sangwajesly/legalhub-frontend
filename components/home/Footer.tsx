'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Scale, ArrowRight, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-blue-500 dark:text-teal-400">Legal</span>Hub
              </h3>
              <p className="text-slate-400 text-base leading-relaxed max-w-xs">
                Democratizing access to justice across West Africa. Get instant AI guidance or connect with verified lawyers.
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              {[
                { icon: <Facebook size={18} />, label: 'Facebook' },
                { icon: <Twitter size={18} />, label: 'Twitter' },
                { icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { icon: <Instagram size={18} />, label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 dark:hover:bg-teal-600 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 max-w-sm">
              <p className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Join our community</p>
              <form className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-teal-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 dark:bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-teal-700 transition-all"
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
                { label: 'AI Assistance', href: '/chat' },
                { label: 'Find a Lawyer', href: '/lawyers' },
                { label: 'Case Analysis', href: '#' },
                { label: 'Legal Articles', href: '#' },
              ],
            },
            {
              title: 'Support',
              links: [
                { label: 'Help Center', href: '/support' },
                { label: 'How It Works', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'Contact Us', href: '#' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '#' },
                { label: 'Our Mission', href: '#' },
                { label: 'Terms of Use', href: '#' },
                { label: 'Privacy Policy', href: '#' },
              ],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-white mb-8 uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center group">
                       <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500 dark:text-teal-400" />
                       {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className="bg-slate-800/30 rounded-[2rem] p-8 border border-slate-800 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
            <Scale size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-12 h-12 bg-blue-100/10 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
               <Scale size={24} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-2 uppercase tracking-widest flex items-center gap-2">
                 Legal Disclaimer
              </h5>
              <p className="text-sm text-slate-400 leading-relaxed max-w-4xl">
                LegalHub provides general information and AI-powered guidance. This does not constitute professional legal advice. 
                Always consult with a qualified attorney in your jurisdiction for specific legal matters. 
                <Link href="#" className="text-blue-500 dark:text-teal-400 hover:underline inline-flex items-center ml-1">
                  Read full policy <ArrowRight size={14} className="ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div>
            © {currentYear} LegalHub Team. Built for Justice.
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
