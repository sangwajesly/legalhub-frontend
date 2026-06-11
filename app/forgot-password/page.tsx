'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Shield, Zap, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen grid lg:grid-cols-2 bg-[#FAF9F5] dark:bg-[#0E0F11] overflow-y-auto lg:overflow-hidden font-sans antialiased">
      {/* Left Side: Branding & Storytelling (Hidden on mobile) */}
      <div className="hidden lg:flex relative bg-[#121315] overflow-hidden border-r border-[#E5E2DC]/10 dark:border-stone-850">
        {/* Abstract Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#B89868]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B89868]/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
        
        <div className="relative z-10 w-full flex flex-col justify-between p-8 xl:p-12">
          {/* Top: Logo */}
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="h-10 w-10 xl:h-11 xl:w-11 border border-[#B89868]/30 rounded-xl flex items-center justify-center bg-stone-900/60 shadow-sm group-hover:rotate-6 transition-transform duration-300">
              <Scale className="h-5 w-5 xl:h-5.5 xl:w-5.5 text-[#B89868]" />
            </div>
            <span className="text-xl xl:text-2xl font-serif font-bold text-[#FAF9F5] tracking-tight">
              Legal<span className="text-[#B89868] italic font-serif">Hub</span>
            </span>
          </Link>

          {/* Middle: Value Prop */}
          <div className="max-w-md space-y-6 xl:space-y-8">
            <div className="space-y-3 xl:space-y-4">
              <h2 className="text-4xl xl:text-5xl font-serif font-bold text-[#FAF9F5] leading-tight">
                Democratizing <span className="text-[#B89868] font-serif">Justice</span> for All.
              </h2>
              <p className="text-stone-400 text-sm xl:text-base leading-relaxed font-normal">
                Empowering individuals across the continent with secure AI guidance and verified legal representation you can trust.
              </p>
            </div>

            <div className="space-y-4 xl:space-y-5">
              {[
                { icon: Shield, text: "Privacy-first, encrypted consultations", color: "text-[#B89868]" },
                { icon: Zap, text: "Instant AI-powered document & rights analysis", color: "text-[#B89868]" },
                { icon: CheckCircle2, text: "Pre-vetted network of top legal minds", color: "text-[#B89868]" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-xl bg-[#FAF9F5]/5 flex items-center justify-center border border-[#FAF9F5]/10 group-hover:border-[#B89868]/30 transition-colors duration-300">
                    <feature.icon className={`h-4 w-4 xl:h-5 xl:w-5 ${feature.color}`} />
                  </div>
                  <span className="text-stone-300 text-sm xl:text-base font-normal">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Footer Info */}
          <div className="flex items-center justify-between pt-6 border-t border-[#FAF9F5]/10 italic text-stone-500 text-xs xl:text-sm">
            <p>&copy; 2026 LegalHub Africa.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Recover Password Form */}
      <div className="relative flex items-center justify-center p-4 sm:p-8 xl:p-12 bg-[#FAF9F5] dark:bg-[#0E0F11] overflow-y-auto min-h-screen lg:min-h-0">
        {/* Dynamic mesh gradients for premium glassmorphism background glow */}
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] bg-[#B89868]/10 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#B89868]/5 rounded-full blur-[70px] dark:blur-[90px] pointer-events-none animate-pulse delay-500"></div>

        <div className="relative z-10 w-full max-w-md p-6 sm:p-8 xl:p-10 rounded-3xl border border-[#E5E2DC] dark:border-stone-800/60 bg-white/70 dark:bg-stone-950/45 backdrop-blur-xl shadow-xl dark:shadow-stone-950/40 space-y-6 xl:space-y-8 animate-fade-in">
          {/* Logo (Mobile-only) */}
          <div className="lg:hidden flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 border border-[#B89868]/30 rounded-xl flex items-center justify-center bg-stone-900/60 shadow-sm">
                <Scale className="h-5 w-5 text-[#B89868]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">
                Legal<span className="text-[#B89868] italic font-serif">Hub</span>
              </span>
            </Link>
          </div>

          {success ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-[#B89868]/15 text-[#B89868] rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <Mail className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-serif font-bold text-[#121315] dark:text-white">Check Your Email</h1>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
                  We have sent a password reset link to <span className="font-semibold text-stone-800 dark:text-stone-200">{email}</span>. Please follow the instructions in the email to recover your account.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-semibold rounded-xl shadow-sm transition-all duration-200 text-sm active:scale-[0.98]">
                  &larr; Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center lg:text-left space-y-1.5">
                <h1 className="text-2xl xl:text-3xl font-serif font-bold text-[#121315] dark:text-white tracking-tight">Forgot Password?</h1>
                <p className="text-xs xl:text-sm text-stone-500 dark:text-stone-400 font-normal">No worries! Enter your email and we'll send you a reset link.</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300 text-xs font-semibold animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="space-y-1.5 xl:space-y-2">
                  <Label htmlFor="email" className="text-stone-700 dark:text-stone-300 text-xs xl:text-sm font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="h-11 bg-[#FDFCF9]/85 dark:bg-stone-900/10 border-[#E5E2DC] dark:border-stone-800/80 focus:ring-2 focus:ring-[#B89868]/25 focus:border-[#B89868] transition-all rounded-xl dark:text-white backdrop-blur-sm"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 xl:py-6 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-semibold rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Reset Link <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="text-center text-xs xl:text-sm text-stone-500 dark:text-stone-550 font-medium">
                Remember your password?{' '}
                <Link href="/login" className="text-[#B89868] dark:text-[#B89868]/90 font-bold hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
