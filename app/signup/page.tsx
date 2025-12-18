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
      router.push('/dashboard');
    } catch (err: any) {
      // Error handled by store
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    clearError();
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Left Side: Branding & Storytelling (Hidden on mobile) */}
      <div className="hidden lg:flex relative bg-slate-950 overflow-hidden">
        {/* Intense Background Decorations for Signup */}
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-teal-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-500"></div>
        
        <div className="relative z-10 w-full flex flex-col justify-between p-8 xl:p-12">
          {/* Top: Logo */}
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="h-10 xl:h-12 w-10 xl:w-12 bg-blue-600 dark:bg-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Scale className="h-6 xl:h-7 w-6 xl:w-7 text-white" />
            </div>
            <span className="text-xl xl:text-2xl font-bold text-white tracking-tight">LegalHub</span>
          </Link>

          {/* Middle: Value Prop */}
          <div className="max-w-md space-y-6 xl:space-y-8">
            <div className="space-y-3 xl:space-y-4">
              <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-2 py-0.5 text-[10px] xl:text-xs">Join 50,000+ Users</Badge>
              <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Your <span className="text-teal-500">Legal Journey</span> Starts Here.
              </h2>
              <p className="text-slate-400 text-sm xl:text-lg leading-relaxed">
                Connect with professional advocacy, leverage AI insights, and take control of your legal rights across the continent.
              </p>
            </div>

            <div className="space-y-4 xl:space-y-5">
              {[
                { icon: Users, text: "Community of verified legal experts", color: "text-blue-400" },
                { icon: FileCheck, text: "Smart document analysis & templates", color: "text-amber-400" },
                { icon: Globe, text: "Serving 15+ African jurisdictions", color: "text-teal-400" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="h-8 xl:h-10 w-8 xl:w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all">
                    <feature.icon className={`h-4 xl:h-5 w-4 xl:w-5 ${feature.color}`} />
                  </div>
                  <span className="text-slate-200 text-sm xl:text-base font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Footer Info */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 italic text-slate-500 text-xs xl:text-sm">
            <p>&copy; 2025 LegalHub Africa.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Safety Hub</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Bar Compliance</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="flex items-center justify-center p-6 xl:p-8 bg-gradient-to-tr from-teal-50/50 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-md space-y-4 xl:space-y-6 animate-fade-in">
          {/* Logo (Mobile-only) */}
          <div className="lg:hidden flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">LegalHub</span>
            </Link>
          </div>

          <div className="text-center lg:text-left space-y-1">
            <h1 className="text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create Account</h1>
            <p className="text-xs xl:text-sm text-slate-500 dark:text-slate-400">Join the future of legal tech in Africa.</p>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleSignup}
            className="w-full py-5 xl:py-6 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:text-white flex items-center justify-center gap-3 text-xs xl:text-sm shadow-sm hover:shadow-md transition-all rounded-xl"
          >
            <svg className="w-4 h-4 xl:w-5 xl:h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-[10px] xl:text-xs uppercase font-semibold">
              <span className="bg-white dark:bg-slate-950 px-4 text-slate-400">Or use email</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-3 xl:space-y-4">
            {error && (
              <div className="p-3 bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-[10px] xl:text-xs flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-xs font-semibold ml-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 xl:h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-xs font-semibold ml-1">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 xl:h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 xl:gap-4">
              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 text-xs font-semibold ml-1">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 xl:h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-slate-700 dark:text-slate-300 text-xs font-semibold ml-1">Confirm</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-10 xl:h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-5 xl:py-6 bg-teal-600 hover:bg-teal-700 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 dark:shadow-emerald-900/20 group transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-500">
            Already a member?{' '}
            <Link href="/login" className="text-blue-600 dark:text-teal-500 font-bold hover:underline">
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
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default SignupPage;
