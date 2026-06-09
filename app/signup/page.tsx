'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Scale, Users, FileCheck, Globe, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const { register, loginWithGoogle, isLoading, error: authError, clearError } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearError();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register({ name, email, password, role: 'citizen' });
      router.push('/chat');
    } catch (err: any) {
      // Error handled by store
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    clearError();
    try {
      await loginWithGoogle();
      router.push('/chat');
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-[#FAF9F5] dark:bg-[#121315] overflow-hidden">
      {/* Left Side: Branding & Storytelling (Hidden on mobile) */}
      <div className="hidden lg:flex relative bg-[#121315] overflow-hidden border-r border-[#E5E2DC]/10 dark:border-stone-850">
        {/* Intense Background Decorations for Signup */}
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#B89868]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#B89868]/5 rounded-full blur-[100px] animate-pulse delay-500"></div>
        
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
              <Badge className="bg-[#FAF9F5]/5 border border-[#FAF9F5]/10 text-[#B89868] px-3 py-1 text-[10px] xl:text-xs font-semibold rounded-full">
                Join 50,000+ Citizens
              </Badge>
              <h2 className="text-4xl xl:text-5xl font-serif font-bold text-[#FAF9F5] leading-tight">
                Your <span className="text-[#B89868] font-serif">Legal Journey</span> Starts Here.
              </h2>
              <p className="text-stone-400 text-sm xl:text-base leading-relaxed font-normal">
                Connect with professional advocacy, leverage AI insights, and take control of your legal rights with ease and safety.
              </p>
            </div>

            <div className="space-y-4 xl:space-y-5">
              {[
                { icon: Users, text: "Community of verified legal experts", color: "text-[#B89868]" },
                { icon: FileCheck, text: "Smart document analysis & templates", color: "text-[#B89868]" },
                { icon: Globe, text: "Serving multiple African jurisdictions", color: "text-[#B89868]" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="h-8 xl:h-10 w-8 xl:w-10 rounded-xl bg-[#FAF9F5]/5 flex items-center justify-center border border-[#FAF9F5]/10 group-hover:border-[#B89868]/30 transition-all duration-300">
                    <feature.icon className={`h-4 xl:h-5 w-4 xl:w-5 ${feature.color}`} />
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
              <a href="#" className="hover:text-stone-300 transition-colors">Safety Hub</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Bar Compliance</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="flex items-center justify-center p-6 xl:p-8 bg-[#FAF9F5] dark:bg-[#121315] overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-md space-y-4 xl:space-y-6 animate-fade-in">
          {/* Logo (Mobile-only) */}
          <div className="lg:hidden flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 border border-[#B89868]/30 rounded-xl flex items-center justify-center bg-stone-900/60 shadow-sm">
                <Scale className="h-5 w-5 text-[#B89868]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight">
                Legal<span className="text-[#B89868] italic font-serif">Hub</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left space-y-1">
            <h1 className="text-2xl xl:text-3xl font-serif font-bold text-[#121315] dark:text-white tracking-tight">Create Account</h1>
            <p className="text-xs xl:text-sm text-stone-500 dark:text-stone-400 font-normal">Join the future of citizen-first legal tech.</p>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleSignup}
            className="w-full py-5 xl:py-6 border-[#E5E2DC] dark:border-stone-800 bg-[#FDFCF9] dark:bg-stone-900/50 hover:bg-[#FAF9F5] dark:hover:bg-stone-900 text-stone-700 dark:text-white flex items-center justify-center gap-3 text-xs xl:text-sm shadow-sm group transition-all rounded-xl font-medium"
          >
            <svg className="w-4 h-4 xl:w-5 xl:h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E5E2DC] dark:border-stone-850"></span>
            </div>
            <div className="relative flex justify-center text-[10px] xl:text-xs uppercase font-semibold">
              <span className="bg-[#FAF9F5] dark:bg-[#121315] px-4 text-stone-400 dark:text-stone-500 font-medium">Or use email</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-3 xl:space-y-4">
            {error && (
              <div className="p-3 bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-[10px] xl:text-xs flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <Label htmlFor="name" className="text-stone-700 dark:text-stone-300 text-xs font-semibold ml-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 bg-[#FDFCF9] dark:bg-stone-900/30 border-[#E5E2DC] dark:border-stone-850 focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all rounded-xl dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-stone-700 dark:text-stone-300 text-xs font-semibold ml-1">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-[#FDFCF9] dark:bg-stone-900/30 border-[#E5E2DC] dark:border-stone-850 focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all rounded-xl dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 xl:gap-4">
              <div className="space-y-1">
                <Label htmlFor="password" className="text-stone-700 dark:text-stone-300 text-xs font-semibold ml-1">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 bg-[#FDFCF9] dark:bg-stone-900/30 border-[#E5E2DC] dark:border-stone-850 focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all rounded-xl dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-stone-700 dark:text-stone-300 text-xs font-semibold ml-1">Confirm</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 bg-[#FDFCF9] dark:bg-stone-900/30 border-[#E5E2DC] dark:border-stone-850 focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all rounded-xl dark:text-white"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-5 xl:py-6 bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] font-semibold rounded-xl shadow-sm group transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-stone-500 dark:text-stone-500">
            Already a member?{' '}
            <Link href="/login" className="text-[#B89868] dark:text-[#B89868]/90 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal Badge shim
const Badge = ({ children, className }: { children: React.ReactNode, className: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 ${className}`}>
    {children}
  </span>
);

export default SignupPage;
