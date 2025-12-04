'use client';

import Link from 'next/link';


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Column 1: Brand & Mission */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">LegalHub</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Making legal help accessible and affordable for everyone.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '𝕏', label: 'Twitter', href: '#' },
                { icon: '💼', label: 'LinkedIn', href: '#' },
                { icon: '📷', label: 'Instagram', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted hover:text-primary transition-colors text-base"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email Signup */}
            <div className="bg-light rounded-lg p-4 border border-border">
              <p className="text-sm text-primary mb-2 font-medium">Subscribe for updates</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white border border-border text-primary text-sm rounded-l-lg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-r-lg hover:bg-primary/90 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-4">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Start Chat', href: '/chat' },
                { label: 'Find a Lawyer', href: '/lawyers' },
                { label: 'My Bookings', href: '/bookings' },
                { label: 'Articles & Insights', href: '#' },
                { label: 'Report a Case', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-4">Help & Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'FAQ', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'How It Works', href: '#' },
                { label: 'Pricing & Payment', href: '#' },
                { label: 'Send Feedback', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
                { label: 'Important Disclaimer', href: '#' },
                { label: 'Accessibility', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-base font-semibold text-primary mb-4">About Us</h4>
            <ul className="space-y-3">
              {[
                { label: 'About LegalHub', href: '#' },
                { label: 'Our Mission', href: '#' },
                { label: 'Team', href: '#' },
                { label: 'Partnerships', href: '#' },
                { label: 'Careers', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Footer Bottom Bar */}
        <div className="pt-8">
          {/* Copyright & Compliance */}
          <div className="mb-6">
            <p className="text-muted text-sm">
              © {currentYear} LegalHub. All rights reserved. | Made with ♥ for legal access
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-light rounded-lg p-6 border-l-2 border-primary">
            <p className="text-sm text-secondary leading-relaxed">
              <span className="font-semibold text-primary">⚖️ Important Disclaimer:</span> LegalHub provides general legal information and AI-powered guidance. 
              This does not constitute legal advice. For specific legal counsel on your situation, consult a qualified attorney in your jurisdiction. 
              LegalHub and its partners are not liable for misuse, misinterpretation, or reliance on information provided. 
              <Link href="#" className="text-primary hover:text-primary/80 ml-1 transition-colors">
                View full disclaimer →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-light py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <div>
            Made with legal tech innovation by <span className="text-primary font-medium">LegalHub Team</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Status
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              System Status
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              API Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
