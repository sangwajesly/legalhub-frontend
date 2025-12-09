'use client';

import Link from 'next/link';


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Column 1: Brand & Mission */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">LegalHub</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Making legal help accessible and affordable for everyone.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '𝕏', label: 'Twitter', href: '#' },
                { icon: '💼', label: 'LinkedIn', href: '#' },
                { icon: '📷', label: 'Instagram', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email Signup */}
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-2 font-semibold">Subscribe for updates</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded-l placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-r hover:bg-blue-700 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Our Services</h4>
            <ul className="space-y-4">
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Help & Support</h4>
            <ul className="space-y-4">
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">About Us</h4>
            <ul className="space-y-4">
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Footer Bottom Bar */}
        <div className="pt-8">
          {/* Copyright & Compliance */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} LegalHub. All rights reserved. | Made with ♥ for legal access
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-amber-500">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-semibold text-amber-400">⚖️ Important Disclaimer:</span> LegalHub provides general legal information and AI-powered guidance. 
              This does not constitute legal advice. For specific legal counsel on your situation, consult a qualified attorney in your jurisdiction. 
              LegalHub and its partners are not liable for misuse, misinterpretation, or reliance on information provided. 
              <Link href="#" className="text-blue-400 hover:text-blue-300 ml-1">
                View full disclaimer →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            Made with legal tech innovation by <span className="text-blue-400 font-semibold">LegalHub Team</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Status
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              System Status
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              API Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
