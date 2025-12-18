'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Scale, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { login, loginWithGoogle, isLoading, error: authError, clearError } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearError();

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      // Error handled by store
    }
  };

  const handleGoogleLogin = async () => {
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-slate-950">
      {/* Left Side: Branding & Storytelling (Hidden on mobile) */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden">
        {/* Abstract Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        
        <div className="relative z-10 w-full flex flex-col justify-between p-12">
          {/* Top: Logo */}
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="h-12 w-12 bg-blue-600 dark:bg-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">LegalHub</span>
          </Link>

          {/* Middle: Value Prop */}
          <div className="max-w-md space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Democratizing <span className="text-blue-500">Justice</span> for All.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Empowering millions across Africa with instant AI legal guidance and verified professional advocacy.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Shield, text: "Privacy-first, encrypted consultations", color: "text-blue-400" },
                { icon: Zap, text: "Instant AI-powered legal incident analysis", color: "text-amber-400" },
                { icon: CheckCircle2, text: "Pre-vetted network of top legal minds", color: "text-teal-400" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className={`h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <span className="text-slate-200 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Footer Info */}
          <div className="flex items-center justify-between pt-12 border-t border-white/10 italic text-slate-500 text-sm">
            <p>&copy; 2025 LegalHub Africa. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-300">Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo (Mobile-only) */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 bg-blue-600 dark:bg-teal-600 rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">LegalHub</span>
            </Link>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Sign in to manage your legal matters.</p>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleLogin}
            className="w-full py-6 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:text-white flex items-center justify-center gap-3 text-base shadow-sm group transition-all"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-4 text-slate-500 dark:text-slate-500 font-medium">Or email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</Label>
                <Link href="/forgot-password" size="sm" className="text-xs text-blue-600 dark:text-teal-500 hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-500 transition-all rounded-xl dark:text-white"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 bg-blue-600 dark:bg-gradient-to-r dark:from-teal-600 dark:to-emerald-600 hover:bg-blue-700 dark:hover:from-teal-700 dark:hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-teal-900/20 group transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-500">
            Professional access needed?{' '}
            <Link href="/signup" className="text-blue-600 dark:text-teal-500 font-bold hover:underline">
              Join the Hub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
